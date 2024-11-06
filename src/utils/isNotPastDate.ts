import moment from "moment";

function isNotPastDate(date: string) {
  const today = moment().startOf("day");
  const givenDate = moment(date).startOf("day");

  return givenDate.isSameOrAfter(today);
}

export default isNotPastDate;