// pages/timetable/timetable.js
const app = getApp();
const timetableList = require('../../utils/timetableData.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight, //顶部适配
    inputTxtt: "周边机构名称 课程名称",
    timetableList: timetableList.timetableList,//原始数据不做变更
    timetableList1: [],//排序好的数据 需要变更
    timetableList2:[], //页面使用数据
    keywords: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var timetableList = _that.data.timetableList;

    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        timetableList.forEach(element => {
          //获取索引
          var index = timetableList.indexOf(element);
          //计算距离
          var resKm = util.getDistance(res.latitude, res.longitude, element.latitude, element.longitude);
          //保留两位小数 并赋值
          timetableList[index].resKm = parseFloat(resKm, 2);
        });
        timetableList.sort(util.compare("resKm"))
        //给排好序的数据 赋值序号
        timetableList.forEach(element => {
          var index1 = timetableList.indexOf(element);
          var isGrey=true;
          if((index1+1) % 2 != 0)
            isGrey=false;
          timetableList[index1].id = index1 + 1;
          timetableList[index1].isGrey = isGrey;
        });
        //排序并赋值
        _that.setData({
          timetableList1: timetableList,
          timetableList2: timetableList
        })
      }
    })
  },
  bindInput(e){
    var _that = this;
    var keywords = e.detail.value;
    _that.setData({
      keywords: keywords,
    })
  },
  doSearch() {
    var _that = this;
    var keywords = _that.data.keywords;
    var timetableList = _that.data.timetableList;
    var resultList = [];
    if (keywords != "") {
      for (var i = 0; i < timetableList.length; i++) {
        var str = timetableList[i].title;
        if (str.indexOf(keywords) != -1) {
          resultList.push(timetableList[i]);
        }
      }
      _that.setData({
        timetableList2: resultList,
      })
    }else{
      _that.setData({
        timetableList2: _that.data.timetableList1,
      })
    }

  },
  goToPlace(e){
      var _that = this;
      var mapid = e.currentTarget.dataset.mapid;
      var classid = e.currentTarget.dataset.classid;
      var url = '../place/place?id=' + mapid + '&classid='+ classid;
      wx.navigateTo({
        url: url,
        success() {
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