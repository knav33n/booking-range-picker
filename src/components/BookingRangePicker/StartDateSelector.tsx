import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setNewAsOfDate } from "../../store/bookingSlice";
import getDatesForRange from "../../utils/getDatesForRange";

const StartDateSelector = () => {
    const { asOfDate, range } = useSelector((state: RootState) => state.booking)
    const dispatch = useDispatch();
    const [newStartDate, setNewStartDate] = useState(asOfDate);

    const handleChange = (date: Date) => {
        setNewStartDate(date.toISOString());
    }

    const handleClick = () => {
        if (range !== "custom") {
            const [updatedStartDate, updatedEndDate] = getDatesForRange(range, newStartDate);
            console.log(updatedStartDate, updatedEndDate)
            const newRangeInfo = {
                asOfDate,
                startDate: updatedStartDate,
                endDate: updatedEndDate,
            }
            dispatch(setNewAsOfDate(newRangeInfo));
        }
    }

    return (
        <div style={{ padding: "15px 5px 0" }}>
            <div>
                <label>As Of Date</label>
                <br />
                <DatePicker
                    selected={new Date(newStartDate)}
                    onChange={(date) => handleChange(date!)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    minDate={new Date()}
                />
            </div>
            <button onClick={handleClick} style={{ marginTop: 10 }}>Apply</button>
        </div>
    )
}
export default StartDateSelector