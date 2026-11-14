// components/Homepage.js
import React from "react";
import Link from "next/link";
import Animated from "./Animated";

const TOOLS = [
  {
    href: "/calculator",
    title: "Industry Calculator",
    text: "Materials, job costs and profit for any blueprint or reaction, down through every sub-component.",
  },
  {
    href: "/appraisal",
    title: "Appraisal",
    text: "Paste your inventory and get buy, sell and split values at any trade hub, with a link to share.",
  },
  {
    href: "/market",
    title: "Market Browser",
    text: "Live orders and price history for every item across Jita, Amarr, Rens, Dodixie and Hek.",
  },
];

function Homepage() {
  return (
    <Animated>
      <main id="homebox">
        <h1 className="home-title">Industry and market tools for EVE Online</h1>
        <p className="home-lead">
          Work out what a build really costs, what your loot is worth, and where to sell it.
        </p>
        <div className="home-tools">
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="home-tool">
              <span className="home-tool-title">{tool.title}</span>
              <span className="home-tool-text">{tool.text}</span>
            </Link>
          ))}
        </div>
        <p className="home-more">
          Also: a <Link href="/picalculator">Planetary Interaction calculator</Link> for PI production chains.
        </p>
      </main>
    </Animated>
  );
}

export default Homepage;
