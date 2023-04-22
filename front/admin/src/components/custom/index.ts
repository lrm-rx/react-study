import { App } from "vue";
import SelectIcom from "./selectIcon";
import SelectArea from "./selectArea";
import SelectAreaFour from "./selectAreaFour";
import Rmform from "./form";
import ModelForm from "./modelForm";
import SelectCity from "./selectCity";
import RmTrend from "./trend";
import RmNotification from "./notification";
import RmList from "./list";
import RmProgress from "./progress";
import SelectTime from "./selectTime";
import ProTable from "./table";

const components = [
  SelectIcom,
  SelectArea,
  SelectAreaFour,
  Rmform,
  ModelForm,
  RmNotification,
  RmList,
  SelectCity,
  RmTrend,
  RmProgress,
  SelectTime,
  ProTable,
];

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item);
    });
  },
};
