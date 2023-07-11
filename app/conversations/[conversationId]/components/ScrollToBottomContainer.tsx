import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowDownCircle } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

interface ScrollToBottomContainerProps {
  bodyRef: React.RefObject<HTMLDivElement>;
}
const ScrollToBottomContainer: React.FC<ScrollToBottomContainerProps> = ({
  bodyRef,
}) => {
  const [isShowScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    let current = bodyRef.current;
    const scrollHandler = throttle((e: any) => {
      const height = e.target.scrollHeight - e.target.clientHeight;
      if (!isShowScrollButton && height - e.target.scrollTop > 200) {
        setShowScrollButton(true);
      } else if (isShowScrollButton && height - e.target.scrollTop < 200) {
        setShowScrollButton(false);
      }
    }, 200);
    current?.addEventListener("scroll", scrollHandler);
    return () => {
      current?.removeEventListener("scroll", scrollHandler);
    };
  }, [bodyRef, isShowScrollButton]);
  return (
    <div className="absolute bottom-20 flex lg:left-1/2 lg:-translate-x-1/2">
      <div className="hidden lg:block">
        <AnimatePresence>
          {isShowScrollButton && (
            <motion.div
              initial={{
                y: 50,
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: 50,
                opacity: 0,
              }}
            >
              <Button
                onClick={() => {
                  bodyRef?.current?.scrollTo({
                    top: bodyRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                Scroll To Bottom
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="block lg:hidden">
        <AnimatePresence>
          {isShowScrollButton && (
            <motion.div
              initial={{
                x: "110vw",
              }}
              animate={{
                x: "90vw",
              }}
              exit={{
                x: "110vw",
                opacity: 0,
              }}
            >
              <HiArrowDownCircle
                className="h-8 w-8 cursor-pointer"
                onClick={() => {
                  bodyRef?.current?.scrollTo({
                    top: bodyRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScrollToBottomContainer;
