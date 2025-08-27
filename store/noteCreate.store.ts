import { EmotionType } from '@/components/notes/hooks/useClosingTemplatesQuery';
import { create, StateCreator } from 'zustand';

export type NoteValue = {
  id: number;
  text: string;
};

type Emotion = NoteValue & {
  graphicUrl: string;
  emotionType: EmotionType;
};

type NoteCreateStateType = {
  emotion: Emotion | null;
  situationAction: NoteValue | null;
  situationState: NoteValue | null;
  promise: NoteValue | null;
};

type NoteCreateActionType = {
  setEmotion: (emotion: Emotion | null) => void;
  setSituationAction: (situation: NoteValue | null) => void;
  setSituationState: (situation: NoteValue | null) => void;
  setPromise: (promise: NoteValue | null) => void;
  reset: () => void;
  getPreview: () => string[];
};

export type NoteCreateStoreType = NoteCreateStateType & NoteCreateActionType;

const defaultNoteCreateValue: NoteCreateStateType = {
  emotion: null, // 최초 선택값
  situationAction: null,
  situationState: null,
  promise: null,
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
