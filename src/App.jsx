import "./App.css";
import { useState } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";

function App() {
  const [enabled, setEnabled] = useState(false);
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      title: "First Alarm",
      enabled: true,
      alarmsGroup: [
        {
          id: 1,
          time: "04:50",
          description: "wake up",
          label: "PM",
          enabled: true,
        },
        {
          id: 2,
          time: "11:10",
          description: "lunch",
          label: "AM",
          enabled: false,
        },
      ],
    },
    {
      id: 2,
      title: "Second Alarm",
      enabled: false,
      alarmsGroup: [
        {
          id: 1,
          time: "03:50",
          description: "wake up",
          label: "PM",
          enabled: false,
        },
        {
          id: 2,
          time: "08:10",
          description: "Sleep",
          label: "PM",
          enabled: false,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="flex justify-center items-center h-screen text-white">
        <div className="border border-gray-500/20 sm:p-5 p-1 rounded-sm min-w-full sm:min-w-96">
          <h1 className="text-xl text-white font-semibold">Group Alarm</h1>
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="border border-gray-500/20 p-2 rounded-sm my-2"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-sm text-white font-semibold">
                  {alarm.title}
                </h1>
                <div className="flex justify-center items-center gap-2">
                  <MySwitch />
                  <MyModal />
                </div>
              </div>
              {alarm.alarmsGroup.map((alarmGroup, index) => (
                <div
                  key={index}
                  className={`my-2 py-2 px-2  rounded-lg text-xl border flex justify-between items-center ${
                    enabled
                      ? "text-white border-gray-500/50 bg-blue-600/10"
                      : "text-gray-700 border-gray-500/10 bg-gray-800/20"
                  }`}
                >
                  <div>
                    {" "}
                    {alarmGroup.time}{" "}
                    <span className="text-xs">{alarmGroup.label} </span>
                  </div>
                  <MySwitch enabled={enabled} setEnabled={setEnabled} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
