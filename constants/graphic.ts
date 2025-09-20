const S3_URL = 'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com';

export type GraphicKind =
  | 'awkward'
  | 'disappointed'
  | 'grateful'
  | 'joyful'
  | 'reliable'
  | 'uncomfortable';

export type GraphicPage =
  | 'home'
  | 'storage'
  | 'letter_detail'
  | 'emotion_select';

type GetGraphicUrlProps = {
  page: GraphicPage;
  kind: GraphicKind;
};

export const getGraphicUrl = ({ kind, page }: GetGraphicUrlProps) =>
  `${S3_URL}/images/${page}/${kind}.png`;
