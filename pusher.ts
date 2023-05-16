import Pusher from "pusher"
import ClientPusher from "pusher-js"

export const serverPusher = new Pusher({
  appId: process.env.APP_ID!,
  key: process.env.APP_KEY!,
  secret: process.env.APP_SECRET!,
  cluster: process.env.APP_CLUSTER!,
  useTLS: true

})


export const clientPusher = new ClientPusher('fbabe7f82a4adb8d1c40', {
  cluster: 'mt1',
  forceTLS: true,
});


