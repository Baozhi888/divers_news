const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { id, plateNumber, wxId, wxName, phone, username, password, invoiceDate, amount, remarks } = event;

  try {
    const result = await db.collection('drivers').doc(id).update({
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
        updateTime: db.serverDate()
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