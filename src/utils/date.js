import dayjs from "dayjs";
export function formatDate(time) {
 return dayjs(
    dayjs(time.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")).valueOf() +
    28800000
  ).format("YYYY-MM-DD HH:mm:ss");
}