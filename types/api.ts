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
  graphicUrl: string;
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

export type NoteResponse = {
  id: number;
  memberRoomSenderId: number;
  memberRoomReceiverId: number;
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

// Growth Types
export type GrowthResponse = {
  increasedPositiveAction: {
    text: string;
    change: number;
  };
  decreasedNegativeAction: {
    text: string;
    change: number;
  };
  weeklyPositiveNoteCounts: {
    weeksAgo: number;
    count: number;
  }[];
};
