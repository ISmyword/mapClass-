//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//顶部适配
    s_image: '../../images/s_3.png',//图片
    fraction: 0,//分数
    proposal: '您的心境良好，愿您继续保持目前的良好的心情。',//建议
  },
  //返回主页
  backIndex: function () {
    var that = this;
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.resturn(); // 执行前一个页面的onLoad方法
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var fraction = parseInt(options.fraction);
    var s_image='';
    var proposal = '';
    if (fraction<9){
      s_image ="../../images/s_2.png"
      proposal ="您的心境良好，愿您继续保持目前的良好的心情。"
    } else if (9 <= fraction && fraction <13){
      s_image = "../../images/s_3.png"
      proposal = "您有轻微抑郁倾向，需及时调整心态，寻找更多来自自我、家人、朋友的心理支持与帮助。"
    } else if (13 <= fraction){
      s_image = "../../images/s_1.png"
      proposal = "建议您及时寻求专业机构帮助自己，听取心理医生或者心理咨询师的专业建议，抑郁症是可以得到治愈的和缓解的，为您加油！"
    }
    _that.setData({
      s_image: s_image,
      proposal: proposal,
      fraction: fraction,
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
    
  }
})