// pages/donationRecord/donationRecord.js
var app = getApp()
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
var n = timestamp * 1000;
var date = new Date(n);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donationRe:[],
    summary:[],
    donor_id:"",
    dateMon: Y + "-" + M
  },

  bindDateChange: function (e) {
    var that = this
    app.xhr('POST', '/donor/moneylog', { donor_id: that.data.donor_id, month: e.detail.value}, '', (res) => {
      this.setData({
        dateMon: e.detail.value,
        donationRe: res.data.data.list.data,
        summary: res.data.data.summary
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.dateMon)
    this.setData({
      donor_id: options.id
    })
    app.xhr('POST', '/donor/moneylog', { donor_id: options.id, month: this.data.dateMon}, '', (res) => {
      for (var i = 0; i < res.data.data.summary.length; i++) {
        console.log(res.data.data.summary[i].total)
        if (res.data.data.summary[i].total == null){
          this.setData({
            total:"0"
          })
        }
      }
      this.setData({
        donationRe:res.data.data.list.data,
        summary: res.data.data.summary
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})