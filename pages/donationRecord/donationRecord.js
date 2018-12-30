// pages/donationRecord/donationRecord.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donationRe:[],
    summary:[],
    donor_id:"",
    dateMon:""
  },

  bindDateChange: function (e) {
    var that = this
    app.xhr('POST', '/donor/moneylog', { donor_id: that.data.donor_id, month: e.detail.value}, '', (res) => {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      console.log(res)
      this.setData({
        date: e.detail.value,
        donationRe: res.data.data.list.data,
        summary: res.data.data.summary
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    this.setData({
      dateMon: myDate.getYear() + "-" + myDate.getMonth()
    })
    console.log(getYear())
    this.setData({
      donor_id: options.id
    })
    app.xhr('POST', '/donor/moneylog', { donor_id: options.id}, '', (res) => {
      // console.log(res)
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