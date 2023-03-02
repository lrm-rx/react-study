module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AboutSchema = new Schema(
    {
      // 描述
      desc: {
        type: "string",
        min: 1,
        max: 5000,
      },
      tags: [
        {
          id: { type: mongoose.Types.ObjectId },
          tagName: { type: "string" },
        },
      ],
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
      collection: "about",
      versionKey: false,
    }
  );

  return mongoose.model("About", AboutSchema);
};
