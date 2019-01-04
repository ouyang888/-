// component/loading/loading.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showLoadingView() {
      this.setData({
        isShow: true
      })
    },
    hideLoadingView() {
      this.setData({
        isShow: false
      })
    }
  }
})
