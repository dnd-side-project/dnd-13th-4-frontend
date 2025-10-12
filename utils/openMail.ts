export type OpenMailOptions = {
  /** 받는 사람 이메일 주소 배열 */
  recipients?: string[];

  /** 참조(CC) 받을 사람 이메일 주소 배열 */
  ccRecipients?: string[];

  /** 숨은 참조(BCC) 받을 사람 이메일 주소 배열 */
  bccRecipients?: string[];

  /** 메일 제목 */
  subject?: string;

  /** 메일 본문 (plain text 또는 HTML) */
  body?: string;

  /** 본문을 HTML로 보낼지 여부 (true면 HTML) */
  isHtml?: boolean;

  /** 첨부할 로컬 파일 경로 배열 (예: 'file:///.../report.pdf') */
  attachments?: string[];
};

export async function openMail({
  recipients,
  ccRecipients,
  bccRecipients,
  subject,
  body,
  isHtml,
  attachments,
}: OpenMailOptions) {
  // 개발 환경에서는 메일 기능을 비활성화
  if (__DEV__) {
    console.log('메일 전송 (개발 환경):', {
      recipients,
      subject,
      body,
    });
    throw new Error('개발 환경에서는 메일 기능을 사용할 수 없습니다.');
  }

  try {
    // 동적 import로 네이티브 모듈 로드
    const MailComposer = await import('expo-mail-composer');

    const available = await MailComposer.isAvailableAsync();

    if (!available) {
      throw new Error('이 기기에서 메일 작성 기능을 사용할 수 없어요.');
    }

    await MailComposer.composeAsync({
      ...(recipients ? { recipients } : {}),
      ...(ccRecipients ? { ccRecipients } : {}),
      ...(bccRecipients ? { bccRecipients } : {}),
      ...(subject ? { subject } : {}),
      ...(body ? { body } : {}),
      ...(isHtml !== undefined ? { isHtml } : {}),
      ...(attachments ? { attachments } : {}),
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('ExpoMailComposer')) {
      throw new Error('개발 환경에서는 메일 기능을 사용할 수 없습니다.');
    }
    throw error;
  }
}
