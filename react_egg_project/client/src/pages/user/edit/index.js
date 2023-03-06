import React, { useState, useEffect, memo } from "react";
import { ImageUploader, Form, Input, Toast, Button } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "@/stores/modules/user";
import { transferImgType } from "@/utils/transfer";
import "./index.less";

function EditUser(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const [file, setFile] = useState([]);
  const [fileStr, setFileStr] = useState("");

  const uploadImg = async (file) => {
    const bloburl = URL.createObjectURL(file);
    const result = await transferImgType(bloburl);
    setFileStr(result);
    return {
      url: URL.createObjectURL(file),
    };
  };

  const onFinish = (values) => {
    if (!fileStr) {
      return Toast.show({
        icon: "fail",
        content: "请上传头像!",
      });
    }
    const avatar = fileStr;
    dispatch(editUserAction({ ...values, avatar }));
  };

  useEffect(() => {}, []);

  return (
    <div className="user-edit">
      <div className="avatar">
        <ImageUploader maxCount={1} value={file} upload={uploadImg} />
      </div>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            className="submit-footer"
            size="large"
          >
            提交
          </Button>
        }
      >
        <Form.Item
          label="电话"
          name="phone"
          rules={[{ required: true }, { type: "string", min: 7, max: 11 }]}
        >
          <Input placeholder="请输入电话号码" clearable />
        </Form.Item>
        <Form.Item label="签名" name="sign">
          <Input placeholder="请输入签名" clearable />
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(EditUser);
