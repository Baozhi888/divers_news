const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { plateNumber, wxId, wxName, phone, username, password, invoiceDate, amount, remarks } = event;

  try {
    const result = await db.collection('drivers').add({
      data: {
        plateNumber,
        wxId,
        wxName,
        phone,
        username,
        password,
        invoiceDate,
        amount,
        remarks,
        createTime: db.serverDate()
      }
    });

    return {
      success: true,
      data: result
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};