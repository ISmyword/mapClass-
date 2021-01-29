const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function  rad (d) {
  return d * Math.PI / 180.0;
}
function  getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = this.rad(lat1);
  var radLat2 = this.rad(lat2);
  var a = radLat1 - radLat2;
  var b = this.rad(lng1) - this.rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里

  var distance = s;
  var distance_str = "";

  if (parseInt(distance) >= 1) {
    distance_str = distance.toFixed(1) + "km";
  } else {
    distance_str = distance * 1000 + "m";
  }
  //s=s.toFixed(4);
  return s;
}
//排序计算
function compare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}
module.exports = {
  formatTime: formatTime,
  rad: rad,
  getDistance : getDistance,
  compare: compare
}
