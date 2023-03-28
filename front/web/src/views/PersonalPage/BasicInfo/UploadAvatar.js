import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "@service/user";
import { refreshBasicInfo } from "@store/modules/userSlice";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadAvatar = memo((props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "头像",
        status: "done",
        url: props?.userInfo?.avatar,
      },
    ]);
  }, [props?.userInfo]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleUpload = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    if (file.size > 1048576) {
      setFileList([
        {
          uid: "-1",
          name: "头像",
          status: "done",
          url: props?.userInfo?.avatar,
        },
      ]);
      message.error({
        content: "图片大小不能超过1M, 请重新上传!",
        duration: 1,
      });
      return;
    }
    // 伪装成 handleChange里面的图片上传状态
    const imgItem = {
      uid: "1", // 注意，这个uid一定不能少，否则上传失败
      name: "头像",
      status: "uploading",
      url: "",
      percent: 99, // 注意不要写100。100表示上传完成
    };
    setFileList([imgItem]);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("id", props?.userInfo?.id);
    const result = await uploadAvatar(formData);
    if (Number(result.code) === 200) {
      message.success({
        content: "更新头像成功!",
        duration: 1,
      });
      // 刷新基本信息
      dispatch(refreshBasicInfo(result.data.info));
      return;
    }
    message.error({
      content: result.msg,
      duration: 1,
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传
      </div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleUpload}
        accept=".jpg,.gif,.png,.jpeg"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
});
export default UploadAvatar;
