import EmptyState from "@/components/EmptyState";
import ConversationListContainer from "@/app/conversations/components/ConversationListContainer";

const Home = () => {
  return (
    <>
      <div className="lg:pl-80 h-full lg:block hidden">
        <EmptyState />
      </div>
      <ConversationListContainer />
    </>
  );
};

export default Home;
