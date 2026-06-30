"use client";

import { useState } from "react";

import FAQItem from "./FAQItem";
import { faq } from "./faq";

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<number>(-1);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? -1 : id));
  };

  return (
    <div
      className="
        border-y
        border-border
      "
    >
      {faq.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
