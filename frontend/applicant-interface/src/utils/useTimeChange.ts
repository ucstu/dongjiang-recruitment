const isYestday = (timeValue: string) => {
  // 是否为昨天
  const date = new Date(timeValue);
  const today = new Date();
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  ) {
    if (date.getDate() - today.getDate() === 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const isYear = (timeValue: string) => {
  // 是否为今年
  const dateyear = new Date(timeValue).getFullYear();
  const toyear = new Date().getFullYear();
  if (dateyear === toyear) {
    return true;
  } else {
    return false;
  }
};
const formatTime = (date: string) => {
  const t = getTimeArray(date);
  return (
    [t[0], t[1], t[2]].map(formatNumber).join("-") +
    " " +
    [t[3], t[4], t[5]].map(formatNumber).join(":")
  );
};

const getTimeArray = (_date: string) => {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day, hour, minute, second].map(formatNumber);
};

// 转化日期 如2018-7-6 -->(2018-07-06)
const formatNumber = (_n: string | number) => {
  const n = _n.toString();
  return n[1] ? n : "0" + n;
};
const usetimeChange = (_timeValue: string) => {
  const timeValue = new Date(_timeValue).getTime();
  const timeNew = new Date().getTime();
  const timeDiffer = timeNew - timeValue;
  let returnTime = "";
  if (timeDiffer <= 60000) {
    // 一分钟内
    returnTime = "刚刚";
  } else if (timeDiffer > 60000 && timeDiffer < 3600000) {
    // 1小时内
    returnTime = `${Math.floor(timeDiffer / 60000)}分钟前`;
  } else if (
    timeDiffer >= 3600000 &&
    timeDiffer < 86400000 &&
    isYestday(_timeValue) === false
  ) {
    // 今日
    returnTime = formatTime(_timeValue).substr(11, 5);
  } else if (timeDiffer > 3600000 && isYestday(_timeValue) === true) {
    // 昨天
    returnTime = "昨天" + formatTime(_timeValue).substr(11, 5);
  } else if (
    timeDiffer > 86400000 &&
    isYestday(_timeValue) === false &&
    isYear(_timeValue) === true
  ) {
    // 今年
    returnTime = formatTime(_timeValue).substr(5, 11);
  } else if (
    timeDiffer > 86400000 &&
    isYestday(_timeValue) === false &&
    isYear(_timeValue) === false
  ) {
    // 不属于今年
    returnTime = formatTime(_timeValue).substr(0, 16);
  }
  return returnTime;
};
export default usetimeChange;
