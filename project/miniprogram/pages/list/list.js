Page({
  data: {
    drivers: []
  },

  onShow() {
    this.loadDrivers();
  },

  loadDrivers() {
    wx.cloud.callFunction({
      name: 'driverManager',
      data: {
        action: 'getDrivers'
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          drivers: res.result.data
        });
      }
    });
  },

  handleAdd() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    });
  },

  handleEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`
    });
  },

  handleDelete(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'driverManager',
            data: {
              action: 'deleteDriver',
              id
            }
          }).then(res => {
            if (res.result.success) {
              this.loadDrivers();
              wx.showToast({
                title: '删除成功'
              });
            }
          });
        }
      }
    });
  }
});