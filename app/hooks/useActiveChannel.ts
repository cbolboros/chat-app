import { useEffect, useState } from "react";
import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { pusherClient } from "@/lib/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    const setInitialMembers = (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    };

    const addMember = (member: Record<string, any>) => {
      add(member.id);
    };

    const removeMember = (member: Record<string, any>) => {
      remove(member.id);
    };

    channel.bind("pusher:subscription_succeeded", setInitialMembers);

    channel.bind("pusher:member_added", addMember);

    channel.bind("pusher:member_removed", removeMember);

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        channel?.unbind("pusher:subscription_succeeded", setInitialMembers);
        channel?.unbind("pusher:member_added", addMember);
        channel?.unbind("pusher:member_removed", removeMember);
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
