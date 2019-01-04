// component/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    text: '未初始化'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToastView(text) {
      this.setData({
        isShow: true,
        text: text
      })
    },
    hideToastView() {
      this.setData({
        isShow: false
      })
    }
  }
})
