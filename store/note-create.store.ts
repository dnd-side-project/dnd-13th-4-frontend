// store/mindNoteStore.ts
import { EMOTION_MOCK_LIST } from '@/components/notes/constants/mockData';
import { create } from 'zustand';

const defaultNoteCreateValue = {
  emotion: EMOTION_MOCK_LIST[0],
  situation1: null,
  situation2: null,
  promise: null,
};

type NoteValue = {
  text: string;
  id: number;
};

type Emotion = { graphicUrl: string } & NoteValue;

type NoteCreateStore = {
  emotion: Emotion;
  situation1: NoteValue | null;
  situation2: NoteValue | null;
  promise: NoteValue | null;

  setEmotion: (emotion: Emotion) => void;
  setSituation1: (situation: NoteValue | null) => void;
  setSituation2: (situation: NoteValue | null) => void;
  setPromise: (promise: NoteValue | null) => void;

  reset: () => void;
  getPreview: () => string[];
};

export const useNoteCreateStore = create<NoteCreateStore>((set, get) => ({
  emotion: defaultNoteCreateValue.emotion,
  situation1: defaultNoteCreateValue.situation1,
  situation2: defaultNoteCreateValue.situation2,
  promise: defaultNoteCreateValue.promise,

  setEmotion: (emotion) => set({ emotion }),
  setSituation1: (situation1) => set({ situation1 }),
  setSituation2: (situation2) => set({ situation2 }),
  setPromise: (promise) => set({ promise }),

  reset: () =>
    set({
      emotion: defaultNoteCreateValue.emotion,
      situation1: defaultNoteCreateValue.situation1,
      situation2: defaultNoteCreateValue.situation2,
      promise: defaultNoteCreateValue.promise,
    }),

  getPreview: () =>
    [
      get().emotion?.text,
      get().situation1?.text,
      get().situation2?.text,
      get().promise?.text,
    ].filter((v): v is string => Boolean(v)),
}));
