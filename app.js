//app.js
let storage = require('utils/storage.js')
App({
  onLaunch: function() {
    var that = this
    //获取token
    if (that.globalData.token == "") {
      wx.request({
        url: 'http://interface.nat300.top/api' + '/token/generate',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'X-TOKEN': "IbQMozQna0yDL6nwpuP0jTLoM8XL11YLVkTbGe9K",
          'Authorization': "Basic YWRtaW46MTIzNDU2"
        },
        success: function(res) {
          that.globalData.token = res.data.data.token
          wx.login({
            success: res => {
              wx.request({
                url: 'http://interface.nat300.top/api' + '/member/wxLogin',
                method: 'POST',
                data: {
                  code: res.code
                },
                header: {
                  'Content-Type': 'application/json',
                  'X-TOKEN': that.globalData.token,
                },
                success: res => {
                  storage.set("token", that.globalData.token)
                }
              })
            }
          })
        },
        fail: function(error) {
          wx.showToast({
            title: error,
            icon: 'none',
            duration: 2000
          });
        }
      })
    } else {
      that.globalData.token = storage.get_s("token")
    }


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: { 
    userInfo: null,
    token: storage.get_s("token"),
    phone:"",
    userName:"",
    showHome:false
  },
  // data:{
  //   tokens:""
  // },
 
  // onShow:function(op){
  //   var that = this
  //   that.data.tokens = op
  //   // console.log(that.data.tokens)
  // },

  //弹框
  toast: function(title, icon, cb, duration = 2500) {
    wx.showToast({
      title,
      icon,
      duration,
      mask: true,
      success: () => {
        if (typeof(cb) == "function") {
          cb()
        }
      }
    })
  },



  //接口前缀封装
  xhr: function (method, url, obj = null, token = '', cb) {
    var that = this
    wx.request({
      url: 'http://interface.nat300.top/api' + url,
      data: obj,
      method,
      header: {
        'Content-Type': 'application/json',
        'X-TOKEN': storage.get_s("token")
      },
      success: function(res) {
        if (typeof(cb) == "function") {
          cb(res)
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
})