import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

export const Notification = ({ data, onClear }) => {
  Notification.propTypes = {
    data: PropTypes.shape({
      groupId: PropTypes.string.isRequired,
      alarm: PropTypes.shape({
        id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        label: PropTypes.string,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
    onClear: PropTypes.func.isRequired,
  };

  return (
    <div className="border border-blue-500/20 shadow-md shadow-blue-500/20 mb-2 bg-blue-500/10 p-2 rounded-lg flex justify-between items-center gap-1">
      <div className="flex items-start gap-1">
        <div>
          <Icon icon="mdi-light:clock" width="24" height="24" />
        </div>
        <div>
          <p className="text-sm font-medium">
            Upcoming alarm: {data.alarm.time} {data.alarm.label || ""}
          </p>
          <p className="text-xs text-gray-500">
            {data.alarm.description || "No description"}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={() => onClear(data.groupId, data.alarm.id)}
          className="text-xs font-semibold text-gray-400 shadow border border-gray-500/20 px-2 py-1 rounded-full"
        >
          Turn off
        </button>
      </div>
    </div>
  );
};
