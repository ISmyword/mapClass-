//index.js
//获取应用实例
const app = getApp()
const _adbcItems = require('../../utils/data.js');
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//顶部适配
    windowHeigth: app.globalData.windowHeigth,
    adbcItems: _adbcItems.adbcItems,
    fraction: 0,//分数
    isShowPop: false,
    height: 0,
    topNum: 0,
    px2rpx : app.globalData.px2rpx,
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e)
    var radioId = e.currentTarget.dataset.radioid;
    var adbcItems = this.data.adbcItems;
    const items = this.data.adbcItems[radioId].choice;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    adbcItems[radioId].choice = items;
    this.setData({
      adbcItems: adbcItems,
    })
  },
  submit(){
    var _that=this;
    var adbcItems = _that.data.adbcItems;
    var fraction=0;
    var isUndefined=false;
    for (var i = 0; i < adbcItems.length;i++){
      adbcItems[i].choice.forEach((item, index, arr) => {
        if (item.checked){
          fraction += parseInt(item.value);
        } else if (item.checked===undefined){
          isUndefined=true;
          wx.showToast({
            title: '有题目未填写，请重新检查',
            icon: 'none',
            duration: 3000
          });
        }
      });
    }
    if (isUndefined){
      return;
    }
    _that.setData({
      isShowPop: true,
      fraction, fraction,
    })
    setTimeout(function () {
       _that.goToResult(fraction);
      _that.setData({
        isShowPop: false,
      })
    },2000)
  },
  resturn(){
    this.setData({
      adbcItems: _adbcItems.adbcItems,
      topNum: 0,
    })
  },
  //前往结果页面
  goToResult: function (fraction) {
    wx.navigateTo({
      url: '../result/result?fraction='+ fraction
    })
  },
  goToManEn: function () {
    wx.navigateToMiniProgram({
      appId: 'wx1f64860225319d0d',//要打开的小程序 appId
      path: '',//打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'back'//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'trial',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
      }
    })
  },
  onLoad: function () {
  },
  onReady(){
    let query = wx.createSelectorQuery();
    query.select('.container').boundingClientRect(rect => {
      let clientHeight = rect.height;
      let clientWidth = rect.width;
      let ratio = 750 / clientWidth;
      let height = clientHeight * ratio;
      console.log(height);
      this.setData({
        height: height,
        viewHeight: app.globalData.windowHeigth - 90 - this.data.statusBarHeight,
      })
    }).exec();

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
