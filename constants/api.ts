/** GET : 상황 리스트 조회 */
export const EMOTION_TEMPLATE_PATH = '/templates/emotions';

/** PATCH : 쪽지 저장 */
export const getNoteSavePath = (noteId: number) => `/notes/${noteId}/save`;

/** GET 보관된 쪽지 리스트 조회 */
export const NOTES_SAVED_PATH = '/notes/saved';

/** POST 초대코드 생성 */
export const ROOMS_PATH = '/rooms';

/** POST 초대코드와 연결된 방 정보 반환 */
export const ROOMS_JOIN_PATH = '/rooms/join';

/** GET 내 정보 조회 */
export const ME_PATH = '/me';
