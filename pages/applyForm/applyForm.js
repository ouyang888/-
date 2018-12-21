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
      { name: '1', value: '男', checked: 'true'},
      { name: '2', value: '女', }
    ],
    date: '2016-09-01',
    array: ['南阳智工团1', '南阳智工团2', '南阳智工团3', '南阳智工团4'],
    cisanArr: ['南阳智工团1', '南阳智工团2', '南阳智工团3', '南阳智工团4'],
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
    var that = this
    that.setData({
      v_sex: e.detail.value
    })
  },

  nameInput:function(e){
    this.setData({
      v_name: e.detail.value
    })
  },
  idcardInput: function (e){
    this.setData({
      v_idcard: e.detail.value
    })
  },
  phoneInput:function(e){
    this.setData({
      v_phone: e.detail.value
    })
  },
  danwei:function(e){
    this.setData({
      v_company: e.detail.value
    })
  },
  zhiwu:function(e){
    this.setData({
      v_company_position: e.detail.value
    })
  },
  email:function(e){
    this.setData({
      v_email: e.detail.value
    })
  },
  addressInfo:function(e){
    this.setData({
      v_address: e.detail.value
    })
  },
  beizhu:function(e){
    this.setData({
      v_mark: e.detail.value
    })
  },


  //申请智工
  apply:function(){
    var that = this
    let list = {
      "v_name": that.data.v_name,
      "v_idcard": that.data.v_idcard,
      "v_phone": that.data.v_phone,
      "v_company": that.data.v_company,
      "v_company_position": that.data.v_company_position,
      "v_email": that.data.v_email,
      "v_sex": that.data.v_sex,
      "v_calendar_type": "",
      "v_birthday": that.data.date,
      "v_address": that.data.v_address,
      "v_team_id": "",
      "v_history_activity": that.data.index,
      "v_wish_activity_id": "",
      "v_mark": that.data.v_mark
    }
    console.log(list)
    return;
    app.xhr('POST', '/volunteer/apply', list, '', (res) => {
      console.log(res)
    });
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