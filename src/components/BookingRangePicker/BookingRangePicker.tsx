import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setNewAsOfDate } from "../../store/bookingSlice";
import formatDate from "../../utils/formatDate";
import getNextPrevDates from "../../utils/getNextPrevDates";

const BookingRangePicker = () => {
    const dispatch = useDispatch();
    const { asOfDate, startDate, endDate, range, customRange } = useSelector((state: RootState) => state.booking);
    const value = `${formatDate(startDate)} - ${formatDate(endDate)}`;

    const handlePrev = () => {
        const dates = { asOfDate, startDate, endDate }
        const [newAsOfDate, newStartDate, newEndDate] = getNextPrevDates(range, dates, "prev", customRange);
        dispatch(setNewAsOfDate({ asOfDate: newAsOfDate, startDate: newStartDate, endDate: newEndDate }));
    }

    const handleNext = () => {
        const dates = { asOfDate, startDate, endDate }
        const [newAsOfDate, newStartDate, newEndDate] = getNextPrevDates(range, dates, "next", customRange);
        dispatch(setNewAsOfDate({ asOfDate: newAsOfDate, startDate: newStartDate, endDate: newEndDate }));

    }

    return (
        <div style={{
            display: "inline-flex",
            flexDirection: "column",
        }}>
            <div
                style={{
                    textTransform: 'uppercase',
                    color: 'gray',
                    fontSize: 14
                }}>
                Stay Dates - As of <span style={{ color: "#000", fontWeight: "bold" }}>{formatDate(asOfDate)}</span>
            </div>
            <div>
                <button onClick={handlePrev}>prev</button>
                <input value={value} readOnly
                    style={{ width: 250, textAlign: 'center' }}
                />
                <button onClick={handleNext}>next</button>
            </div>
        </div>
    )
}
export default BookingRangePicker