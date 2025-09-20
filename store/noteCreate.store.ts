import { Emotion } from '@/components/notes/feeling/module/useEmotionTemplatesQuery';
import { create, StateCreator } from 'zustand';

export type NoteValue = {
  id: number;
  text: string;
};

type NoteCreateStateType = {
  emotion: Emotion | null;
  situationAction: NoteValue | null;
  situationState: NoteValue | null;
  promise: NoteValue | null;
  closing: NoteValue | null;
};

type NoteCreateActionType = {
  setEmotion: (emotion: Emotion | null) => void;
  setSituationAction: (situation: NoteValue | null) => void;
  setSituationState: (situation: NoteValue | null) => void;
  setPromise: (promise: NoteValue | null) => void;
  setClosing: (closing: NoteValue | null) => void;
  reset: () => void;
  getPreview: () => string[];
};

export type NoteCreateStoreType = NoteCreateStateType & NoteCreateActionType;

const defaultNoteCreateValue: NoteCreateStateType = {
  emotion: null, // 최초 선택값
  situationAction: null,
  situationState: null,
  promise: null,
  closing: null,
};

const noteCreateActions: StateCreator<
  NoteCreateStoreType,
  [],
  [],
  NoteCreateActionType
> = (set, get, _api) => ({
  setEmotion: (emotion) => set({ emotion }),
  setSituationAction: (situation) => set({ situationAction: situation }),
  setSituationState: (situation) => set({ situationState: situation }),
  setPromise: (promise) => set({ promise }),
  setClosing: (closing) => set({ closing }),

  reset: () => set(defaultNoteCreateValue),

  getPreview: () => {
    const { emotion, situationAction, situationState, promise } = get();
    return [
      emotion?.text,
      situationAction?.text,
      situationState?.text,
      promise?.text,
    ].filter((v): v is string => Boolean(v));
  },
});

/** ---------- Store ---------- */
export const useNoteCreateStore = create<NoteCreateStoreType>()(
  (set, get, api) => ({
    ...defaultNoteCreateValue,
    ...noteCreateActions(set, get, api),
  }),
);
