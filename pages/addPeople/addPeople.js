// pages/addPepple/addPepple.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    d_name: "",
    d_sex: "",
    d_phone: "",
    d_position: "",
  },

  radioChange: function (e) {
    var that = this
    that.setData({
      d_sex: e.detail.value
    })
  },

  nameInput: function (e) {
    this.setData({
      d_name: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      d_phone: e.detail.value
    })
  },
  positionInpuit:function(e){
    this.setData({
      d_position: e.detail.value
    })
  },


  subAddPeople:function(){
    var that = this
    let list = {
      "d_name": that.data.d_name,
      "d_sex": that.data.d_sex,
      "d_phone": that.data.d_phone,
      "d_position": that.data.d_position,
    }
    app.xhr('POST', '/donor/join', list, '', (res) => {
      if (res.data.code == 200) {
        app.toast("添加成功")
        wx.navigateTo({
          url: '../donationReg/donationReg',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      d_sex: this.data.items[0].name
    })
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