const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const { data } = await db.collection('drivers').get();
    return {
      success: true,
      data
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};