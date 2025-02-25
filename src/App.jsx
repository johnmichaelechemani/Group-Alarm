import "./App.css";
import { useState, useEffect, useRef } from "react";
import { MyModal } from "./components/Modal";
import { MySwitch } from "./components/Switch";
import { Select } from "./components/Select";
import { GroupAlarm } from "./components/GroupAlarm";
import { Notification } from "./components/Notification";

import ringtone from "./assets/Burnout.mp3";

function App() {
  const ringtones = [
    { id: 1, item: "Luffy" },
    { id: 2, item: "Wave" },
    { id: 3, item: "Rain" },
  ];

  const [selected, setSelected] = useState(ringtones[0]);
  const [notification, setNotification] = useState(null);
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      title: "First Alarm",
      description: "Day Shift",
      enabled: false,
      alarmsGroup: [
        {
          id: 1,
          time: "01:50",
          description: "wake up",
          label: "PM",
          enabled: false,
        },
        {
          id: 2,
          time: "01:51",
          description: "lunch",
          label: "PM",
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
          time: "03:51",
          description: "Sleep",
          label: "PM",
          enabled: false,
        },
      ],
    },
  ]);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Use refs to access the latest state in the interval
  const alarmsRef = useRef(alarms);
  const selectedRef = useRef(selected);

  // Update refs when state changes
  useEffect(() => {
    alarmsRef.current = alarms;
    selectedRef.current = selected;
  }, [alarms, selected]);

  // Function to convert 12-hour time with AM/PM to minutes since midnight
  const timeToMinutes = (time, label) => {
    let [hours, minutes] = time.split(":").map(Number);
    if (label === "PM" && hours !== 12) {
      hours += 12;
    } else if (label === "AM" && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  };

  // Function to play the selected ringtone
  const playRingtone = (ringtoneName) => {
    const audio = new Audio(`/ringtones/${ringtoneName}.mp3`);
    audio.play();
  };

  // Set up an interval to check for alarm triggers
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentTotalMinutes = currentHours * 60 + currentMinutes;

      const dueAlarms = [];
      alarmsRef.current.forEach((alarm) => {
        if (alarm.enabled) {
          alarm.alarmsGroup.forEach((alarmGroup) => {
            if (alarmGroup.enabled) {
              const alarmTotalMinutes = timeToMinutes(
                alarmGroup.time,
                alarmGroup.label
              );
              // Trigger if the minute matches and within the first 2 seconds
              if (
                currentTotalMinutes === alarmTotalMinutes &&
                currentSeconds < 2
              ) {
                dueAlarms.push(alarmGroup);
              }
            }
          });
        }
      });

      // Play the ringtone once if there are any due alarms
      if (dueAlarms.length > 0) {
        playRingtone(selectedRef.current.item);
      }
    }, 1000); // Check every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const addAlarm = (newAlarm) => {
    setAlarms([...alarms, newAlarm]);
  };

  const addGroupAlarm = (alarm) => {
    setAlarms([...alarm]);
  };

  const toggleAllAlarm = (id) => {
    setAlarms((prevAlarms) => {
      const newAlarms = prevAlarms.map((alarm) => {
        if (alarm.id === id) {
          const newEnabled = !alarm.enabled;
          setNotification(null); // Clear notification
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
      return newAlarms;
    });
  };

  const toggleAlarm = (id, groupId) => {
    setAlarms((prevAlarms) => {
      const newAlarms = prevAlarms.map((alarm) => {
        if (alarm.id === id) {
          const updatedAlarmsGroup = alarm.alarmsGroup.map((ag) => {
            if (ag.id === groupId) {
              setNotification({
                groupId: alarm.id,
                alarm: ag,
              });
              const newEnabled = !ag.enabled; // Calculate the new enabled state
              if (
                !newEnabled &&
                notification?.groupId === id &&
                notification?.alarm.id === ag.id
              ) {
                // Alarm is being toggled off and matches the current notification
                if (currentAudio) {
                  currentAudio.pause(); // Stop the music
                  setCurrentAudio(null); // Clear the audio state
                }
                setNotification(null); // Clear the notification
              }
              return { ...ag, enabled: newEnabled }; // Return updated alarm
            }
            return ag; // Return unchanged alarm
          });
          const anyEnabled = updatedAlarmsGroup.some((ag) => ag.enabled);
          return {
            ...alarm,
            enabled: anyEnabled, // Enable group if any alarm is enabled
            alarmsGroup: updatedAlarmsGroup,
          };
        }
        return alarm; // Return unchanged alarm group
      });
      return newAlarms; // Return updated alarms array
    });
  };

  const disableAlarm = (groupId, alarmId) => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setAlarms((prevAlarms) => {
      const newAlarms = prevAlarms.map((alarm) => {
        if (alarm.id === groupId) {
          return {
            ...alarm,
            alarmsGroup: alarm.alarmsGroup.map((alarmGroup) => {
              if (alarmGroup.id === alarmId) {
                return { ...alarmGroup, enabled: false };
              }
              return alarmGroup;
            }),
          };
        }
        return alarm;
      });
      return newAlarms;
    });
    setNotification(null);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentTotalMinutes = currentHours * 60 + currentMinutes;

      alarms.forEach((alarm) => {
        if (alarm.enabled) {
          alarm.alarmsGroup.forEach((alarmGroup) => {
            if (alarmGroup.enabled) {
              const [hours, minutes] = alarmGroup.time.split(":").map(Number);
              let alarmHours = hours;
              if (alarmGroup.label === "PM" && alarmHours !== 12) {
                alarmHours += 12;
              } else if (alarmGroup.label === "AM" && alarmHours === 12) {
                alarmHours = 0;
              }
              const alarmTotalMinutes = alarmHours * 60 + minutes;

              if (
                currentTotalMinutes === alarmTotalMinutes &&
                currentSeconds < 2
              ) {
                if (!currentAudio) {
                  const audio = new Audio(ringtone);
                  audio.play();
                  setCurrentAudio(audio);
                }
              }
            }
          });
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarms, currentAudio]);

  setInterval(() => {
    console.log("Interval running at", new Date().toLocaleTimeString());
    // Rest of the code
  }, 1000);

  return (
    <>
      <div className="flex justify-center items-start text-gray-300 my-5">
        <div className="sm:border border-gray-500/20 sm:p-5 p-1 rounded-lg min-w-full sm:min-w-96">
          <div>
            {notification && (
              <Notification data={notification} onClear={disableAlarm} />
            )}
            <h1 className="text-xl text-gray-300 font-semibold">Group Alarm</h1>
            <div className="flex justify-between items-center">
              <Select
                items={ringtones}
                selectTitle="Select Ringtones"
                selected={selected}
                setSelected={setSelected}
              />
              <div className="text-end min-w-32">
                <p className="text-xs text-gray-500 font-medium">
                  Add group alarm
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
                  <GroupAlarm
                    title={`Add Alarm in ${alarm.title}`}
                    alarm={alarms}
                    groupId={alarm.id}
                    addAlarm={addGroupAlarm}
                  />
                </div>
              </div>
              <div className="max-h-52 overflow-y-auto pr-1">
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
                        {alarmGroup.time}{" "}
                        <span className="text-xs">{alarmGroup.label}</span>
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
