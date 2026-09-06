"use client";

import { useCallback, useState } from "react";
import { Preloader } from "@/components/chrome/Preloader";
import { Cursor } from "@/components/chrome/Cursor";
import { Nav } from "@/components/chrome/Nav";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Journey } from "@/components/sections/Journey";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";
import { Craft } from "@/components/sections/Craft";
import { Chapters } from "@/components/sections/Chapters";
import { Person } from "@/components/sections/Person";
import { Exploring } from "@/components/sections/Exploring";
import { Contact } from "@/components/sections/Contact";

/**
 * The whole journey, in reading order.
 *
 * `started` is the one piece of shared state: the intro releases it, and the
 * hero and chrome animate in from there. Everything below the fold drives
 * itself from its own scroll position.
 */
export function Experience() {
  const [started, setStarted] = useState(false);
  const onDone = useCallback(() => setStarted(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav visible={started} />

      <main id="main">
        <Hero started={started} />
        <Story />
        <Journey />
        <Tools />
        <Work />
        <Craft />
        <Chapters />
        <Person />
        <Exploring />
        <Contact />
      </main>
    </>
  );
}
