/**
 * NOTE : FCM 푸시 발송용 테스트 로직
 * 이 로직을 백엔드 서버에서 실행시켜주어야함.
 *
 * deviceToken의 경우, 사용자마다 다 다름. 이 token은 사용자 식별값이므로, 유저DB에 저장해서 사용해야함.
 */

const { JWT } = require('google-auth-library');
const fetch = require('node-fetch');

async function sendFCMv1Notification() {
  //   const key = require(process.env.FCM_SERVER_KEY);
  // NOTE : 이 로직은 process.env 로 관리하면 좋음.
  const key = require('./wini-3c48c-firebase-adminsdk-fbsvc-f18aeab9e7.json');
  const firebaseAccessToken = await getAccessTokenAsync(key);

  //   const deviceToken = process.env.FCM_DEVICE_TOKEN;
  const deviceToken =
    'dkMeeEopRaCEBDPOJxmGwP:APA91bF_BcSHKWZOrDZhfifYOlwYJMXb2CjIPYY1orQ3q6QEGrwrwFc6V7JzWI7Y3zwjEQStaDV2QQwjZMyveSZk-vKwenDTq_9GPEbA-2IlZfavBY91Lck';

  const messageBody = {
    message: {
      token: deviceToken,
      data: {
        channelId: 'default',
        message: 'Testing',
        title: `This is an FCM notification message`,
        body: JSON.stringify({ title: 'bodyTitle', body: 'bodyBody' }),
        scopeKey: '@yourExpoUsername/yourProjectSlug',
        experienceId: '@yourExpoUsername/yourProjectSlug',
      },
    },
  };

  const response = await fetch(
    // `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_NAME}/messages:send`,
    `https://fcm.googleapis.com/v1/projects/${'wini-3c48c'}/messages:send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${firebaseAccessToken}`,
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageBody),
    },
  );

  const readResponse = (response: Response) => response.json();
  const json = await readResponse(response);

  console.log(`Response JSON: ${JSON.stringify(json, null, 2)}`);
}

function getAccessTokenAsync(
  key: any, // Contents of your FCM private key file
) {
  return new Promise(function (resolve, reject) {
    console.log(key.private_key);
    const jwtClient = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    jwtClient.authorize(function (err: any, tokens: any) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens?.access_token);
    });
  });
}

sendFCMv1Notification();
