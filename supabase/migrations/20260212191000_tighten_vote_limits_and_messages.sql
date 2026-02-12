create or replace function public.cast_vote(
  p_candidate_id text,
  p_device_hash text,
  p_ip_hash text,
  p_ua_hash text
)
returns table(status text, message text, vote_count bigint, voted_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_last_vote_at timestamptz;
  v_device_count integer;
  v_ip_count integer;
  v_vote_count bigint;
begin
  if p_candidate_id is null or p_candidate_id = '' then
    return query select 'invalid', 'Candidate is required.', 0::bigint, v_now;
    return;
  end if;

  if p_device_hash is null or p_device_hash = '' then
    return query select 'invalid', 'Device fingerprint is missing.', 0::bigint, v_now;
    return;
  end if;

  if p_ip_hash is null or p_ip_hash = '' then
    return query select 'invalid', 'IP fingerprint is missing.', 0::bigint, v_now;
    return;
  end if;

  if not exists (select 1 from public.candidates where id = p_candidate_id) then
    return query select 'not_found', 'Candidate not found.', 0::bigint, v_now;
    return;
  end if;

  select created_at
  into v_last_vote_at
  from public.votes
  where device_hash = p_device_hash
  order by created_at desc
  limit 1;

  if v_last_vote_at is not null and v_now - v_last_vote_at < interval '3 seconds' then
    return query select 'cooldown_limited', 'Cooldown active: wait 3 seconds before casting another vote.', 0::bigint, v_last_vote_at;
    return;
  end if;

  select count(*)
  into v_device_count
  from public.votes
  where device_hash = p_device_hash
    and created_at >= v_now - interval '24 hours';

  if v_device_count >= 2 then
    return query select 'device_limited', 'Device daily limit reached: maximum 2 votes per 24 hours.', 0::bigint, v_now;
    return;
  end if;

  select count(*)
  into v_ip_count
  from public.votes
  where ip_hash = p_ip_hash
    and created_at >= v_now - interval '24 hours';

  if v_ip_count >= 20 then
    return query select 'ip_limited', 'IP daily limit reached: maximum 20 votes per 24 hours on this network.', 0::bigint, v_now;
    return;
  end if;

  if exists (
    select 1
    from public.votes
    where candidate_id = p_candidate_id
      and device_hash = p_device_hash
      and created_at >= v_now - interval '24 hours'
  ) then
    select c.vote_count
    into v_vote_count
    from public.candidates as c
    where c.id = p_candidate_id;

    return query select 'already_voted', 'You already voted for this candidate in the last 24 hours.', coalesce(v_vote_count, 0), v_now;
    return;
  end if;

  insert into public.votes (candidate_id, device_hash, ip_hash, ua_hash, created_at)
  values (p_candidate_id, p_device_hash, p_ip_hash, p_ua_hash, v_now);

  update public.candidates as c
  set vote_count = c.vote_count + 1,
      updated_at = now()
  where c.id = p_candidate_id
  returning c.vote_count into v_vote_count;

  return query select 'ok', 'Vote recorded successfully.', v_vote_count, v_now;
end;
$$;
