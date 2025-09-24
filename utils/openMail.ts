import { Platform } from 'react-native';

// 시뮬레이터/웹에서는 동적 import로 처리
const getMailComposer = async () => {
  if (Platform.OS === 'web' || __DEV__) {
    // 개발 환경이나 웹에서는 모듈 없이 처리
    return null;
  }

  try {
    const MailComposer = await import('expo-mail-composer');
    return MailComposer;
  } catch (error) {
    console.warn('expo-mail-composer not available:', error);
    return null;
  }
};

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
  const MailComposer = await getMailComposer();

  if (!MailComposer) {
    // 개발 환경에서는 콘솔 로그만 출력
    if (__DEV__) {
      console.log('Mail compose requested (dev mode):', {
        recipients,
        subject,
        body: body?.substring(0, 100) + '...',
      });
      return;
    }
    throw new Error('이 기기에서 메일 작성 기능을 사용할 수 없어요.');
  }

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
}
