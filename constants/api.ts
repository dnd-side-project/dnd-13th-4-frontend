/** GET : 상황 리스트 조회 */
export const EMOTION_TEMPLATE_PATH = '/templates/emotions';

/** PATCH : 쪽지 저장 */
export const getNoteSavePath = (noteId: number) => `/notes/${noteId}/save`;

/** GET : 상태 리스트 조회 */
export const STATUS_LIST_PATH = '/status';

/** GET : 룸메 상태 조회 */
export const MATE_STATUS_PATH = '/mate/status';

/** GET : 현재 내 상태 조회 */
export const MY_STATUS_PATH = '/me/status';

/** PUT : 내 상태 수정 */
export const UPDATE_MY_STATUS_PATH = '/me/status';

/** POST : 쪽지 생성 */
export const NOTES_PATH = '/notes';

/** GET : 단일 쪽지 조회 */
export const getNotePath = (noteId: number) => `/notes/${noteId}`;

/** GET : 최근 받은 쪽지 리스트 조회 */
export const LATEST_NOTES_PATH = '/notes/latest';

/** GET 보관된 쪽지 리스트 조회 */
export const NOTES_SAVED_PATH = '/notes/saved';

/** GET 끝맺음 리스트 조회 */
export const TEMPLATES_CLOSINGS_PATH = '/templates/closings';

/** GET 상황 리스트 조회 */
export const TEMPLATES_SITUATIONS_PATH = '/templates/situations';

/** GET 행동 리스트 조회 */
export const TEMPLATES_ACTIONS_PATH = '/templates/actions';

/** GET 약속 리스트 조회 */
export const TEMPLATES_PROMISES_PATH = '/templates/promises';

/** GET 통계 나의 성장 조회 */
export const MY_GROWTH_PATH = '/log/growth';

/** GET 주간 통계 조회 */
export const STATISTICS_PATH = '/log/statistics';

/** GET 나를 대표하는 키워드 */
export const KEYWORDS_PATH = '/log/keywords';

/** POST 초대코드 생성 */
export const ROOMS_PATH = '/rooms';

/** POST 초대코드와 연결된 방 정보 반환 */
export const ROOMS_JOIN_PATH = '/rooms/join';

/** GET 내 정보 조회 */
export const ME_PATH = '/me';

/** GET 룸메 정보 조회 */
export const MATE_PATH = '/mate';
