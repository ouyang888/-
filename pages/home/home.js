//index.js
//获取应用实例
let storage = require('../../utils/storage.js')
var app = getApp()
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
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    isClick: false,
    isLength: false,
    code: "",
    phone: "",
    name: "",
    showModal: false,
    phone: storage.get_s("phone"),
    acid:"",
    person_id: storage.get_s("person_id"),
    showCont:true

  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindButtonTap: function () {
    var that = this;

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    if (phone == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000,
        color: '#929fff'
      });
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000,
        color: '#929fff'
      });
    } else {
      //当手机号正确的时候提示用户短信验证码已经发送
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      that.setData({
        isClick: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
        color: '#ccc',
      })
      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + '秒后重发', //按钮文字变成倒计时对应秒数
        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            isClick: false,
            color: '#929fff'
          })
        }
      }, 1000);

      //获取验证码接口
      let codeList = {
        "type": "login",
        "phone": that.data.phone
      }
      app.xhr('POST', '/message/send', codeList, '', (res) => {
        if (res.data.code == 200) {
          app.toast("发送成功")
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            color: '#929fff'
          });
        }
      });

    };

    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    // if (warn != null) {
    //   wx.showModal({
    //     title: '提示',
    //     content: warn
    //   })

    //   that.setData({
    //     disabled: false,
    //     color: '#929fff'
    //   })
    //   return;

    // };
  },
  showDialogBtn: function (e) {
    this.setData({
      showModal: true,
      acid: e.target.id
    })
  },

  preventTouchMove: function () {

  },
  hideModal: function () {
    this.setData({
      name: "",
      phone: "",
      showModal: false
    });
  },

  onConfirm: function () {
    var that = this
    let participate = {
      "activity_id": that.data.acid,
      "person_name": that.data.name,
      "person_phone": that.data.phone,
      "yzm": that.data.code
    }
    app.xhr('POST', '/activity/join', participate, '', (res) => {
      if (res.data.code == 200) {
        app.toast("报名成功")
        this.hideModal();
        storage.set("person_id", res.data.data.person_id)
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 活动列表
  activityList: function () {
    wx.navigateTo({
      url: '../activityList/activityList'
    })
  },
  //关于我们
  about: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  //组织架构
  organization: function () {
    wx.navigateTo({
      url: '../organization/organization'
    })
  },
  //大爱一元
  donationReg: function () {
    wx.navigateTo({
      url: '../donationReg/donationReg'
    })
  },
  //申请智工
  applyAgreement: function () {
    wx.navigateTo({
      url: '../applyAgreement/applyAgreement'
    })
  },



  onLoad: function() {
    //轮播图
    app.xhr('POST', '/player/list', '', '', (res) => {
      // console.log(res)
      this.setData({
        imgUrls: res.data.data
      })
      //  console.log(this.data.imgUrls)
    });

    // 首页活动展示
    app.xhr('POST', '/activity/home', '', '', (res) => {
      this.setData({
        activity: res.data.data
      })
      //  console.log(this.data.activity)
    });


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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
        }
      })

    }
  },

  showsignup:function(){

  },
  //点击允许后的用户信息
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //点击授权后跳转的页面
  },

})