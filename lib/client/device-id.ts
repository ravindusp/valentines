const DEVICE_STORAGE_KEY = 'vq_device_id';

const fallbackRandom = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
};

export const getDeviceId = () => {
  if (typeof window === 'undefined') {
    return 'server-device';
  }

  const existing = window.localStorage.getItem(DEVICE_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated = window.crypto?.randomUUID?.() || fallbackRandom();
  window.localStorage.setItem(DEVICE_STORAGE_KEY, generated);
  return generated;
};
