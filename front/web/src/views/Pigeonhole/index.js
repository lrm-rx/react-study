import { memo } from "react";
import { Timeline } from "antd";
import { PigeonholeWraper } from "./style";
import pigeonholeBgImg from "@/assets/images/bg2.jpg";

const Pigeonhole = memo(() => {
  return (
    <PigeonholeWraper pigeonholeBg={pigeonholeBgImg}>
      <div className="pigeonhole-time-line">
        <Timeline
          mode="alternate"
          items={[
            {
              label: "2015-09-01",
              children: "Create a services",
            },
            {
              label: "2015-09-01 09:12:11",
              children: "Solve initial network problems",
            },
            {
              children: "Technical testing",
            },
            {
              label: "2015-09-01 09:12:11",
              children: "Network problems being solved",
            },
          ]}
        />
      </div>
    </PigeonholeWraper>
  );
});

export default Pigeonhole;
