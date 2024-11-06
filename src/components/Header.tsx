import BookingRangePicker from "./BookingRangePicker/BookingRangePicker"
import MonthsPick from "./BookingRangePicker/MonthsPick"
import WeeksPick from "./BookingRangePicker/WeeksPick"
import RangePick from "./BookingRangePicker/RangePick"
import { useState } from "react"

const Header = () => {
  const [selectedTab, setSelectedTab] = useState<'tab 1' | 'tab 2' | 'tab 3'>('tab 1');
  return (
    <>
      <header>
        <BookingRangePicker />
      </header>
      <div
        style={{
          display: "inline-block",
          padding: "15px 10px",
          margin: "15px 0",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "4px"
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <button onClick={() => setSelectedTab('tab 1')}>Range</button>
          <button onClick={() => setSelectedTab('tab 2')}>Weeks</button>
          <button onClick={() => setSelectedTab('tab 3')}>Months</button>
        </div>

        {selectedTab === "tab 1" && <RangePick />}
        {selectedTab === "tab 2" && <WeeksPick />}
        {selectedTab === "tab 3" && <MonthsPick />}
      </div>
    </>
  )
}
export default Header