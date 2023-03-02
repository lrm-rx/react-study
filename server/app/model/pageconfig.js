module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PageConfigSchema = new Schema(
    {
      // -------------------- hearder start ------------------
      logo: {
        type: "string",
        required: false,
      },
      title: {
        type: "string",
        required: false,
        max: 20,
      },
      openSearch: {
        type: "boolean",
        default: true,
      },
      login: {
        type: "boolean",
        default: false,
      },
      register: {
        type: "boolean",
        default: false,
      },
      // -------------------- hearder end ------------------

      // -------------------- main start ------------------
      // 问候语
      salutation: {
        type: "string",
        min: 2,
        max: 100,
      },
      // 打字特效
      effects: {
        type: "boolean",
        default: false,
      },
      // 归档页背景
      archiveBgImg: {
        type: "string",
      },
      // 分类页背景
      categoriesBgImg: {
        type: "string",
      },
      // 标签页背景
      tagsBgImg: {
        type: "string",
      },
      aboutBgImgs: [
        {
          imgUrl: { type: "string" },
          id: {
            type: mongoose.Types.ObjectId,
          },
        },
      ],
      // -------------------- main end ------------------

      // -------------------- footer start ------------------
      copyright: {
        type: "string",
        min: 1,
        max: 200,
      },
      extra: {
        type: "string",
        min: 1,
        max: 200,
      },
      // -------------------- footer end ------------------
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "number",
        default: 0,
      },
    },
    {
      collection: "config",
      versionKey: false,
    }
  );

  return mongoose.model("PageConfig", PageConfigSchema);
};
