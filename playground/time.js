// Jan 1st 1970 00:00:00

var moment = require('moment');


var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
var date = moment();
console.log(date.format('MMM Do, YYYY'));
