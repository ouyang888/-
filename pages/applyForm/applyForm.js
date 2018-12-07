// pages/applyForm/applyForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 50,
    index: 0,
    focus: false,
    defaultSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    items: [
      { name: 'man', value: '男', checked: 'true'},
      { name: 'lady', value: '女', }
    ],
    date: '2016-09-01',
    array: ['南阳智工团1', '南阳智工团2', '南阳智工团3', '南阳智工团4'],
    cisanArr: ['南阳智工团1', '南阳智工团2', '南阳智工团3', '南阳智工团4']
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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