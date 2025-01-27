import "./App.css";
import { useState, useEffect } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";

function App() {
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      title: "First Alarm",
      enabled: false,
      alarmsGroup: [
        {
          id: 1,
          time: "04:50",
          description: "wake up",
          label: "PM",
          enabled: false,
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

  const toggleAlarm = (id, groupId) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) =>
        alarm.id === id
          ? {
              ...alarm,
              alarmsGroup: alarm.alarmsGroup.map((alarmGroup) =>
                alarmGroup.id === groupId
                  ? { ...alarmGroup, enabled: !alarmGroup.enabled }
                  : alarmGroup
              ),
            }
          : alarm
      )
    );
  };
  const toggleAllAlarm = (id) => {
    setAlarms((prevAlarms) => {
      const newAlarms = prevAlarms.map((alarm) => {
        if (alarm.id === id) {
          const newEnabled = !alarm.enabled;
          return {
            ...alarm,
            enabled: newEnabled,
            alarmsGroup: alarm.alarmsGroup.map((group) => ({
              ...group,
              enabled: newEnabled,
            })),
          };
        }
        return alarm;
      });
      console.table(newAlarms);
      return newAlarms;
    });
  };

  useEffect(() => {}, [alarms]);

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
                <h1
                  className={`text-sm font-semibold ${
                    alarm.enabled ? "text-white" : "text-gray-500"
                  }`}
                >
                  {alarm.title}
                </h1>
                <div className="flex justify-center items-center gap-2">
                  <MySwitch
                    enabled={alarm.enabled}
                    setEnabled={() => toggleAllAlarm(alarm.id)}
                  />
                  <MyModal />
                </div>
              </div>
              {alarm.alarmsGroup.map((alarmGroup, index) => (
                <div
                  key={index}
                  className={`my-2 py-2 px-2  rounded-lg text-xl border flex justify-between items-center ${
                    alarmGroup.enabled
                      ? "text-white border-gray-500/50 bg-blue-600/5"
                      : "text-gray-700 border-gray-500/10 bg-gray-800/20"
                  }`}
                >
                  <div>
                    {" "}
                    {alarmGroup.time}{" "}
                    <span className="text-xs">{alarmGroup.label} </span>
                  </div>
                  <MySwitch
                    enabled={alarmGroup.enabled}
                    setEnabled={() => toggleAlarm(alarm.id, alarmGroup.id)}
                  />
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
