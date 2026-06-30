"use client";

import { AnimatePresence, motion } from "framer-motion";

type FAQItemProps = {
  item: {
    id: number;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
};

export default function FAQItem({
  item,
  isOpen,
  onToggle,
}: FAQItemProps) {
  return (
    <div
      className={`
        ${
          item.id !== 1
            ? "border-t border-border"
            : ""
        }
      `}
    >
      <button
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          justify-between

          gap-6

          py-7

          text-left

          transition-colors
          duration-300

          hover:text-primary
        "
      >
        <h3
          className="
            text-lg
            font-medium

            lg:text-xl
          "
        >
          {item.question}
        </h3>

        <span
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            border
            border-border

            text-xl
            font-light

            transition-all
            duration-300

            group-hover:border-primary
          "
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <p
              className="
                max-w-3xl

                pb-8
                pr-14

                text-base
                leading-8

                text-muted
              "
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}