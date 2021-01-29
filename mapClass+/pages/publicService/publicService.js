// pages/publicService/publicService.js
const app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const publicService = require('../../utils/publicServiceData.js');
const util = require('../../utils/util.js');
var qqmapsdk
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight, //顶部适配
    region: [],
    customItem: '全部',
    province: '',
    city: '',
    district: '',
    publicServiceList: publicService.publicServiceData, //原始数据
    publicServiceList1: [], //处理后的数据
    time: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var time = util.formatTime(new Date());
    _that.setData({
      time: time
    })
    qqmapsdk = new QQMapWX({
      key: '6KIBZ-A5D3I-MMMGC-5WZVO-HCP5Z-MVBDP'
    });
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(JSON.stringify(res));
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            let district = res.result.ad_info.district
            let region = [province, city, district];
            _that.setData({
              province: province,
              city: city,
              district: district,
              region: region
            })
            _that.screenAdress(province, city, district)
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            // console.log(res);
          }
        });
      }
    })
  },
  bindRegionChange: function (e) {
    var _that = this;
    //两个值 code value
    _that.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2],
    })
    _that.screenAdress(e.detail.value[0], e.detail.value[1], e.detail.value[2]);
  },
  screenAdress: function (province, city, district) {
    var _that = this;

    var publicServiceArr = _that.data.publicServiceList;
    var publicServiceList3 = []; //装载最终结果
    publicServiceArr.forEach(element => {
      var publicServiceList1 = []; //装载筛选省之后的数据
      var publicServiceList2 = []; //装载筛选市之后的数据
      var index = publicServiceArr.indexOf(element);
      //对比省
      if (province == element.province) {
        //如果市选择全部
        if (city != "全部") {
          publicServiceList1.push(publicServiceArr[index]);
          publicServiceList1.forEach(element => {
            var index2 = publicServiceList1.indexOf(element);
            //对比市
            if (city == element.city) {
              //如果区选择全部
              if (district != "全部") {
                publicServiceList2.push(publicServiceList1[index2]);
                publicServiceList2.forEach(element => {
                  var index3 = publicServiceList2.indexOf(element);
                  //对比区
                  if (district == element.district) {
                    publicServiceList3.push(publicServiceList2[index3]);
                  }
                });
              } else {
                publicServiceList3.push(publicServiceList2[index2]);
              }
            }
          });
        } else {
          publicServiceList3.push(publicServiceArr[index]);
        }
      }

    });
    _that.setData({
      publicServiceList1: publicServiceList3
    })
  },
  goToManen(e) {
    var _that = this;
    wx.navigateToMiniProgram({
      appId: 'wx1f64860225319d0d', //要打开的小程序 appId
      path: 'news/activity/activity.html?id=' + e.currentTarget.dataset.id, //打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'back' //需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'trial', //要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
      }
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

  },
  goToManEn: function () {
    wx.navigateToMiniProgram({
      appId: 'wx1f64860225319d0d', //要打开的小程序 appId
      path: '', //打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'back' //需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'trial', //要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
      }
    })
  }
})