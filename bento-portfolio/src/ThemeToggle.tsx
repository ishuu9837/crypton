import { useEffect, useSyncExternalStore } from "react";
import type { MouseEvent, ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function useIsMounted(): boolean {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

export function ThemeToggle(): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    if (!mounted) return;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      resolvedTheme === "dark" ? "#0b0b0c" : "#f1ecdf",
    );
  }, [mounted, resolvedTheme]);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>): void {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startViewTransition = document.startViewTransition?.bind(document);

    if (!startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );

    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = startViewTransition(() => setTheme(next));
    const clearAnimationOrigin = () => {
      delete root.dataset.themeAnim;
    };
    void transition.finished.then(clearAnimationOrigin, clearAnimationOrigin);
  }

  return (
    <button
      className="white-button icon-button theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      aria-pressed={mounted ? isDark : undefined}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <Sun className={`theme-icon${isDark ? " is-visible" : ""}`} size={18} />
        <Moon className={`theme-icon${mounted && !isDark ? " is-visible" : ""}`} size={18} />
      </span>
    </button>
  );
}
