import "./App.css";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="border border-gray-500/20 p-5 rounded-sm min-w-full sm:min-w-96">
          <h1 className="text-xl text-white font-semibold">Group Alarm</h1>
          <div className="border border-gray-500/20 p-2 rounded-sm my-2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl text-white font-semibold">Alarm 1</h1>
              <div className="flex justify-center items-center gap-2">
                <MySwitch />
                <MyModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
