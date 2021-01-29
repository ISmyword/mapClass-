// pages/community/community.js
const app = getApp();
const communityData = require('../../utils/communityData.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight, //顶部适配
    communityList: communityData.communityData,
    imageSrc: "",
    wxnumber: "",
    remarks: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var communityList = _that.data.communityList;

    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        communityList.forEach(element => {
          //获取索引
          var index = communityList.indexOf(element);
          //计算距离
          var resKm = util.getDistance(res.latitude, res.longitude, element.latitude, element.longitude);
          //保留两位小数 并赋值
          communityList[index].resKm = parseFloat(resKm, 2);
        });
        communityList.sort(util.compare("resKm"))

        //排序并赋值
        _that.setData({
          communityList: communityList,
          imageSrc: communityList[0].imageSrc,
          wxnumber: communityList[0].wxnumber,
          remarks: communityList[0].remarks,
        })
      }
    })
  },
  copyText: function () {
    var _that = this;
    wx.setClipboardData({
      data: _that.data.wxnumber,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  // 按钮点击触发
  clickSave() {
    this.canvasToPath().then((res) => {
      this.saveImageToPhotos(res)
    })
  },

  // 保存图片方法
  saveImage() {
    wx.getImageInfo({
      src: this.data.imageSrc, // 此为图片路径
      success: (res) => {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath : res.path, // 此为图片路径
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: '保存成功'
            })
          },
          fail: (err) => {
            console.log(err)
            wx.showToast({
              title: '保存失败'
            })
          }
        })
      },
      fail: (err) => {
        console.log(err)

      }
    })

  },
  // 点击保存图片到相册(授权)
  saveImageToPhotos() {
    let self = this
    // 相册授权
    wx.getSetting({
      success(res) {
        // 进行授权检测，未授权则进行弹层授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              self.saveImage()
            },
            // 拒绝授权时，则进入手机设置页面，可进行授权设置
            fail() {
              wx.openSetting({
                success: function (data) {
                  console.log("openSetting success");
                },
                fail: function (data) {
                  console.log("openSetting fail");
                }
              });
            }
          })
        } else {
          // 已授权则直接进行保存图片
          self.saveImage()
        }
      },
      fail(res) {
        console.log(res);
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
  },
  openSetting(){
    wx.openSetting({
      success: function (osrs) {
    
      }
    })
  }

})