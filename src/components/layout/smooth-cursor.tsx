'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]';

const RING_SIZE = {
  base: 30,
  active: 58,
  pressedFactor: 0.6,
};

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringVisualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringVisual = ringVisualRef.current;
    if (!dot || !ring || !ringVisual) return;

    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!finePointer || reduced) return;

    document.documentElement.classList.add('has-smooth-cursor');

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
      autoAlpha: 0,
    });

    let isHovering = false;
    let isPressing = false;
    let clickResetTimeout: ReturnType<typeof setTimeout> | undefined;

    const targetSize = () => {
      const base = isHovering ? RING_SIZE.active : RING_SIZE.base;
      return isPressing ? base * RING_SIZE.pressedFactor : base;
    };

    const updateRingSize = (duration: number) => {
      gsap.to(ringVisual, {
        width: targetSize(),
        height: targetSize(),
        duration: duration * 1.25,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const moveDotX = gsap.quickTo(dot, 'x', {
      duration: 0.16,
      ease: 'power3.out',
    });
    const moveDotY = gsap.quickTo(dot, 'y', {
      duration: 0.16,
      ease: 'power3.out',
    });
    const moveRingX = gsap.quickTo(ring, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    });
    const moveRingY = gsap.quickTo(ring, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    });

    let hasShown = false;
    const onMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
      if (!hasShown) {
        hasShown = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
    };

    const isRelatedInsideTarget = (e: MouseEvent, target: Element) => {
      const relatedTarget = e.relatedTarget;
      return relatedTarget instanceof Node && target.contains(relatedTarget);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest?.(HOVER_SELECTOR);
      if (!target || isRelatedInsideTarget(e, target)) return;

      isHovering = true;
      ringVisual.classList.add('is-active');
      updateRingSize(0.3);
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest?.(HOVER_SELECTOR);
      if (!target || isRelatedInsideTarget(e, target)) return;

      isHovering = false;
      ringVisual.classList.remove('is-active');
      updateRingSize(0.3);
    };

    const onPressStart = () => {
      clearTimeout(clickResetTimeout);
      ringVisual.classList.remove('is-clicking');
      isPressing = true;
      ringVisual.classList.add('is-pressing');
      updateRingSize(0.28);
    };

    const onPressEnd = () => {
      isPressing = false;
      ringVisual.classList.remove('is-pressing');
      updateRingSize(0.42);

      ringVisual.classList.remove('is-clicking');
      void ringVisual.offsetWidth;
      ringVisual.classList.add('is-clicking');
      clickResetTimeout = setTimeout(() => {
        ringVisual.classList.remove('is-clicking');
      }, 420);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('pointerdown', onPressStart, {
      capture: true,
      passive: true,
    });
    document.addEventListener('pointerup', onPressEnd, {
      capture: true,
      passive: true,
    });
    document.addEventListener('pointercancel', onPressEnd, {
      capture: true,
      passive: true,
    });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      clearTimeout(clickResetTimeout);
      gsap.killTweensOf([dot, ring]);
      gsap.killTweensOf(ringVisual);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerdown', onPressStart, true);
      document.removeEventListener('pointerup', onPressEnd, true);
      document.removeEventListener('pointercancel', onPressEnd, true);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.classList.remove('has-smooth-cursor');
    };
  });

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="
          pointer-events-none fixed left-0 top-0 z-120
          size-1.5 rounded-full bg-foreground
          opacity-0
          will-change-transform
          motion-reduce:hidden
          [@media(hover:none)]:hidden
          pointer-coarse:hidden
        "
      />

      <div
        ref={ringRef}
        aria-hidden="true"
        className="
          pointer-events-none fixed left-0 top-0 z-120
          opacity-0
          will-change-transform
          motion-reduce:hidden
          [@media(hover:none)]:hidden
          pointer-coarse:hidden
        "
      >
        <div
          ref={ringVisualRef}
          id="cursor-ring"
          aria-hidden="true"
          className="
            pointer-events-none absolute left-1/2 top-1/2 size-7.5
            -translate-x-1/2 -translate-y-1/2 rounded-full
            border border-foreground/35
            transition-[border-color,background-color]
            duration-300 ease-out
          "
        />
      </div>
    </>
  );
}
