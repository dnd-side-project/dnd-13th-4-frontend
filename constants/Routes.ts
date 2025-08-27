export const ROUTE_NAMES = {
  TABS: '(tabs)',
  ONBOARDING: 'onboarding',
  CREATE_MIND_LETTER: 'CreateMindLetter',
  API_TEST: 'api-test',
  NOT_FOUND: '+not-found',
} as const;

export const STACK_SCREENS = [
  {
    name: ROUTE_NAMES.ONBOARDING,
    options: { headerShown: false },
  },
  {
    name: ROUTE_NAMES.TABS,
    options: { headerShown: false },
  },
  {
    name: ROUTE_NAMES.CREATE_MIND_LETTER,
    options: { title: '편지 쓰기' },
  },
  {
    name: ROUTE_NAMES.API_TEST,
    options: { title: 'API Test' },
  },
  {
    name: ROUTE_NAMES.NOT_FOUND,
    options: {},
  },
] as const;
