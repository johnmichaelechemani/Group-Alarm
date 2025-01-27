import "./App.css";
import { useState, useEffect } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";
import { SelectRingTone } from "./components/Select";

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
          time: "12:10",
          description: "lunch",
          label: "AM",
          enabled: false,
        },
        {
          id: 3,
          time: "01:10",
          description: "lunch",
          label: "AM",
          enabled: false,
        },
        {
          id: 4,
          time: "02:10",
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
          description: "Shower",
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
      <div className="flex justify-center items-start text-gray-300 my-5">
        <div className="sm:border border-gray-500/20 sm:p-5 p-1 rounded-lg min-w-full sm:min-w-96">
          <div>
            {" "}
            <h1 className="text-xl text-gray-300 font-semibold">Group Alarm</h1>
            <div className="flex justify-between items-center">
              <SelectRingTone />

              <div className="text-end">
                <p className="text-xs text-gray-500 font-medium">
                  {" "}
                  Add Group Alarm
                </p>
                <MyModal />
              </div>
            </div>
          </div>
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="border border-gray-500/20 p-2 rounded-lg my-2"
            >
              <div className="flex justify-between items-center pb-1">
                <h1
                  className={`text-sm font-semibold ${
                    alarm.enabled ? "text-gray-300" : "text-gray-500"
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
              <div className=" max-h-52 overflow-y-auto pr-1">
                {alarm.alarmsGroup.map((alarmGroup, index) => (
                  <div
                    key={index}
                    className={`my-2 py-2 px-2 rounded-lg text-xl border flex justify-between items-center ${
                      alarmGroup.enabled
                        ? "text-gray-300 border-gray-500/50 bg-blue-600/5"
                        : "text-gray-700 border-gray-500/10 bg-gray-800/20"
                    }`}
                  >
                    <div>
                      <div className="font-semibold">
                        {" "}
                        {alarmGroup.time}{" "}
                        <span className="text-xs">{alarmGroup.label} </span>
                      </div>
                      <div className="text-xs capitalize">
                        {alarmGroup.description}
                      </div>
                    </div>
                    <MySwitch
                      enabled={alarmGroup.enabled}
                      setEnabled={() => toggleAlarm(alarm.id, alarmGroup.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
