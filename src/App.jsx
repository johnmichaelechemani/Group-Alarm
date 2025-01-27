import "./App.css";
import { useState } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";

function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center h-screen text-white">
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
            <div>
              <div
                className={`my-2 py-2 px-2  rounded-lg text-xl border  bg-gray-800/20 flex justify-between items-center ${
                  enabled
                    ? "text-white border-gray-500/50"
                    : "text-gray-700 border-gray-500/10"
                }`}
              >
                <div>
                  {" "}
                  04:50 <span className="text-xs">PM </span>
                </div>
                <MySwitch enabled={enabled} setEnabled={setEnabled} />
              </div>
              <div className="my-2 py-2 px-2 rounded-lg text-xl border border-gray-500/10 bg-gray-800/20 flex justify-between items-center">
                <div>
                  {" "}
                  11:10 <span className="text-xs">AM</span>
                </div>
                <MySwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
