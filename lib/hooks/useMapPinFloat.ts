import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mapActions } from "../store/mapSlice";

const useMapPinFloat = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [clickedLatLng, setClickedLatLng] =
    useState<google.maps.LatLngLiteral | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      setCursorPos({ x, y });
    };

    const onLeave = () => {
      setCursorPos(null);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  const mouseMoveHandler = (event: MapMouseEvent) => {
    if (!event.domEvent) return;
    const mouseEvent = event.domEvent as MouseEvent;
    setCursorPos({ x: mouseEvent.clientX, y: mouseEvent.clientY });
  };

  const onClickHandler = (event: MapMouseEvent) => {
    if (!event.detail.latLng) return;
    setClickedLatLng(event.detail.latLng);
    dispatch(mapActions.setLatLng(event.detail.latLng));
    // dispatch(mapActions.setIsFloatingEnabled(false));
    setCursorPos(null);
  };

  return {
    cursorPos,
    clickedLatLng,
    mouseMoveHandler,
    onClickHandler,
  };
};

export default useMapPinFloat;
