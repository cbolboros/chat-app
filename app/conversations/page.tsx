import EmptyState from "@/components/EmptyState";

const Home = () => {
  return (
    <>
      <div className="lg:pl-80 h-full lg:block hidden">
        <EmptyState />
      </div>
    </>
  );
};

export default Home;
