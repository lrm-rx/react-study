import React, { useState, useEffect } from "react";
import { ImageUploader, Form, Input, Toast, Button } from "antd-mobile";
import "./index.less";
export default function (props) {
  const [state, setState] = useState();
  const [file, setFile] = useState([]);

  const handleChange = (e) => {
    console.log("改变");
  };

  const uploadImg = (file) => {
    console.log("URL.createObjectURL(file):", URL.createObjectURL(file));
    return {
      url: URL.createObjectURL(file),
    };
  };

  const onFinish = (values) => {
    console.log("values", values);
  };

  useEffect(() => {}, []);

  return (
    <div className="user-edit">
      <div className="avatar">
        <ImageUploader
          maxCount={1}
          value={file}
          onChange={handleChange}
          upload={uploadImg}
        />
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
          name="tel"
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
