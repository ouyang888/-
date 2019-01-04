class Tools {

  //初始化函数
  constructor(app) {
    this.that = app;
  }

  /**
 * 
 * url string  //统一请求函数
 * data object key->value 请求数据
 * successCallBack function 成功回调函数
 * failCallBack   function 失败回调函数
 * completeCallBack function 完成回调函数
 * 封装网络请求
 */
  postData(url, data, successCallBack, failCallBack, completeCallBack) {
    var that = this.that;
    var url = that.appData.host + url;
    data.token = that.appData.token
    that.tools.debug(url)
    that.tools.debug(data)
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.tools.debug(res.data)
        //状态码判断
        var status_code = res.statusCode;
        if (status_code != 200) {
          that.tools.showLoading(false)
          that.tools.showToast('状态码错误:' + code)
          return false;
        }
        //成功执行
        if (typeof successCallBack == "function") {
          successCallBack(res);
        } else {
          ;
        }
      },
      //失败执行
      fail: function (res) {
        if (typeof failCallBack == "function") {
          failCallBack(res);
        } else {
          ;
        }
      },
      //都要执行
      complete: function (res) {
        if (typeof completeCallBack == "function") {
          completeCallBack(res);
        } else {
          ;
        }
      },
    })
  }

  //统一打印信息的方法
  debug(info) {
    if (this.that.appData.debug) {
      console.info(info)
    }
  }

  //微信登录并且获取用户信息
  wxLogin() {
    
  }


  //显示loading
  showLoading(isShow) {
    var bool = isShow || false
    var pages = getCurrentPages()
    var page = pages[pages.length - 1]
    var loading = page.selectComponent('#loading')
    if (loading) {
      if (bool)
        loading.showLoadingView();
      else
        loading.hideLoadingView();
    }
  }
  //toast显示
  showToast(text) {
    var pages = getCurrentPages()
    var page = pages[pages.length - 1]
    var toast = page.selectComponent('#toast')
    if (toast) {
      toast.showToastView(text);
      setTimeout(function () { toast.hideToastView() }, 1200)
    }
  }
  //时间格式化
  toDate(number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  }

}




module.exports = { Tools }