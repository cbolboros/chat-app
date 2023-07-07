import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowDownCircle } from "react-icons/hi2";

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
    <div className="absolute bottom-20 flex w-full">
      <AnimatePresence>
        {isShowScrollButton && (
          <motion.div
            initial={{
              x: -50,
            }}
            animate={{
              x: 20,
            }}
            exit={{
              x: -50,
              opacity: 0,
            }}
          >
            <HiArrowDownCircle
              className="w-10 h-10 cursor-pointer"
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
  );
};

export default ScrollToBottomContainer;
