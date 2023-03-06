import React, { useState, useEffect, useCallback, memo } from "react";
import { Picker, List, DatePicker, Button, Toast, Cascader } from "antd-mobile";
import { history } from "umi";
import dayjs from "dayjs";
import { filterData } from "@/utils";

function Search(props) {
  // const [citys, setCitys] = useState([
  //   [
  //     { label: "杭州", value: "10001" },
  //     { label: "苏州", value: "10002" },
  //   ],
  // ]);
  const [selectCityVisible, setSelectCityVisible] = useState(false);
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  const handleCityConfirm = (val, extend) => {
    const lastItem = extend.items[extend.items.length - 1];
    const num = Math.floor(Math.random() * (10004 - 10001)) + 10001 + "";
    setSelectedCityCode(num);
    setSelectedCity(lastItem.label);
  };

  const handleStartTimeChange = (value) => {
    setStartTime(dayjs(value).format("YYYY-MM-DD"));
  };

  const handleEndTimeChange = (value) => {
    setEndTime(dayjs(value).format("YYYY-MM-DD"));
  };

  const handleClick = () => {
    if (!startTime.trim()) {
      Toast.show({
        icon: "fail",
        content: "请选择开始日期!",
      });
      return;
    }
    if (!endTime.trim()) {
      Toast.show({
        icon: "fail",
        content: "请选择截止日期!",
      });
      return;
    }
    if (
      new Date(`${endTime.trim()} 23:59:59`).getTime() <
      new Date(`${startTime.trim()} 00:00:00`).getTime()
    ) {
      Toast.show({
        icon: "fail",
        content: "截止日期不能小于开始日期!",
      });
      return;
    }
    history.push({
      pathname: "/search",
      search: selectedCityCode.trim()
        ? `?code=${selectedCityCode}&startTime=${startTime}&endTime=${endTime}`
        : `?startTime=${startTime}&endTime=${endTime}`,
    });
  };

  useEffect(() => {}, []);

  const labelRenderer = useCallback((type, data) => {
    switch (type) {
      case "year":
        return data + "年";
      case "month":
        return data + "月";
      case "day":
        return data + "日";
      case "hour":
        return data + "时";
      case "minute":
        return data + "分";
      case "second":
        return data + "秒";
      default:
        return data;
    }
  }, []);

  return (
    <div className="search">
      {/* 可选城市 */}
      <div className="search-addr">
        {!props?.citysLoading && (
          <>
            <List.Item
              extra={selectedCity ? selectedCity : "请选择"}
              onClick={() => {
                setSelectCityVisible(true);
              }}
            >
              可选城市
            </List.Item>
            <Cascader
              options={props?.citys || []}
              visible={selectCityVisible}
              title="城市"
              onClose={() => {
                setSelectCityVisible(false);
              }}
              onConfirm={(val, extend) => handleCityConfirm(val, extend)}
            />
          </>
        )}
      </div>
      {/* 可选时间 */}
      <div className="search-start_time">
        <List.Item
          extra={startTime.trim() ? startTime : "请选择"}
          onClick={() => {
            setStartTimeVisible(true);
          }}
        >
          租期开始日期
        </List.Item>
        <DatePicker
          title="开始日期"
          visible={startTimeVisible}
          onClose={() => {
            setStartTimeVisible(false);
          }}
          defaultValue={new Date()}
          min={new Date()}
          onConfirm={(val) => {
            handleStartTimeChange(val);
          }}
          renderLabel={labelRenderer}
        />
      </div>
      <div className="search-end_time">
        <List.Item
          extra={endTime.trim() ? endTime : "请选择"}
          onClick={() => {
            setEndTimeVisible(true);
          }}
        >
          租期截止日期
        </List.Item>
        <DatePicker
          title="截止日期"
          visible={endTimeVisible}
          onClose={() => {
            setEndTimeVisible(false);
          }}
          defaultValue={new Date()}
          min={new Date()}
          onConfirm={(val) => {
            handleEndTimeChange(val);
          }}
          renderLabel={labelRenderer}
        />
      </div>

      {/* 点击按钮 */}
      <div className="search-btn">
        <Button onClick={handleClick} color="warning" size="large">
          搜索民宿
        </Button>
      </div>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  // console.log(prevProps, nextProps)
  if (
    prevProps.citys === nextProps.citys &&
    prevProps.citysLoading === nextProps.citysLoading
  ) {
    return true;
  } else {
    return false;
  }
}

export default memo(Search, areEqual);
