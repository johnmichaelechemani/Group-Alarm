import { Icon } from "@iconify/react";

export const Notification = () => {
  return (
    <>
      <div className="border border-blue-500/20 bg-blue-500/10 p-2 rounded-lg flex justify-between items-center gap-1 ">
        <div className="flex items-start gap-1">
          <div>
            <Icon icon="mdi-light:clock" width="24" height="24" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Upcoming alarm: <span>10:03 AM</span>
            </p>{" "}
            <p className="text-xs text-gray-500"> Second Alarm</p>
          </div>
        </div>
        <div>
          <button className="text-xs font-semibold text-gray-400 shadow border border-gray-500/20 px-2 py-1 rounded-full">
            Turn off
          </button>
        </div>
      </div>
    </>
  );
};
