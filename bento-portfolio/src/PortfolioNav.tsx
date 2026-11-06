import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const items = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

// The reference's sliding pill uses section anchors in this single-page portfolio.
export function PortfolioNav({ theme, onThemeChange }: {
  theme: "dark" | "light"; onThemeChange: () => void;
}) {
  const [hash, setHash] = useState(() => location.hash || "#home");
  const reduced = useReducedMotion();

  useEffect(() => {
    function updateHash() { setHash(location.hash || "#home"); }
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <nav className="portfolio-nav" aria-label="Primary">
      <ul>
        {items.map(({ label, href }) => (
          <li key={href}>
            {hash === href && <motion.span className="portfolio-nav-active" aria-hidden="true"
              layoutId={reduced ? undefined : "portfolio-nav-active"}
              transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <a href={href} aria-current={hash === href ? "location" : undefined}>{label}</a>
          </li>
        ))}
      </ul>
      <button type="button" className="portfolio-theme" onClick={onThemeChange}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
        {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
      </button>
    </nav>
  );
}
