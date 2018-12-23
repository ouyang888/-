// pages/activityApplyDetail/activityApplyDetail.js
let storage = require('../../utils/storage.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    activityDetail:'',
    act:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.xhr('POST', '/activity/detail', { id: options.id}, '', (res) => {
      if (res.data.data.act_type==1){
        this.setData({
          act: "教育"
        })
      } else if (res.data.data.act_type == 2){
        this.setData({
          act: "育暖"
        })
      } else if (res.data.data.act_type == 3) {
        this.setData({
          act: "随喜"
        })
      }
      this.setData({
        activityDetail: res.data.data
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