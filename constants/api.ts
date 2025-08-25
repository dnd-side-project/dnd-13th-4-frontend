/** GET : 상황 리스트 조회 */
export const EMOTION_TEMPLATE_PATH = '/templates/emotions';

/** PATCH : 쪽지 저장 */
export const getNoteSavePath = (noteId: number) => `/notes/${noteId}/save`;

/** GET : 상태 리스트 조회 */
export const STATUS_LIST_PATH = '/status';

/** GET : 룸메 상태 조회 */
export const MATE_STATUS_PATH = '/mate/status';

/** GET : 내 정보 조회 */
export const MY_INFO_PATH = '/me';

/** GET : 현재 내 상태 조회 */
export const MY_STATUS_PATH = '/me/status';

/** PUT : 내 상태 수정 */
export const UPDATE_MY_STATUS_PATH = '/me/status';

/** GET : 단일 쪽지 조회 */
export const getNotePath = (noteId: number) => `/notes/${noteId}`;

/** GET : 최근 받은 쪽지 리스트 조회 */
export const LATEST_NOTES_PATH = '/notes/latest';

/** GET 보관된 쪽지 리스트 조회 */
export const NOTES_SAVED_PATH = '/notes/saved';
