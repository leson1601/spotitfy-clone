
function padTo2Digits(num:number) {
  return num.toString().padStart(2, '0');
}

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.round((millis % 60000) / 1000);
  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
};
export {
  millisToMinutesAndSeconds
}