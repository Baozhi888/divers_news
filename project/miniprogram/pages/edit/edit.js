Page({
  data: {
    id: '',
    form: {
      plateNumber: '',
      wxId: '',
      wxName: '',
      phone: '',
      username: '',
      password: '',
      invoiceDate: '',
      amount: '',
      remarks: ''
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.loadDriverInfo(options.id);
    }
  },

  loadDriverInfo(id) {
    wx.cloud.callFunction({
      name: 'driverManager',
      data: {
        action: 'getDriver',
        id
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          form: res.result.data
        });
      }
    });
  },

  bindDateChange(e) {
    this.setData({
      'form.invoiceDate': e.detail.value
    });
  },

  handleSubmit() {
    const { form, id } = this.data;
    
    if (!form.plateNumber || !form.phone) {
      wx.showToast({
        title: '请填写必要信息',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'driverManager',
      data: {
        action: id ? 'updateDriver' : 'addDriver',
        id,
        ...form
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({
          title: '保存成功',
          success: () => {
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          }
        });
      }
    });
  }
});