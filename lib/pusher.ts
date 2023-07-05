import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "eu",
  useTLS: true,
});

declare global {
  var pusher: PusherClient | undefined;
}

const pusherClient =
  global.pusher ||
  new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
    cluster: "eu",
  });

if (process.env.NODE_ENV !== "production") global.pusher = pusherClient;

export { pusherClient };
