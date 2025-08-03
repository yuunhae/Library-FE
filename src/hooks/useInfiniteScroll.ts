import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  onIntersect,
  enabled = true,
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(false); // 중복 호출 방지

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      // 이미 교차 중이거나 교차하지 않으면 무시
      if (!target.isIntersecting || !enabled || isIntersectingRef.current) {
        if (!target.isIntersecting) {
          isIntersectingRef.current = false;
        }
        return;
      }

      isIntersectingRef.current = true;
      onIntersect();

      // 호출 후 잠시 대기하여 중복 호출 방지
      setTimeout(() => {
        isIntersectingRef.current = false;
      }, 1000);
    },
    [onIntersect, enabled, threshold]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) {
      return;
    }

    // enabled가 false면 observer 해제
    if (!enabled) {
      isIntersectingRef.current = false;
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin: "50px",
    });

    observer.observe(element);

    return () => {
      isIntersectingRef.current = false;
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [handleObserver, threshold, enabled]);

  return observerRef;
};
