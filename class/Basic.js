class Basic {
  constructor(app) {
    this.that = app
  }
  getServiceToken() {
    var that = this.that
    wx.request({
      url: this.that.appData.host + this.that.apiUrl.tokenGenerate, //仅为示例，并非真实的接口地址
      data: {},
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': this.that.appData.basicAuthCode
      },
      success: function (res) {
        var status_code = res.statusCode;
        if (status_code == 200 && res.data.code == 1) {
          //wx.setStorageSync('session', sess)
        }
      }
    })
  }

}


module.exports = { Basic }