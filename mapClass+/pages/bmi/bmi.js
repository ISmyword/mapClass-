//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//顶部适配
    viewHeight: 0,
    isShow: true,
    windowHeigth: 0,
    weight: '',//体重
    height: '',//身高
    yqsc: '体重标准',//孕前身材
    BMINub: 0,//bmi指数
    standard: '8-10kg',//标准
    proposal: '您的体重标准，继续保持良好地饮食习惯。',//建议
    color: '#2f81ff',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  calculation(){
    var _that=this;
    var weight = _that.data.weight;
    var height = _that.data.height;
    _that.setData({
      color: '#0058c1',
    })
    if (weight == 0 || height==0){
      wx.showToast({
        title: '请输入您的孕前信息',
        icon: 'none',
        duration: 2000
      })
      setTimeout(function () {
        _that.setData({
          color: '#2f81ff',
        })
      }, 400)
      return;
    }
    var bmi = weight / (height/100 * height/100);
    var BMINub, yqsc, standard, proposal,
    BMINub = bmi.toFixed(2);

    if (bmi < 18.5){
      yqsc= '体重偏轻';
      standard= '12.5kg';
      proposal= '您的体重偏轻，要注意增加食物摄入量哦，足够的摄入量才能保证健康受孕以及之后胎宝宝的健康优质的成长。';
    } else if (18.5 <= bmi && bmi < 25){
      yqsc = '体重标准';
      standard = '8-10kg';
      proposal = '您的体重标准，继续保持良好地饮食习惯。';
    } else if (25 <= bmi && bmi <30){
      yqsc = '体重偏重';
      standard = '5-7kg';
      proposal = '您的体重偏重，要注意从饮食、运动等多方面进行体重管理，尽量调整到标准体重之内，才能对您的孕育之路更有利。';
    } else if (30 <= bmi ) {
      yqsc = '肥胖';
      standard = '需咨询医生及营养师';
      proposal = '您的体重已符合肥胖标准，需及时咨询医生专业营养师，进行干预。';
    }
    _that.setData({
      BMINub : BMINub,
      yqsc: yqsc,
      standard: standard,
      proposal: proposal,
      isShow: false,
      color: '#006fff',
    })

    var px2rpx = app.globalData.px2rpx;
    var y = _that.data.viewHeight + 64;

    setTimeout(function(){
      app.slideupshow(_that, 'slide_up2', (-y/2+130) / px2rpx, 1)
      app.slideupshow(_that, 'slide_up1', -y / px2rpx, 1)
    },3000)
  },
  return() {

    var px2rpx = app.globalData.px2rpx;

    var y = this.data.viewHeight + 64;

    this.setData({
      isShow: true,
      weight: '',//体重
      height: '',//身高
    })
    app.slideupshow(this, 'slide_up2', 0 / px2rpx, 1)
    app.slideupshow(this, 'slide_up1', y / px2rpx, 1);
    
  },
  bindKeyInputWeight: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  bindKeyInputHeight: function (e) {
    this.setData({
      height: e.detail.value
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
    var _that=this;
    //在Android系统下 某些机型会出现获取屏幕高度不精确的情况(开发模式正常 体验 正式版本出现高度不精确)
    wx.getSystemInfo({
      success: function (res) {
        var system = res.system;
        var windowWidth = res.windowWidth;
        var windowHeigth = res.windowHeight;
        var px2rpx = (750 / windowWidth).toFixed(2);

        var viewHeight = px2rpx * windowHeigth - 500 - px2rpx *res.statusBarHeight - 90 + 64;
        _that.setData({
          viewHeight: viewHeight,
          windowHeigth: px2rpx *windowHeigth,
        })

      }
    })
  }
})
