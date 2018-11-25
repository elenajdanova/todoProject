const time = {
  getDateTime: function(){
    let currentTime = new Date;
    let monthsEng = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    let currentMonth = monthsEng[currentTime.getMonth()];
    let eventTime = currentTime.getDate() +" "+ currentMonth + ", " + currentTime.getHours() +":"+ currentTime.getMinutes();
    return eventTime;
  }
};
export default time;
