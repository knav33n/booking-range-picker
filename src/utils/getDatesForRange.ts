import moment from "moment";
import { RangeOption } from "../store/bookingSlice";

const getDatesForRange = (
  range: RangeOption,
  startDate: string,
  customNumberOfDays?: number
) => {
  switch (range) {
    case "next 30 days":
      return [startDate, moment(startDate).add(30, "days").toISOString()];
    case "next 60 days":
      return [startDate, moment(startDate).add(60, "days").toISOString()];
    case "next 90 days":
      return [startDate, moment(startDate).add(90, "days").toISOString()];
    case "custom":
      return [
        startDate,
        moment(startDate).add(customNumberOfDays, "days").toISOString(),
      ];
    case "week":
      return [startDate, moment(startDate).add(7, "days").toISOString()];
    case "current month":
    case "month":
      return [
        moment(startDate).startOf("month").toISOString(),
        moment(startDate).endOf("month").toISOString(),
      ];
  }
};

export default getDatesForRange;
