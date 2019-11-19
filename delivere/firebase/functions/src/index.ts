import * as functions from "firebase-functions";
const { Expo } = require("expo-server-sdk");

// Create a new Expo SDK client
let expo = new Expo();

// Create the messages that you want to send to clents
let messages = [];
for (let pushToken of expo.somePushTokens) {
  // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    continue;
  }

  // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
  messages.push({
    to: pushToken,
    sound: "default",
    body: "This is a test notification",
    data: { withSome: "data" }
  });
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
