import * as MailComposer from 'expo-mail-composer';

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
