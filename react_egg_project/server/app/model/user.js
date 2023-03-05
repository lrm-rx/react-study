module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    pwd: STRING(50),
  });

  return User;
};
