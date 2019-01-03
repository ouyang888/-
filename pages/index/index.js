//index.js
//获取应用实例
var app = getApp()
let storage = require('../../utils/storage.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    activity: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    token: app.globalData.token
  },


  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.switchTab({
        url: '../home/home'
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.switchTab({
          url: '../home/home'
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.switchTab({
            url: '../home/home'
          })
        }
      })

    }
  },

  showsignup:function(){

  },
  //点击允许后的用户信息
  getUserInfo: function(e) {
    storage.set("userInfo", e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //点击授权后跳转的页面
    setTimeout(function(){
      wx.switchTab({
        url: '../home/home',
      },2000)
    })
   
  },
})