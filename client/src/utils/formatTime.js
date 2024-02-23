const formatTime = (time) => {
  if (time >= 3600000) {
    return new Date(time).toISOString().slice(11, 19);
  }
  return new Date(time).toISOString().slice(14, 19);
};

export default formatTime;
