// pages/donationReg/donationReg.js
let storage = require('../../utils/storage.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    donation: [],
    donationTotal: '',
    name:'',
    peoples:"",
    money:"",
    beizhu:"",
    showModal: false,
    donorID:"",
    msg: "",
    showcon: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.xhr('POST', '/donor/record', '', '', (res) => {
      // console.log(res)
      this.setData({
        donation: res.data.data.data,
        peoples:res.data.data
      })
    });

    // 善款统计
    app.xhr('POST', '/donor/summary', '', '', (res) => {
      // console.log(res)
      this.setData({
        donationTotal: res.data.data
      })
      // console.log(this.data.donationTotal)
    });
    
  },
  showDialogBtn: function (e) {
    this.setData({
      showModal: true,
      donorID: e.currentTarget.id
    })
  },

  subMoney:function(){
    let that = this
    let list = {
      donor_id: that.data.donorID,
      detail_money: that.data.money,
      detail_mark: that.data.beizhu
    }
    app.xhr('POST', '/donor/payMoney', list, '', (res) => {
      if(res.data.code == 200){
        app.toast("捐款完成")
        this.setData({
          showModal: false,
        })
        wx.navigateTo({
          url: '../donationReg/donationReg'
        })
      }
      
    });


   
  },
  hideModal: function () {
    this.setData({
      detail_money: "",
      detail_mark: "",
      showModal: false
    });
  },


  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  moneyInput:function(e){
    this.setData({
      money: e.detail.value
    })
  },
  beizhuInput: function (e) {
    this.setData({
      beizhu: e.detail.value
    })
  },



  addPeople: function() {
    wx.navigateTo({
      url: '../addPeople/addPeople'
    })
  },

  // 捐款记录
  donationRecord: function(e) {
    wx.navigateTo({
      url: '../donationRecord/donationRecord?id=' + e.currentTarget.id
    })
  },

  //搜索
  search: function() {
    app.xhr('POST', '/donor/record', {keyword: this.data.name}, '', (res) => {
      this.setData({
        donation: res.data.data.data
      })
      if (res.data.data.data.length == 0) {
        this.setData({
          showcon: true,
          msg: "无该用户信息，请输入正确姓名"
        })
      } else {
        this.setData({
          showcon: false
        })
      }
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