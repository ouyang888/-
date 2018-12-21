// pages/organization/organization.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organ: [],
    name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //组织架构列表
    app.xhr('POST', '/volunteer/org', '', '', (res) => {
      this.setData({
        organ: res.data.data.data
      })
      // console.log(this.data.organ)
    });
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  //搜索
  search: function() {
    app.xhr('POST', '/volunteer/org', {keyword:this.data.name}, '', (res) => {
      this.setData({
        organ: res.data.data.data
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