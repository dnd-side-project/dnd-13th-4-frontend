// store/mindNoteStore.ts
import { create } from 'zustand';

type NoteValue = {
  id: number;
  text: string;
} | null;

type NoteCreateStore = {
  emotion: NoteValue;
  situation1: NoteValue;
  situation2: NoteValue;
  promise: NoteValue;

  setEmotion: (emotion: NoteValue) => void;
  setSituation1: (situation: NoteValue) => void;
  setSituation2: (situation: NoteValue) => void;
  setPromise: (promise: NoteValue) => void;

  reset: () => void;
  getValues: () => string[];
};

export const useNoteCreateStore = create<NoteCreateStore>((set, get) => ({
  emotion: null,
  situation1: null,
  situation2: null,
  promise: null,

  setEmotion: (emotion) => set({ emotion }),
  setSituation1: (situation1) => set({ situation1 }),
  setSituation2: (situation2) => set({ situation2 }),
  setPromise: (promise) => set({ promise }),

  reset: () =>
    set({
      emotion: null,
      situation1: null,
      situation2: null,
      promise: null,
    }),

  getValues: () =>
    [
      get().emotion?.text,
      get().situation1?.text,
      get().situation2?.text,
      get().promise?.text,
    ].filter((v): v is string => Boolean(v)),
}));
