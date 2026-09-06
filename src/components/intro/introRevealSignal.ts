/**
 * A one-shot signal: "the hero's IntroLaneReveal timeline has fully finished."
 *
 * The contribution grid uses it to hold its colour until every element has
 * finished animating in, instead of guessing the timeline's length with a
 * setTimeout. Module-level state is fine here — there is one hero per page and
 * IntroLaneReveal resets it each time a fresh reveal starts.
 */

let done = false;
const waiting = new Set<() => void>();

/** IntroLaneReveal calls this at the start of every reveal. */
export function resetIntroReveal() {
  done = false;
}

/** IntroLaneReveal calls this from the timeline's onComplete (and on the
 *  reduced-motion path, where there is no timeline). */
export function markIntroRevealDone() {
  if (done) return;
  done = true;
  for (const fn of waiting) fn();
  waiting.clear();
}

/**
 * Runs `fn` once the reveal is done — synchronously now if it already is.
 * Returns an unsubscribe for the still-pending case.
 */
export function whenIntroRevealDone(fn: () => void): () => void {
  if (done) {
    fn();
    return () => {};
  }
  waiting.add(fn);
  return () => waiting.delete(fn);
}
