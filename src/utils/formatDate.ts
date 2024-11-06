import moment from 'moment';

const formatDate = (date: string, format: 1 | 2 = 1) => {
  if(format === 1) {
    return moment(date).format('ddd, MMM D, YYYY');
  } else {
    return moment(date).format('DD/MM/YYYY');
  }
}

export default formatDate;
