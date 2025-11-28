import React, { useRef, useState } from "react";
import { Panel, usePanelsStore } from "../store/usePanelsStore";
import SplitButton from "./SplitButton";

interface Props {
  panel: Panel;
}

export const PanelView: React.FC<Props> = ({ panel }) => {
  const splitPanel = usePanelsStore((s) => s.splitPanel);
  const removePanel = usePanelsStore((s) => s.removePanel);
  const updateRatio = usePanelsStore((s) => s.updateRatio);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);

  const handleDrag = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current || !panel.children || !panel.ratio)
      return;

    const rect = containerRef.current.getBoundingClientRect();
    let newRatio = panel.ratio;

    if (panel.orientation === "vertical") {
      newRatio = (e.clientX - rect.left) / rect.width;
    } else {
      newRatio = (e.clientY - rect.top) / rect.height;
    }

    newRatio = Math.max(0.1, Math.min(0.9, newRatio));
    updateRatio(panel.id, newRatio);
    setHoverRatio(newRatio);
  };

  const stopDrag = () => {
    if (!panel.ratio) return;
    setDragging(false);

    const snapPoints = [0.25, 0.5, 0.75];
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - panel.ratio!) < Math.abs(prev - panel.ratio!)
        ? curr
        : prev
    );
    updateRatio(panel.id, closest);
    setHoverRatio(null);
  };

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const formatRatioLabel = (r: number) => {
    const snapMap: Record<number, string> = {
      0.25: "1/4th",
      0.5: "1/2th",
      0.75: "3/4th",
    };
    const closest = [0.25, 0.5, 0.75].find((p) => Math.abs(p - r) < 0.02);
    if (closest) return snapMap[closest];
    return `${(r * 100).toFixed(1)}%`;
  };

  if (panel.children && panel.orientation) {
    const ratio = panel.ratio ?? 0.5;

    const style1 =
      panel.orientation === "vertical"
        ? { width: `${ratio * 100}%` }
        : { height: `${ratio * 100}%` };

    const style2 =
      panel.orientation === "vertical"
        ? { width: `${(1 - ratio) * 100}%` }
        : { height: `${(1 - ratio) * 100}%` };

    const dividerClass =
      panel.orientation === "vertical"
        ? "absolute top-0 bottom-0 w-1 cursor-col-resize bg-black"
        : "absolute left-0 right-0 h-1 cursor-row-resize bg-black";

    const dividerPositionStyle =
      panel.orientation === "vertical"
        ? { left: `${ratio * 100}%`, transform: "translateX(-50%)" }
        : { top: `${ratio * 100}%`, transform: "translateY(-50%)" };

    return (
      <div
        ref={containerRef}
        className={`relative flex    ${
          panel.orientation === "vertical" ? "flex-row" : "flex-col"
        } w-full h-full `}
        onMouseMove={handleDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div style={style1} className="relative ">
          <PanelView panel={panel.children[0]} />
        </div>

        <div
          className={`${dividerClass} z-50`}
          style={dividerPositionStyle}
          onMouseDown={startDrag}
        >
          {dragging && hoverRatio !== null && (
            <div
              className={`absolute ${
                panel.orientation === "vertical"
                  ? "top-1/2 -translate-y-full left-1/2 -translate-x-1/2"
                  : "left-1/2 -translate-x-1/2 top-0 -translate-y-full"
              } bg-black text-white text-xs px-2 py-0.5 rounded shadow-md pointer-events-none`}
            >
              {formatRatioLabel(hoverRatio)}
            </div>
          )}
        </div>

        <div style={style2} className="relative ">
          <PanelView panel={panel.children[1]} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center w-full h-full"
      style={{ backgroundColor: panel.color }}
    >
      <div className=" flex space-x-1 text-xs">
        <SplitButton onClick={() => splitPanel(panel.id, "vertical")}>
          v
        </SplitButton>
        <SplitButton onClick={() => splitPanel(panel.id, "horizontal")}>
          h
        </SplitButton>
        <SplitButton onClick={() => removePanel(panel.id)}>-</SplitButton>
      </div>
    </div>
  );
};
