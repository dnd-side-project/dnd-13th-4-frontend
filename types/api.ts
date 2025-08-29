// Status Types
export type StatusResponse = {
  id: number;
  emoji: string;
  text: string;
  request: string;
  location: 'HOME' | 'OUTDOORS';
};

// Member Status Types
export type MemberStatusResponse = {
  emoji: string | null;
  text: string | null;
  statusStartedAt: string | null;
  reservedTimeInfo: {
    hour: number;
    minute: number;
  } | null;
};

export type MemberStatusUpdateRequest = {
  statusId: number;
  startedAt: string;
  reservedTimeInfo: {
    hour: number;
    minute: number;
  };
};

// Member Types
export type MemberResponse = {
  id: number;
  name: string;
  email: string;
  image: string;
  isMatched: boolean;
};

export type MateResponse = {
  id: number;
  name: string;
  image: string;
  joinedAt: string;
};

// Room Types
export type RoomResponse = {
  id: number;
  code: string;
};

export type RoomJoinRequest = {
  roomCode: string;
};

// Note Types
export type ActionResponse = {
  id: number;
  text: string;
};

export type ClosingResponse = {
  id: number;
  emotionType: string;
  text: string;
};

export type EmotionResponse = {
  id: number;
  emotionType: string;
  text: string;
  selectionImageUrl: string;
  previewImageUrl: string;
  archiveImageUrl: string;
  homeThumbnailUrl: string;
};

export type PromiseResponse = {
  id: number;
  emotionType: string;
  text: string;
};

export type SituationResponse = {
  id: number;
  emotionType: string;
  text: string;
};

export type NoteType = {
  id: number;
  senderId: number;
  receiverId: number;
  roomId: number;
  emotion: EmotionResponse;
  action: ActionResponse;
  situation: SituationResponse;
  promise: PromiseResponse;
  closing: ClosingResponse;
  sequence: number;
  isRead: boolean;
  isSaved: boolean;
  createdAt: string;
};

export type SimpleNoteResponse = {
  id: number;
  emotion: EmotionResponse;
  isRead: boolean;
  createdAt: string;
};

// Statistics Types
export type StatisticsResponse = {
  notesSentThisWeek: number;
  notesReceivedThisWeek: number;
  totalNotesExchanged: number;
  roomJoinedAt: string;
};

export type ActionCategoryResponse = {
  id: number;
  emotionType: string;
  name: string;
};

export type KeywordResponse = {
  positiveActionCategory: ActionCategoryResponse;
  negativeActionCategory: ActionCategoryResponse;
};

export type SimpleActionChange = {
  text: string;
  change: number;
};

export type WeeklyNoteCount = {
  weeksAgo: number;
  count: number;
};

export type GrowthResponse = {
  increasedPositiveAction: SimpleActionChange;
  decreasedNegativeAction: SimpleActionChange;
  weeklyPositiveNoteCounts: WeeklyNoteCount[];
};
