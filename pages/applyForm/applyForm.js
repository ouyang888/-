// pages/applyForm/applyForm.js
let storage = require('../../utils/storage.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 50,
    index: 0,
    teamsindex: 0,
    activeindex: 0,
    focus: false,
    defaultSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    items: [{
        name: '1',
        value: '男',
        checked: 'true'
      },
      {
        name: '2',
        value: '女',
      }
    ],
    date: '2016-09-01',
    dateRl: [{
        id: '1',
        value: '阳历',
      },
      {
        id: '2',
        value: '阴历',
      }
    ],
    dateList: "",
    team: [],
    teamsId: "",
    activeId: "",
    wishActivity: "",
    v_name: "",
    v_idcard: "",
    v_phone: "",
    v_company: "",
    v_company_position: "",
    v_email: "",
    v_calendar_type: "",
    v_sex: "",
    v_birthday: "",
    v_address: "",
    v_team_id: "",
    v_history_activity: "",
    v_wish_activity_id: "",
    v_mark: ""
  },

  //日期选择
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
    })
  },
  //阴历阳历选择
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.dateRl[e.detail.value].id)
    this.setData({
      dateList: this.data.dateRl[e.detail.value].id,
      index: e.detail.value
    })
  },
  //所属智工团
  bindTeamsChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.team[e.detail.value].vt_id)
    this.setData({
      teamsId: this.data.team[e.detail.value].vt_id,
      teamsindex: e.detail.value
    })
  },

  //希望参加的活动
  bindactiveChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.wishActivity[e.detail.value].act_id)
    this.setData({
      activeId: this.data.wishActivity[e.detail.value].act_id,
      activeindex: e.detail.value
    })
  },


  radioChange: function(e) {
    var that = this
    that.setData({
      v_sex: e.detail.value
    })
  },

  nameInput: function(e) {
    this.setData({
      v_name: e.detail.value
    })
  },
  idcardInput: function(e) {
    this.setData({
      v_idcard: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      v_phone: e.detail.value
    })
  },
  danwei: function(e) {
    this.setData({
      v_company: e.detail.value
    })
  },
  zhiwu: function(e) {
    this.setData({
      v_company_position: e.detail.value
    })
  },
  email: function(e) {
    this.setData({
      v_email: e.detail.value
    })
  },
  addressInfo: function(e) {
    this.setData({
      v_address: e.detail.value
    })
  },
  beizhu: function(e) {
    this.setData({
      v_mark: e.detail.value
    })
  },
  hisAcitve: function(e) {
    this.setData({
      v_history_activity: e.detail.value
    })
  },


  //申请智工
  apply: function() {
    var that = this
    let list = {
      "v_name": that.data.v_name,
      "v_idcard": that.data.v_idcard,
      "v_phone": that.data.v_phone,
      "v_company": that.data.v_company,
      "v_company_position": that.data.v_company_position,
      "v_email": that.data.v_email,
      "v_sex": that.data.v_sex,
      "v_calendar_type": that.data.dateList,
      "v_birthday": that.data.date,
      "v_address": that.data.v_address,
      "v_team_id": that.data.teamsId,
      "v_history_activity": that.data.v_history_activity,
      "v_wish_activity_id": that.data.activeId,
      "v_mark": that.data.v_mark
    }
    if (!(/^1[34578]\d{9}$/.test(that.data.v_phone))){
      wx.showToast({
        title: "手机号码有误",
        icon: 'none',
        duration: 2000
      });
    }else{
      app.xhr('POST', '/volunteer/apply', list, '', (res) => {
        console.log(res.data.code)
        if (res.data.code == 200) {
          app.toast("申请成功")
          wx.switchTab({
            url: '../me/me'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.xhr('POST', '/volunteer/detail', '', '', (res) => {
      this.setData({
        team: res.data.data.teams,
        wishActivity: res.data.data.activitys,
        teamsId: res.data.data.teams[0].vt_id,
        activeId: res.data.data.activitys[0].act_id,
        dateList: this.data.dateRl[0].id,
        v_sex:this.data.items[0].name
      })
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})