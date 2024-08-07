module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TagsSchema = new Schema(
    {
      tagName: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
      status: {
        type: "boolean",
        default: true,
      },
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "string",
        default: 0,
      },
      articleNum: {
        type: "number",
        default: 0,
      },
    },
    {
      collection: "tags",
      versionKey: false,
    }
  );

  return mongoose.model("Tags", TagsSchema);
};
