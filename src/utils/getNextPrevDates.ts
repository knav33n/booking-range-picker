import moment from "moment";
import { RangeOption } from "../store/bookingSlice";
import getDatesForRange from "./getDatesForRange";
import isNotPastDate from "./isNotPastDate";

const getNextPrevDates = (
  range: RangeOption,
  dates: { asOfDate: string; startDate: string; endDate: string },
  typeOfOperation: "prev" | "next",
  customRange?: number | null
) => {
  let newAsOfDate = dates.asOfDate;

  if (typeOfOperation === "next") {
    newAsOfDate = moment(dates.endDate).add(1, "day").toISOString();
    console.log(customRange);
    const [newStartDate, newEndDate] = getDatesForRange(
      range,
      newAsOfDate,
      customRange!
    );
    return [newAsOfDate, newStartDate, newEndDate];
  } else {
    switch (range) {
      case "current month":
        newAsOfDate = moment(dates.asOfDate).subtract(1, "month").toISOString();
        break;
      case "next 30 days":
        newAsOfDate = moment(dates.startDate)
          .subtract(31, "days")
          .toISOString();
        break;
      case "next 60 days":
        newAsOfDate = moment(dates.startDate)
          .subtract(61, "days")
          .toISOString();
        break;
      case "next 90 days":
        newAsOfDate = moment(dates.startDate)
          .subtract(91, "days")
          .toISOString();
        break;
      case "custom":
        newAsOfDate = moment(dates.startDate)
          .subtract(customRange! + 1, "days")
          .toISOString();
        break;
      case "week":
        newAsOfDate = moment(dates.startDate)
          .subtract(7 + 1, "days")
          .toISOString();
        break;
      case "month":
        newAsOfDate = moment(dates.startDate)
          .subtract(1, "month")
          .toISOString();
        break;
    }
    if (isNotPastDate(newAsOfDate)) {
      const [newStartDate, newEndDate] = getDatesForRange(
        range,
        newAsOfDate,
        customRange!
      );
      return [newAsOfDate, newStartDate, newEndDate];
    }
  }

  return [dates.asOfDate, dates.startDate, dates.endDate];
};

export default getNextPrevDates;
