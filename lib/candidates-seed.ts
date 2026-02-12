export interface SeedCandidate {
  id: string;
  name: string;
  image: string;
  department: string;
  role: string;
  description: string;
  vote_count: number;
  is_trending?: boolean;
  rank?: number | null;
}

export const CANDIDATES_SEED: SeedCandidate[] = [
  {
    id: '1',
    name: 'Sarah Miller',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBhDq3a9HA0YW7vH8RLY3QmlKkIWphHqM-C7FcPUNi6UGch1IzdFHHfrQpTOHS6_maS4I6gnCsIK7g7CJ2DvD4Yz8QcAzeDvtzVJFEpR3QheEJvOK1N1oZ41Fs1hs2I8wJE1lOpX_ilgfKrOdcnGIT8Kx--2L65jLbrOpgRmslVcquGReN5mQnRetWNWxyMUnW_WRoyjw94gDIUgGBKrDmMEdcFT6XQpLYjFMQbJQ14sZIILoC-VS7AaqSDdoh_8ASGfvRbmyfwt6t',
    department: 'Arts Dept',
    role: 'Senior',
    vote_count: 12450,
    description: 'Sarah is a community volunteer and an aspiring digital artist known for her warm spirit.',
    is_trending: true,
  },
  {
    id: '2',
    name: 'Sophia Rose',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDS4bXVuLHRUOlxTGNjeA9Cbr8cEUu7UixKYXwoKyF-8auPNBuwt-R9o7dlpdnzp_Ye6wqj21syUoQro9JAO4INd3Ardhz9MeQ24TtvaoUhcNUe_ga2nUfMHPk3CgPYTkgq8P9L4o08oX-GvZGvr9DKgpoZvdYLB0-FPx6hepjmTHZcfg6uE7Wcd9-orGSi-gDabBID7g51BdOvzbPQJJ1ZFebSmHxUfQ6cDvoTRaA5nQaQG4CWwe1W1JUWENt7mouMfgjfQCo0dC7',
    department: 'Humanities',
    role: 'Junior',
    vote_count: 12482,
    description: 'Launching the "Kind Hearts Initiative" to provide mental health resources.',
    rank: 2,
  },
  {
    id: '3',
    name: 'Chloe Chen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAssyAzSM_Hk7bVFDybj8IYNxy04JwnXmGYqLgYO5CBV1oERs67ZUCMYwlXxGAYqfWEst8MxWCQSA16r5h1NdQbqKljS_sY150q_9iwtHJyfldeIZAgqt11InHfWeLxRJNIk5WVjerIvOG8cK7Su58XOjvjF7ZFJcJwRUht9UA238hf-1mGh69dwYuD0Sywls95OEtVVJ5AXqFVMmJWzPGc1rAiVey6GfxM7MUvzkMD3N5F_WghJt3IRbuV9ro_v-psHmx-1eqUe2H4',
    department: 'Music Dept',
    role: 'Freshman',
    vote_count: 9890,
    description: 'A talented violinist who organizes free concerts for the elderly.',
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLau3FeodBE7gxlqbvwtM53RiS_jzr4FbOryTnKZdfheGY_8BJ_TZOytXVqtb6cYsc4goUmrmpx9O2ZmtGVD6qUMBO4l0RhTKyfewtMVPKcLvXhZnhE4kCJTh45dWv5gY3KNXDXx4SLVHNYgHhgI48UEZAHpQeeb-ketwwfdz7jGby3GhIhh4mmS1w_URgH_deMgftj-skADeZXLSCijHkVKmPH9xpKAgEbrijpPgHjUfKTSFbRVS1cE4chLYfuHbcGyah1SXZbSNu',
    department: 'Science Dept',
    role: 'Junior',
    vote_count: 942,
    description: 'A science enthusiast who leads the environmental club and mentors younger students.',
  },
  {
    id: '5',
    name: 'Isabella Gray',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBcrCwLOmYlwlb0GyAFECt-NlHDVsegAl9uwCFiqAheumABAYzsNLOPNhUfdzBidtbdzGFB1NzHdd9YsXhb-fWeY-HDZJeCB0s7SlMxWexWW2AlxAcWRubwDPnwmFftqdI4vlpix7RIREIQyjRyzPGLEWjioxruU9-fl9BSxbsyBEBom8UYLsCPvirKRxroUoqzL251cQEZAn6tSkrvFnQF8EDYVKsPNk0P62ylg64Qjrouli9o60u7o7iDGqGZVViI_UYESYogwkLt',
    department: 'Psychology',
    role: 'Senior',
    vote_count: 890,
    description: 'Isabella is known for her empathy and works as a student counselor.',
  },
  {
    id: '6',
    name: 'Maya Thompson',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFBkQNVnNemmHLDAzBmhp_ec_RLTNAlhNFx8-G5pxx5dlNE9WI_x9D_1Zb3QFBusooNnTMhoFTLF3EFUYD5jEs8OqkyIDkZsIc21_vCaB6CR-kNVt5yDWyR2LIvHCMDUczBcdYSuAFhz6P2RWow2Jx-ckwWPrwxa-eY8n62hGe5XGNxa3haouYeIakmHlGBWczVFXMN04jXo9GDElGHibbg37Gcy91pektvYIDzzLjnOKBg_8lc0XCe6SAwXHP_XgIVK0c5xL1vCvh',
    department: 'Business Dept',
    role: 'Senior',
    vote_count: 756,
    description: 'President of the Debate Team and a passionate advocate for student rights.',
  },
  {
    id: '7',
    name: 'Sophia Lauren',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChcsZ2o1le1jA4lgm4y4N96ddsueRRjdPWwTOpcvu569fm7WErevZkG_cgtGFkhhUsChPlo-jeWCjAJ5P9PTcB4yS37xqZG3TBfPoJ0WIjmoTKhcsImPfiNMgVQ1NYWUnNgbmltUuMfqKEOuAuJ_nOzIM6spgI_gh31gxp5oSQK7ZicGjsh1LqSKgLg0o0-JPYQ5XQMn89UEnlHMX0Z855u57g3knDJfsyNDqWrZAnjwrIqwP4QhxsCMqh4Ln1ksa6cro_TZfBqu7P',
    department: 'Fashion',
    role: 'Sophomore',
    vote_count: 432,
    description: 'A trendsetter who organizes charity fashion shows for local orphanages.',
  },
  {
    id: '8',
    name: 'Clara Mendez',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSKhUdXLWeMS2yUrVG2qdiJwZdJ1bSL3qNw4L-LdWInnBBs3WFKyJwFlI0BGrA7S-Yhi6wr0Mdh2k0UXolqDtGlI2y1B04MTKMlEhaByXYequR6w84rP7CtY2vXX5jo1A1qzJrAfwJOMlKUAd8uyHc3UngtEbHdLZWqtVo217gvyOOuOl1o8hxOJzrlr_T4MO3f-m-JvEyblbYKT9mznfdTxrwhS4bRMURPVOZ8qjNcCYoICXb_Ux-8gYHzjg7FPaUNqaes_k4OWt4',
    department: 'Engineering',
    role: 'Junior',
    vote_count: 9890,
    description: 'Robotics team captain with a heart of gold.',
  },
];
