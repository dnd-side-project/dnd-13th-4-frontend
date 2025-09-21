import Constants from 'expo-constants';
import * as Device from 'expo-device';

type Props = {
  userId: number;
};

export const getMailDeviceInfo = ({ userId }: Props) => {
  const deviceInfo = `






--- 아래 내용은 수정하지 말아주세요. ---
Device: ${Device.modelName ?? 'Unknown'}
OS: ${Device.osName ?? 'OS'} ${Device.osVersion ?? ''}
App Version: ${Constants.expoConfig?.version ?? 'N/A'} (${
    Constants.nativeBuildVersion ?? 'N/A'
  })
User Id: ${userId}
  `.trim();

  return deviceInfo;
};
