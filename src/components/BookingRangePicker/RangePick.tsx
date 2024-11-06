import moment from "moment";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { RangeOption, updateNewRange } from "../../store/bookingSlice";
import getDatesForRange from "../../utils/getDatesForRange";
import StartDateSelector from "./StartDateSelector";

const rangeOptions = [
    'current month',
    'next 30 days',
    'next 60 days',
    'next 90 days',
    'custom'
]

const RangePick = () => {
    const dispatch = useDispatch();
    const { asOfDate, range } = useSelector((state: RootState) => state.booking);
    const [startDate, setStartDate] = useState<string>(moment().toISOString());
    const [endDate, setEndDate] = useState<string>(moment().toISOString());
    const [selectedRangeOption, setSelectedRangeOption] = useState<RangeOption>(range);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [customNumberOfDays, setCustomNumberOfDays] = useState<number | null>(null);
    const today = new Date();

    const calculateRange = (d1: string, d2: string) => {
        const daysBetween = moment(d2).diff(moment(d1), 'days');
        if (daysBetween > 1) {
            setCustomNumberOfDays(daysBetween)
        } else {
            setCustomNumberOfDays(null)
        }
    }

    const handleStartDate = (date: Date) => {
        setShowDatePicker(true);
        setStartDate(date.toISOString());
        calculateRange(date.toISOString(), endDate)
    }

    const handleEndDate = (date: Date) => {
        setShowDatePicker(true);
        setEndDate(date.toISOString());
        calculateRange(startDate, date.toISOString())
    }

    const onChange = (dates: any) => {
        const [firstItem, _] = dates;
        // setStartDate(firstItem);
        // setEndDate(moment(firstItem).add(7, 'days').toDate())
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRangeOption(e.target.value as RangeOption);
    }

    const applyNewRange = () => {
        if (selectedRangeOption === "custom") {
            const [newStartDate, newEndDate] = getDatesForRange(selectedRangeOption, startDate, customNumberOfDays!);
            const newRangeInfo = {
                startDate: newStartDate,
                endDate: newEndDate,
                range: selectedRangeOption,
                customNumberOfDays: customNumberOfDays!
            }
            dispatch(updateNewRange(newRangeInfo))
        } else {
            const [newStartDate, newEndDate] = getDatesForRange(selectedRangeOption, asOfDate);
            const newRangeInfo = {
                startDate: newStartDate,
                endDate: newEndDate,
                range: selectedRangeOption
            }
            dispatch(updateNewRange(newRangeInfo))
        }
    }

    return (
        <>
            <div style={{ margin: "0 0 15px" }}>
                <div>
                    {rangeOptions.map((option) => (
                        <label key={option} style={{ textTransform: 'capitalize', display: 'block' }}>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedRangeOption === option}
                                onChange={handleRangeChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                {selectedRangeOption === "custom" && startDate && endDate && <div style={{ margin: "10px 0" }}>
                    <DatePicker
                        selected={new Date(startDate)}
                        onChange={(date) => handleStartDate(date!)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        minDate={new Date()}
                    />
                    <DatePicker
                        selected={new Date(endDate)}
                        onChange={(date) => handleEndDate(date!)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        minDate={new Date(startDate)}
                    />
                </div>}
                {showDatePicker && <DatePicker
                    minDate={today}
                    selected={new Date(startDate!)}
                    startDate={new Date(startDate!)}
                    endDate={new Date(endDate!)}
                    inline
                    onChange={onChange}
                />}
                <br />
                <button style={{ marginTop: "10px" }} onClick={applyNewRange}>Apply</button>
            </div>
            <div style={{
                borderTop: "1px solid gray"
            }}>
                <StartDateSelector />
            </div>
        </>
    )
}
export default RangePick