const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { username, password } = event;

  try {
    const { data } = await db.collection('drivers')
      .where({
        username,
        password
      })
      .get();

    if (data.length > 0) {
      return {
        success: true,
        userInfo: data[0]
      };
    }

    return {
      success: false,
      message: '账号或密码错误'
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};