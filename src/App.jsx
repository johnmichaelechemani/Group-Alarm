import "./App.css";
import { useState, useEffect } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";
import { Select } from "./components/Select";

function App() {
  const people = [
    { id: 1, item: "Tom Cook" },
    { id: 2, item: "Wade Cooper" },
    { id: 3, item: "Tanya Fox" },
    { id: 4, item: "Arlene Mccoy" },
    { id: 5, item: "Devon Webb" },
  ];

  const addAlarm = (newAlarm) => {
    setAlarms([...alarms, newAlarm]);
  };

  // const addGroupAlarm = (
  //   alarm,

  // ) => {
  //   const newAlarmGroup = {
  //     id: generateId(),
  //     time: `${selectedHours}:${selectedMinutes}`,
  //     description: alarmLabel,
  //     label: type,
  //     enabled: false,
  //   };

  //   const updatedAlarms = alarms.map((a) => {
  //     if (a.id === alarm.id) {
  //       return {
  //         ...a,
  //         alarmsGroup: [...a.alarmsGroup, newAlarmGroup],
  //       };
  //     }
  //     return a;
  //   });
  //   console.log(alarm, alarmLabel, selectedHours, selectedMinutes, type);

  //   setAlarms(updatedAlarms);
  // };

  const [selected, setSelected] = useState(people[0]);
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      title: "First Alarm",
      description: "Day Shift",
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
      ],
    },
    {
      id: 2,
      title: "Second Alarm",
      description: "Night Shift",
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
            <div className="flex justify-between items-center ">
              <Select
                items={people}
                selectTitle="Select Ringtones "
                selected={selected}
                setSelected={setSelected}
              />

              <div className="text-end">
                <p className="text-xs text-gray-500 font-medium">
                  {" "}
                  Add Group Alarm
                </p>
                <MyModal
                  title="Add Group Alarm"
                  group={true}
                  addAlarm={addAlarm}
                  alarm={alarms}
                />
              </div>
            </div>
          </div>
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="border border-gray-500/20 p-2 rounded-lg my-2"
            >
              <div className="flex justify-between items-center pb-1">
                <div
                  className={`text-sm font-semibold ${
                    alarm.enabled ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <h1 className="capitalize">{alarm.title}</h1>
                  <div className="text-xs capitalize font-medium max-w-32 truncate">
                    {alarm.description}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <MySwitch
                    enabled={alarm.enabled}
                    setEnabled={() => toggleAllAlarm(alarm.id)}
                  />
                  <MyModal
                    title={`Add Alarm in  ${alarm.title}`}
                    alarm={alarm}
                    //  addAlarm={addGroupAlarm}
                  />
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
                      <div className="text-xs capitalize max-w-32 truncate">
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
