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
      console.log("IntersectionObserver 감지:", {
        isIntersecting: target.isIntersecting,
        enabled,
        threshold,
        wasIntersecting: isIntersectingRef.current,
      });

      // 이미 교차 중이거나 교차하지 않으면 무시
      if (!target.isIntersecting || !enabled || isIntersectingRef.current) {
        if (!target.isIntersecting) {
          isIntersectingRef.current = false;
        }
        return;
      }

      isIntersectingRef.current = true;
      console.log("onIntersect 호출");
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
      console.log("observerRef.current가 null입니다");
      return;
    }

    console.log("IntersectionObserver 설정:", { enabled, threshold });

    // enabled가 false면 observer 해제
    if (!enabled) {
      isIntersectingRef.current = false;
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin: "50px", // 약간 줄여서 더 정확한 트리거
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
