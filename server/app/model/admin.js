const helper = require("../extend/helper");

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema(
    {
      username: {
        type: String,
        min: 3,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{3,20}$/,
      },
      password: {
        type: String,
      },
    },
    {
      collection: "admin",
      versionKey: false,
    }
  );

  const AdminModel = mongoose.model("Admin", AdminSchema);

  // 默认创建一个管理员
  const adminUser = {
    username: "admin",
    password: "756131502@qq.com",
  };

  helper.genSaltPassword(adminUser.password).then(async (hash) => {
    adminUser.password = hash;
    const user = await AdminModel.find({ username: adminUser.username });
    if (user.length === 0) {
      AdminModel.create(adminUser);
    }
  });

  return AdminModel;
};
