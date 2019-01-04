//app.js
import { Tools } from 'class/Tools.js'
import { Basic } from 'class/Basic.js'
let storage = require('utils/storage.js')
App({
  
  onLaunch: function() {
    var that = this
    that.initData();
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
  //webin  add
  tools: null,//工具类
  basic: null,//Basic认证类
  initData:function(){
    this.tools = new Tools(this)
    this.basic = new Basic(this)
  },
  appData: {
    token: '',//令牌
    debug: true,//是否是debug模式
    //host: 'http://interface.nat300.top/api',//局域网对外地址
    host: 'http://www.cs.com/api',//本地开发地址
    basicAuthCode: "Basic YWRtaW46MTIzNDU2"
  },
  apiUrl: {
    //其他接口
    volunteerOrg: '/volunteer/org',//组织架构列表+搜索
    noticeIndex: '/notice/index',//消息列表
    noticeDetail: '/notice/detail',//消息详情
    //大元一爱接口
    volunteerApply: '/volunteer/apply',//申请智工
    volunteerDetail: '/volunteer/detail',//智工详情
    donorJoin: '/donor/join',//智工登记会员
    donorPayMoney: '/donor/payMoney',//会员捐善款
    donorRecord: '/donor/record',//智工会员列表
    donorSummary: '/donor/summary',//善款统计
    donorMoneylog: '/donor/moneylog',//个人捐款记录
    //活动接口
    activitySearch: '/activity/search',//活动搜索列表
    activityDetail: '/activity/detail',//活动详情
    activityJoin: '/activity/join',//参加活动
    //登录&用户接口
    tokenGenerate: '/token/generate',//令牌token生成
    messageSend: '/message/send',//发动短信
    memberInfo: '/member/info',//用户个人信息
    memberAuthInfo: '/member/authInfo',//微信认证更新头像
    memberChangePhone: '/member/changePhone',//更改手机号
    memberAccountLogin: '/member/accountLogin',//账户登录
    //首页接口
    playerList: '/player/list',//轮播图
    memberWxLogin: '/member/wxLogin',//微信登录
    activityHome: '/activity/home',//首页活动展示
  }
})