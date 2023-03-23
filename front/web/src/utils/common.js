import solarLunar from "solarlunar-es";

// 农历日期对应节日转化
export const getlunarDayCn = (year_, month_, day_) => {
  let lunar = solarLunar.solar2lunar(year_, month_ + 1, day_);
  // console.log(lunar);
  let JudgeLunar = solarLunar.solar2lunar(year_, month_ + 1, day_ + 1);
  let { isTerm, term, monthCn, dayCn, cMonth, cDay, ncWeek } = lunar;
  let showDay = isTerm ? term : dayCn;
  if (showDay === "初一") {
    showDay = monthCn;
  }
  // 判断是否有腊月三十
  if (JudgeLunar.monthCn === "正月" && JudgeLunar.dayCn === "初一")
    return "除夕";
  // 节日
  const lunarFestivalMap = {
    正月_初一: "春节",
    正月_十五: "元宵节",
    五月_初五: "端午节",
    七月_初七: "七夕节",
    八月_十五: "中秋节",
    九月_初九: "重阳节",
  };
  const solarFestivalMap = {
    1.1: "元旦",
    3.8: "妇女节",
    5.1: "劳动节",
    5.4: "青年节",
    6.1: "儿童节",
    7.1: "建党节",
    8.1: "建军节",
    "9.10": "教师节",
    10.1: "国庆节",
    12.25: "圣诞节",
  };
  const lunarFestival = lunarFestivalMap[`${monthCn}_${dayCn}`];
  const solarFestival = solarFestivalMap[`${cMonth}.${cDay}`];
  // 父亲节母亲节
  if (cMonth === 5 && cDay > 7 && cDay < 15 && ncWeek === "星期日")
    return "母亲节";
  if (cMonth === 6 && cDay > 14 && cDay < 22 && ncWeek === "星期日")
    return "父亲节";
  return lunarFestival
    ? lunarFestival
    : solarFestival
    ? solarFestival
    : showDay;
};
