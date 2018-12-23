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
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.xhr('POST', '/donor/record', '', '', (res) => {
      console.log(res)
      this.setData({
        donation: res.data.data
      })

      console.log(this.data.donation)
    });

    // 善款统计
    app.xhr('POST', '/donor/summary', '', '', (res) => {
      console.log(res)
      this.setData({
        donationTotal: res.data.data
      })
      console.log(this.data.donationTotal)
    });
    
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  addPeople: function() {
    wx.navigateTo({
      url: '../addPeople/addPeople'
    })
  },

  // 捐款记录
  donationRecord: function() {
    wx.navigateTo({
      url: '../donationRecord/donationRecord'
    })
  },

  //搜索
  search: function() {
    app.xhr('POST', '/donor/record', {
      keyword: this.data.name
    }, '', (res) => {
      this.setData({
        donation: res.data.data.data
      })
      // console.log(this.data.organ)
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