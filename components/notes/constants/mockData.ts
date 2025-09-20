import { getGraphicUrl, GraphicKind } from '@/constants/graphic';

export type EmotionMock = {
  id: number;
  emotionType: GraphicKind;
  text: string;
  graphicUrl: string;
};

export const EMOTION_MOCK_LIST: EmotionMock[] = [
  {
    id: 0,
    emotionType: 'awkward',
    text: '난감했던',
    graphicUrl: getGraphicUrl({ kind: 'awkward', page: 'emotion_select' }),
  },
  {
    id: 1,
    emotionType: 'disappointed',
    text: '서운했던',
    graphicUrl: getGraphicUrl({ kind: 'disappointed', page: 'emotion_select' }),
  },
  {
    id: 2,
    emotionType: 'grateful',
    text: '고마웠던',
    graphicUrl: getGraphicUrl({ kind: 'grateful', page: 'emotion_select' }),
  },
  {
    id: 3,
    emotionType: 'joyful',
    text: '기뻤던',
    graphicUrl: getGraphicUrl({ kind: 'joyful', page: 'emotion_select' }),
  },
  {
    id: 4,
    emotionType: 'reliable',
    text: '든든했던',
    graphicUrl: getGraphicUrl({ kind: 'reliable', page: 'emotion_select' }),
  },
  {
    id: 5,
    emotionType: 'uncomfortable',
    text: '불편했던',
    graphicUrl: getGraphicUrl({
      kind: 'uncomfortable',
      page: 'emotion_select',
    }),
  },
];
