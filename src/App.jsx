import "./App.css";
import { useState } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";

function App() {
  const [enabled, setEnabled] = useState(false);
  const [alarms, setAlarms] = useState([
    {
      title: "Alarm 1",
      enabled: true,
      alarmsGroup: [
        {
          time: "04:50 PM",
          description: "wake up",
          label: "PM",
          enabled: true,
        },
        {
          time: "11:10 AM",
          description: "lunch",
          label: "AM",
          enabled: false,
        },
      ],
    },
    {
      title: "Alarm 2",
      enabled: false,
    },
  ]);

  return (
    <>
      <div className="flex justify-center items-center h-screen text-white">
        <div className="border border-gray-500/20 sm:p-5 p-1 rounded-sm min-w-full sm:min-w-96">
          <h1 className="text-xl text-white font-semibold">Group Alarm</h1>
          <div className="border border-gray-500/20 p-2 rounded-sm my-2">
            <div className="flex justify-between items-center">
              <h1 className="text-sm text-white font-semibold">Alarm 1</h1>
              <div className="flex justify-center items-center gap-2">
                <MySwitch />
                <MyModal />
              </div>
            </div>
            <div>
              <div
                className={`my-2 py-2 px-2  rounded-lg text-xl border   flex justify-between items-center ${
                  enabled
                    ? "text-white border-gray-500/50 bg-blue-600/10"
                    : "text-gray-700 border-gray-500/10 bg-gray-800/20"
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
