import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

export const Notification = ({ data }) => {
  Notification.propTypes = {
    data: PropTypes.object.isRequired,
  };

  return (
    <>
      <div
        key={data.id}
        className="border border-blue-500/20 shadow-md shadow-blue-500/20 mb-2 bg-blue-500/10 p-2 rounded-lg flex justify-between items-center gap-1 "
      >
        <div className="flex items-start gap-1">
          <div>
            <Icon icon="mdi-light:clock" width="24" height="24" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Upcoming alarm: {data.data.alarmsGroup[0].time}{" "}
              {data.data.alarmsGroup[0].label}
            </p>
            <p className="text-xs text-gray-500">{data.data.title}</p>
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
