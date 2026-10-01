'use client';

import type { LenisOptions } from 'lenis';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useRef, useState } from 'react';

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({
  children,
  options = {},
}: {
  children: React.ReactNode;
  options?: LenisOptions;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const optionsRef = useRef(options);
  const isFirstRender = useRef(true);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      touchMultiplier: 2,
      infinite: false,
      anchors: true,
      syncTouch: false,
      ...optionsRef.current,
    });

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathname.current = pathname;
      return;
    }

    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    if (window.location.hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
