function getLocalTime(){
const timestamp = new Date().toLocaleString()+'';
return timestamp;
}

export {getLocalTime};