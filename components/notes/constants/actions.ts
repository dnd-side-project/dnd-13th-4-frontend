export type ActionCategory = {
  label: string;
  actions: { id: number; text: string }[];
};

export type ActionList = {
  positive: ActionCategory[];
  negative: ActionCategory[];
};

export const ACTION_LIST: ActionList = {
  negative: [
    {
      label: '🫧 위생',
      actions: [
        { id: 0, text: '쓰레기를 치우지 않았어요' },
        { id: 1, text: '화장실 뒷처리를 하지 않았어요' },
        { id: 2, text: '방이 어지럽혀 있어요' },
        { id: 3, text: '음식물이 방치되어 있어요' },
        { id: 4, text: '뒷정리를 하지 않았어요' },
        { id: 5, text: '좋지 않은 냄새가 나요' },
      ],
    },
    {
      label: '🧺 집안일',
      actions: [
        { id: 6, text: '설거지를 하지 않았어요' },
        { id: 7, text: '분리수거를 하지 않았어요' },
        { id: 8, text: '빨래를 하지 않았어요' },
        { id: 9, text: '청소를 하지 않았어요' },
        { id: 10, text: '청소가 미흡해요' },
        { id: 11, text: '환기를 하지 않았어요' },
      ],
    },
    {
      label: '📦 기타',
      actions: [
        { id: 12, text: '외부인을 데려왔어요' },
        { id: 13, text: '내 물건에 손을 댔어요' },
        { id: 14, text: '실내흡연을 했어요' },
        { id: 15, text: '공용 물품을 너무 많이 써요' },
        { id: 16, text: '배려하지 않았어요' },
      ],
    },
    {
      label: '📣 소음',
      actions: [
        { id: 17, text: '큰 소리로 노래했어요' },
        { id: 18, text: '기상 알람을 안 껐어요' },
        { id: 19, text: '미디어 볼륨이 너무 커요' },
        { id: 20, text: '통화 소리가 너무 커요' },
        { id: 21, text: '생활 소음이 너무 커요' },
      ],
    },
  ],
  positive: [
    {
      label: '배려',
      actions: [
        { id: 22, text: '집안일을 함께 도와줬어요' },
        { id: 23, text: '집안일을 대신 해줬어요' },
        { id: 24, text: '아침에 깨워줬어요' },
        { id: 25, text: '내 사생활을 존중해줬어요' },
        { id: 26, text: '소소한 배려를 해줬어요' },
      ],
    },
    {
      label: '위로',
      actions: [
        { id: 27, text: '따뜻하게 위로해줬어요' },
        { id: 28, text: '제 이야기를 들어줬어요' },
        { id: 29, text: '힘차게 응원해줬어요' },
        { id: 30, text: '다정하게 챙겨줬어요' },
        { id: 31, text: '같이 있어줬어요' },
      ],
    },
    {
      label: '추억',
      actions: [
        { id: 32, text: '작은 이벤트를 열어줬어요' },
        { id: 33, text: '함께 수다 떨면서 웃었어요' },
        { id: 34, text: '맛있는 식사를 했어요' },
        { id: 35, text: '행복한 시간을 보냈어요' },
        { id: 36, text: '벌레를 잡아줬어요' },
      ],
    },
    {
      label: '규칙',
      actions: [
        { id: 37, text: '맡은 집안일이 잘 되어있어요' },
        { id: 38, text: '생활 습관에 맞춰줬어요' },
        { id: 39, text: '정한 규칙을 잘 지켜줬어요' },
      ],
    },
  ],
};

export const MY_STATE_LIST = [
  { id: 1, text: '중요한 업무 중' },
  { id: 2, text: '쿨쿨 자는 중' },
  { id: 3, text: '열심히 공부 중' },
  { id: 4, text: '편하게 쉬는 중' },
  { id: 5, text: '맛있는 식사 중' },
];
