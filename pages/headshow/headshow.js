var baseUrl = 'https://www.antleague.com/'
let current_page = 0
let start_index = 0
let list
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'heads/',
    indicatorDots: false,
    autoplay: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad--->')
    current_page = options.qpage;
    console.log('show current page--->' + current_page);
    start_index = options.cindex
    console.log('show current start_index--->' + start_index);
  },
  
  loadDataByPage: function () {
    var that = this
    let url = baseUrl + 'queryheads'
    wx.request({
      url: url,
      data: {
        'page': current_page
      },
      method: 'POST',
      success: function (result) {
        console.log(result.data.data)
        if (list == null) {
          console.log('111111111111111111')
          list = result.data.data
          list = list.slice(start_index,list.length)
        } else {
          console.log('222222222222222222222')
          list = list.concat(result.data.data)
        }
        that.setData({
          headList: list
        })
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
    list = null
    this.loadDataByPage();
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