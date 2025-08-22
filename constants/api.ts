/** GET : 상황 리스트 조회 */
export const EMOTION_TEMPLATE_PATH = '/templates/emotions';

/** PATCH : 쪽지 저장 */
export const getNoteSavePath = (noteId: number) => `/notes/${noteId}/save`;

/** GET 보관된 쪽지 리스트 조회 */
export const NOTES_SAVED_PATH = '/notes/saved';
