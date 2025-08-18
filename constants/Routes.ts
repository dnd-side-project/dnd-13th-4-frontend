export const ROUTE_NAMES = {
  TABS: '(tabs)',
  CREATE_MIND_LETTER: 'CreateMindLetter',
  NOT_FOUND: '+not-found',
} as const;

export const STACK_SCREENS = [
  {
    name: ROUTE_NAMES.TABS,
    options: { headerShown: false },
  },
  {
    name: ROUTE_NAMES.CREATE_MIND_LETTER,
    options: { title: '편지 쓰기' },
  },
  {
    name: ROUTE_NAMES.NOT_FOUND,
    options: {},
  },
] as const;
