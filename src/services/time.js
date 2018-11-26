const time = {
  getDateTime: function(){
    let currentTime = new Date;
    let monthsEng = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    let currentMonth = monthsEng[currentTime.getMonth()];
    let currentHour = this.setZero( currentTime.getHours() );
    let currentMins = this.setZero( currentTime.getMinutes() );
    let eventTime = currentTime.getDate() +" "+ currentMonth + ", " + currentHour +":"+ currentMins;
    return eventTime;
  },
  setZero: function(time){
    if(time < 10){
      time = "0" + time;
    }
    return time;
  }
};
export default time;
