import DatePicker from "react-datepicker"
import StartDateSelector from "./StartDateSelector"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import moment from "moment";

const MonthsPick = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const today = new Date();

  const onChange = (date: any) => {
    setStartDate(date);
    setEndDate(moment(date).endOf('month').toDate());
  };

  return (
    <>
      <div style={{ margin: "0 0 15px" }}>
        <DatePicker
          minDate={today}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          showMonthYearPicker
          inline
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
export default MonthsPick