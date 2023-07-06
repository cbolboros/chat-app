import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ScrollToBottomContainerProps {
  bodyRef: React.RefObject<HTMLDivElement>;
}
const ScrollToBottomContainer: React.FC<ScrollToBottomContainerProps> = ({
  bodyRef,
}) => {
  const [isShowScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const scrollHandler = throttle((e: any) => {
      if (e.target.scrollTopMax - e.target.scrollTop > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }, 200);
    bodyRef?.current?.addEventListener("scroll", scrollHandler);
    return () => {
      bodyRef?.current?.removeEventListener("scroll", scrollHandler);
    };
  }, [bodyRef]);
  return (
    <div className="absolute bottom-20 flex w-full justify-center">
      <AnimatePresence>
        {isShowScrollButton && (
          <motion.div
            initial={{
              y: 30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 50,
            }}
          >
            <Button
              className="font-light"
              onClick={() => {
                bodyRef?.current?.scrollTo({
                  top: bodyRef.current.scrollHeight,
                  behavior: "smooth",
                });
              }}
            >
              Scroll to bottom
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollToBottomContainer;
