Page({
  data: {
    username: '',
    password: ''
  },

  handleLogin() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'driverManager',
      data: {
        action: 'login',
        username,
        password
      }
    }).then(res => {
      if (res.result.success) {
        wx.setStorageSync('userInfo', res.result.userInfo);
        wx.redirectTo({
          url: '/pages/list/list'
        });
      } else {
        wx.showToast({
          title: res.result.message,
          icon: 'none'
        });
      }
    });
  }
});