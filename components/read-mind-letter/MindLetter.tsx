import useNoteQuery from '@/hooks/api/useNoteQuery';
import { formatDaysAgo } from '@/lib/time';
import { EmotionType } from '../notes/hooks/useClosingTemplatesQuery';
import NoteCard from '../notes/submit/NoteCard';

type Props = {
  noteId: number;
};

const MindLetter = ({ noteId }: Props) => {
  const { data, isLoading, isError } = useNoteQuery({ noteId });

  if (isLoading) {
    return null;
  }
  if (isError || !data) {
    return null;
  }

  const { action, closing, createdAt, emotion, promise, situation } = data;

  return (
    <NoteCard
      date={formatDaysAgo(createdAt)}
      emotionText={emotion.text}
      imageUrl={emotion.archiveImageUrl}
      promiseText={promise.text}
      situationActionText={action.text}
      situationStateText={situation.text}
      emotionType={emotion.emotionType as EmotionType}
      randomMessage={closing.text}
      style={{ zIndex: 100 }}
    />
  );
};

export default MindLetter;
