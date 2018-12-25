// pages/organization/organization.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organ: [],
    name: "",
    position:"",
    msg:"",
    showcon:false
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
      for (let i = 0; i < this.data.organ.length; ++i) {
        if (this.data.organ[i].v_position == 0){
          this.setData({
            position :"普通智工"
          })
        } else if (this.data.organ[i].v_position == 10){
          this.setData({
            position: "副团长"
          })
        } else if (this.data.organ[i].v_position == 20) {
          this.setData({
            position: "团长"
          })
        } else if (this.data.organ[i].v_position == 30) {
          this.setData({
            position: "秘书"
          })
        } else if (this.data.organ[i].v_position == 40) {
          this.setData({
            position: "秘书长"
          })
        } else if (this.data.organ[i].v_position == 50) {
          this.setData({
            position: "董事"
          })
        } else if (this.data.organ[i].v_position == 60) {
          this.setData({
            position: "董事长"
          })
        }
      }
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
      if (res.data.data.data.length == 0){
        this.setData({
          showcon:true,
          msg:"无该用户信息，请输入正确姓名"
        })
      }else{
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