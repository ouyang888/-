// pages/activityList/activityList.js
let storage = require('../../utils/storage.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    isClick: false,
    isLength: false,
    code: "",
    phone: "",
    name: "",
    activityList: [],
    search: "",
    eid: "",
    page: 1,
    hasMoreData: true,
    contentlist: [],
    msg: "",
    showcon: false,
    param: null,
    total: 0, //分页总数
    pageNum: 1, //分页记录数
    pageSize: 2, //分页大小
    hasmoreData: true, //更多数据
    hiddenloading: true //加载中
  },

  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  sea: function(e) {
    this.setData({
      search: e.detail.value
    })
  },



  bindButtonTap: function() {
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
      var interval = setInterval(function() {
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

      //请求接口
      //获取验证码接口
      let codeList = {
        "type": "login",
        "phone": that.data.phone
      }
      app.xhr('POST', '/message/send', codeList, '', (res) => {
        if (res.data.code == 200) {
          app.toast("发送成功")
        } else {
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

  showDialogBtn: function(e) {
    this.setData({
      showModal: true,
      eid: e.target.id
    })
  },
  preventTouchMove: function() {},
  hideModal: function() {
    this.setData({
      name: "",
      phone: "",
      showModal: false
    });
  },

  onConfirm: function() {
    var that = this
    let participate = {
      "activity_id": that.data.eid,
      "person_name": that.data.name,
      "person_phone": that.data.phone,
      "yzm": that.data.code
    }
    app.xhr('POST', '/activity/join', participate, '', (res) => {
      if (res.data.code == 200) {
        app.toast("报名成功")
        this.hideModal();
        storage.set("person_id", res.data.data.person_id)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  onReachBottom: function () {
    　　　　console.log('加载更多')
    　　　　this.setData({ hiddenloading: false })
    　　　　this.getList()
  　　},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
    // 首页活动展示
    // app.xhr('POST', '/activity/search', '', '', (res) => {
    //   this.setData({
    //     activityList: res.data.data.data
    //   })
    //   console.log(this.data.activityList)
    // });
  },

  getList: function () {
    　var that = this;
    　if (that.data.hasmoreData == false) {
      　that.setData({ hiddenloading: true })
      　return;
    　}
    // 　that.data.param.pageNum = that.data.pageNum;
    // 　that.data.param.pageSize = that.data.pageSize;
    let listPage = {
      current_page: that.data.pageNum,
      total: that.data.pageSize
    }
    app.xhr('POST', '/activity/search', listPage, '', (res) => {
      　that.setData({
          total: res.data.data.total,
          activityList: res.data.data.data,
       　 pageNum: that.data.pageNum + 1
      　})
      　if (that.data.total <= 0 || that.data.pageNum * that.data.pageSize >= that.data.total) {
       　　that.setData({ hasmoreData: false, hiddenloading: true })
      　}
    　})
  　},

  searchList: function() {
    var that = this
    // if (that.data.hasmoreData == false) {
    //   that.setData({ hiddenloading: true })
    //   return;
    // }
    // let listPage = {
    //   current_page: that.data.pageNum,
    //   total: that.data.pageSize,
    //   keyword: that.data.search
    // }
    app.xhr('POST', '/activity/search', { keyword: that.data.search}, '', (res) => {
      this.setData({
        activityList: res.data.data.data
      })
      if (res.data.data.data.length == 0) {
        this.setData({
          showcon: true,
          msg: "无该活动，请重新输入活动标题"
        })
      } else {
        this.setData({
          showcon: false
        })
      }
      // if (that.data.total <= 0 || that.data.pageNum * that.data.pageSize >= that.data.total) {
      //   that.setData({ hasmoreData: false, hiddenloading: true })
      // }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})