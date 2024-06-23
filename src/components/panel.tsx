import * as React from "react"

"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

function Card({ card, setActiveCard }) {
  return (
    <motion.div
      layoutId={`card-${card.title}`}
      className="h-[370px] w-[320px] rounded overflow relative inset-0"
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveCard(card)}
      style={{ borderRadius: 20 }}
    >
      <motion.img
        layoutId={`image-${card.title}`}
        src={card.image}
        alt="image"
        className="w-full h-full absolute inset-0"
        style={{ borderRadius: 20 }}
      />
      <motion.button
        aria-hidden
        tabIndex={-1}
        layoutId={`close-button-${card.title}`}
        className="absolute top-[16px] right-[16px] h-[32px] w-[32px] rounded-full backdrop-blur-md text-white flex items-center justify-center bg-black/[0.2]"
        style={{ opacity: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          height="20"
          width="20"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
      <motion.div
        layoutId={`card-content-${card.title}`}
        className="absolute bottom-0 left-0 right-0"
      >
        <div className="card-text">
          <motion.h2
            layoutId={`card-heading-${card.title}`}
            className="text-xl min-w-[160px] text-left uppercase text-white mb-1"
          >
            Game of the day
          </motion.h2>
        </div>
      </motion.div>

      <motion.div
        layoutId={`card-long-description-${card.title}`}
        style={{ position: "absolute", top: "100%", opacity: 0 }}
      >
        <div>
          <p>
            <b>Are you ready?</b> {card.longDescription}
          </p>
          <p>
            <b>The never ending adventure</b>
            In this game set in a fairy tale world, players embark on a quest
            through mystical lands filled with enchanting forests and towering
            mountains.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ActiveCard({ activeCard, setActiveCard }) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setActiveCard(null));

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${activeCard.title}`}
      className="h-full w-[360px] top-0 overflow absolute flex flex-col inset-0"
    >
      <div className="h-[430px] w-[360px] relative">
        <motion.img
          layoutId={`image-${activeCard.title}`}
          src={activeCard.image}
          alt="image"
          className="w-full h-full object-cover"
          style={{ borderRadius: 0 }}
        />
        <motion.button
          layoutId={`close-button-${activeCard.title}`}
          className="absolute top-[16px] right-[16px] h-[32px] w-[32px] rounded-full backdrop-blur-md text-white flex items-center justify-center bg-black/[0.2]"
          aria-label="Close button"
          onClick={() => setActiveCard(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            height="20"
            width="20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
        <motion.div
          layoutId={`card-content-${activeCard.title}`}
          className="card-content active-card-content"
        >
          <div className="card-text">
            <motion.h2
              layoutId={`card-heading-${activeCard.title}`}
              layout
              className="card-heading"
            >
              Game of the day
            </motion.h2>
          </div>
          <motion.div
            layoutId={`card-extra-info-${activeCard.title}`}
            className="extra-info"
            style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
          >
            <motion.img
              src={activeCard.logo}
              width={40}
              height={40}
              alt="play"
              layoutId={`card-game-image-${activeCard.title}`}
              className="rounded-lg"
            />
            <div className="desc-wrapper">
              <motion.span
                layoutId={`card-game-title-${activeCard.title}`}
                className="game-title"
              >
                {activeCard.title}
              </motion.span>
              <motion.span
                layoutId={`card-game-subtitle-${activeCard.title}`}
                className="game-subtitle"
              >
                {activeCard.description}
              </motion.span>
            </div>
            <motion.button
              layoutId={`card-button-${activeCard.title}`}
              layout
              className="get-button"
            >
              Get
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        layoutId={`card-long-description-${activeCard.title}`}
        className="flex p-3"
      >
        <p>
          <b>Are you ready?</b> {activeCard.longDescription}
        </p>
        <p>
          <b>The never ending adventure </b>
          In this game set in a fairy tale world, players embark on a quest
          through mystical lands filled with enchanting forests and towering
          mountains. Players can explore the world, build their own viking
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Panel() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="cards-wrapper">
      {CARDS.map((card) => (
        <Card key={card.title} card={card} setActiveCard={setActiveCard} />
      ))}
      <AnimatePresence>
        {activeCard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeCard ? (
          <ActiveCard activeCard={activeCard} setActiveCard={setActiveCard} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const CARDS = [
  {
    title: "Vikings",
    subtitle: "Clash of the Norse Warriors",
    description: "A game about vikings",
    longDescription:
      "A game about vikings, where you can play as a viking and fight other vikings. You can also build your own viking village and explore the world.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/app-store-like-cards/game.webp",
    logo: "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/app-store-like-cards/game-logo.webp",
  },
];

