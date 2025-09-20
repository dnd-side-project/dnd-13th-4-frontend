// constants/emotions.ts
import { getGraphicUrl, GraphicKind } from '@/constants/graphic';

export const EMOTION_LIST: { kind: GraphicKind; label: string; uri: string }[] =
  [
    {
      kind: 'awkward',
      label: '난감했던',
      uri: getGraphicUrl({ page: 'emotion_select', kind: 'awkward' }),
    },
    {
      kind: 'disappointed',
      label: '서운했던',
      uri: getGraphicUrl({ page: 'emotion_select', kind: 'disappointed' }),
    },
    {
      kind: 'grateful',
      label: '고마웠던',
      uri: getGraphicUrl({ page: 'emotion_select', kind: 'grateful' }),
    },
    {
      kind: 'joyful',
      label: '기뻤던',
      uri: getGraphicUrl({ page: 'emotion_select', kind: 'joyful' }),
    },
    {
      kind: 'reliable',
      label: '든든했던',
      uri: getGraphicUrl({ page: 'emotion_select', kind: 'reliable' }),
    },
    {
      kind: 'uncomfortable',
      label: '불편했던',
      uri: getGraphicUrl({ page: 'emotion_select', kind: 'uncomfortable' }),
    },
  ];
