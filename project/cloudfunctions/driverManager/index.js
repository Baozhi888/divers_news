const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

// 登录处理
async function handleLogin(event) {
  const { username, password } = event;
  try {
    const { data } = await db.collection('drivers')
      .where({ username, password })
      .get();

    return {
      success: data.length > 0,
      userInfo: data[0] || null,
      message: data.length > 0 ? '登录成功' : '账号或密码错误'
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// 获取司机列表
async function handleGetDrivers() {
  try {
    const { data } = await db.collection('drivers').get();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// 获取单个司机信息
async function handleGetDriver(event) {
  const { id } = event;
  try {
    const { data } = await db.collection('drivers').doc(id).get();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// 添加司机信息
async function handleAddDriver(event) {
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
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// 更新司机信息
async function handleUpdateDriver(event) {
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
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// 删除司机信息
async function handleDeleteDriver(event) {
  const { id } = event;
  try {
    await db.collection('drivers').doc(id).remove();
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// 主函数入口
exports.main = async (event, context) => {
  const { action } = event;
  
  // 根据action调用对应的处理函数
  switch (action) {
    case 'login':
      return handleLogin(event);
    case 'getDrivers':
      return handleGetDrivers();
    case 'getDriver':
      return handleGetDriver(event);
    case 'addDriver':
      return handleAddDriver(event);
    case 'updateDriver':
      return handleUpdateDriver(event);
    case 'deleteDriver':
      return handleDeleteDriver(event);
    default:
      return { success: false, message: '未知的操作类型' };
  }
};