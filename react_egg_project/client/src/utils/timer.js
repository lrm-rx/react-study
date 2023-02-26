import dayjs from "dayjs";

export default function timer(time, type = "") {
  return dayjs(time).format(type === "all" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD");
}
