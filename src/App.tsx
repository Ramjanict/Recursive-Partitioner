import { PanelView } from "./components/Panel";
import { usePanelsStore } from "./store/usePanelsStore";

export default function App() {
  const { root } = usePanelsStore();

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="w-[99vw] h-[99vh] rounded-lg overflow-hidden">
        <PanelView panel={root} />
      </div>
    </div>
  );
}
