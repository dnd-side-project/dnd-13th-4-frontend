// utils/time.ts
/**
 * ISO 문자열(예: "2025-08-28T19:45:23.317Z") 기준으로
 * 지금으로부터 며칠 전인지 반환합니다.
 * - 음수(미래 시간)는 0으로 클램프합니다.
 */
export function getDaysAgo(isoString: string, now: Date = new Date()): number {
  const target = new Date(isoString);
  if (Number.isNaN(target.getTime())) {
    throw new Error('Invalid ISO date string');
  }
  const diffMs = now.getTime() - target.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, days) + 1;
}

/**
 * UX용 포매터: 상대 시간 표시
 * - 5분 미만: "방금 전(~ 4분 59초)"
 * - 5분 ~ 59분: "N분 전"
 * - 1시간 ~ 23시간: "N시간 전"
 * - 1일 이상: "N일 전"
 */
export function formatDaysAgo(
  isoString: string,
  now: Date = new Date(),
): string {
  const target = new Date(isoString);
  if (Number.isNaN(target.getTime())) {
    throw new Error('Invalid ISO date string');
  }

  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 5) {
    return '방금 전';
  }
  if (diffHour < 1) {
    return `${diffMin}분 전`;
  }
  if (diffDay < 1) {
    return `${diffHour}시간 전`;
  }
  if (diffDay < 3) {
    return `${diffDay}일 전`;
  }
  return formatDate(isoString);
}
/**
 * ISO 문자열을 "M월 D일" 형식으로 변환
 * 예: "2025-08-28T19:45:23.317Z" -> "8월 29일"
 */
export function formatMonthDay(date: Date = new Date()): string {
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid ISO date string');
  }

  const month = date.getMonth() + 1; // getMonth()는 0부터 시작
  const day = date.getDate();

  return `${month}월 ${day}일`;
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
