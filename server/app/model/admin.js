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
    console.log("调用了");
    adminUser.password = hash;
    const user = await AdminModel.find({ username: adminUser.username });
    if (user.length === 0) {
      console.log("好了", adminUser);
      AdminModel.create(adminUser);
    }
  });

  return AdminModel;
};
