const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");

module.exports = {
  dayjs,
  filterEmptyField(trans) {
    const pam = {};
    for (const i in trans) {
      if (trans[i]) {
        if (i !== "page" && i !== "pageSize") {
          pam[i] = trans[i];
        }
      }
    }
    return pam;
  },
  // password  用户输入的密码
  // return  加密后的密码
  async genSaltPasswordSync(password) {
    const salt = bcrypt.genSaltSync(10); // 这个值不能设置太大, 原因: 计算机加密运算需要时间
    // 明文, 加密不同, 彩虹攻击
    return await bcrypt.hashSync(password, salt);
  },
  // _password string 用户输入的密码
  // password  string 数据库保存的加密后的密码
  // return boolean 是否匹配
  async comparePasswordSync(_password, password) {
    const correct = bcrypt.compareSync(_password, password);
    return await correct;
  },
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        // 加盐
        bcrypt.hash(password, salt, async (err, hash) => {
          // 加密
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch);
        } else {
          reject(err);
        }
      });
    });
  },
};
