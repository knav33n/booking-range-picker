import DatePicker from "react-datepicker"
import StartDateSelector from "./StartDateSelector"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import moment from "moment";

const WeeksPick = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const today = new Date();

  const onChange = (dates: any) => {
    const [firstItem, _] = dates;
    setStartDate(firstItem);
    setEndDate(moment(firstItem).add(7, 'days').toDate())
  };

  return (
    <>
      <div style={{ margin: "0 0 15px" }}>
        <DatePicker
          minDate={today}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange inline
          onChange={onChange}
        />
        <br />
        <button style={{ marginTop: "10px" }}>Apply</button>
      </div>
      <div style={{
        borderTop: "1px solid gray"
      }}>
        <StartDateSelector />
      </div>
    </>
  )
}
export default WeeksPick