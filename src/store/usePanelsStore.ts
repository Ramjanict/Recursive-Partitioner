import { create } from "zustand";
export type Orientation = "vertical" | "horizontal";
export interface Panel {
  id: string;
  color: string;
  children?: Panel[];
  orientation?: Orientation;
  ratio?: number;
}

interface PanelsState {
  root: Panel;
  splitPanel: (id: string, orientation: Orientation) => void;
  removePanel: (id: string) => void;
  updateRatio: (id: string, ratio: number) => void;
}

const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;

export const usePanelsStore = create<PanelsState>((set) => ({
  root: { id: crypto.randomUUID(), color: randomColor() },

  splitPanel: (id, orientation) =>
    set((state) => {
      const update = (panel: Panel): Panel => {
        if (panel.id === id) {
          return {
            ...panel,
            orientation,
            ratio: 0.5,
            children: [
              { id: crypto.randomUUID(), color: panel.color },
              { id: crypto.randomUUID(), color: randomColor() },
            ],
          };
        }
        if (panel.children)
          return { ...panel, children: panel.children.map(update) };
        return panel;
      };
      return { root: update(state.root) };
    }),

  removePanel: (id) =>
    set((state) => {
      const remove = (panel: Panel): Panel | null => {
        if (!panel.children) return panel.id === id ? null : panel;
        const newChildren = panel.children
          .map(remove)
          .filter((c): c is Panel => c !== null);
        if (newChildren.length === 1) return newChildren[0];
        return { ...panel, children: newChildren };
      };
      return { root: remove(state.root)! };
    }),

  updateRatio: (id, ratio) =>
    set((state) => {
      const update = (panel: Panel): Panel => {
        if (panel.id === id) return { ...panel, ratio };
        if (panel.children)
          return { ...panel, children: panel.children.map(update) };
        return panel;
      };
      return { root: update(state.root) };
    }),
}));
