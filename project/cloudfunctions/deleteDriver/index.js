const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { id } = event;

  try {
    await db.collection('drivers').doc(id).remove();
    return {
      success: true
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};