import EmptyState from "@/components/EmptyState";
import ConversationListContainer from "@/app/conversations/components/ConversationListContainer";
import { Suspense } from "react";

const Home = () => {
  return (
    <>
      <div className="lg:pl-80 h-full lg:block hidden">
        <EmptyState />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ConversationListContainer />
      </Suspense>
    </>
  );
};

export default Home;
