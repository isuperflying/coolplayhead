var baseUrl = 'https://www.antleague.com/'
let current_page = 1
let page_size = 20
let list
let tid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'heads/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tid = options.tid
    wx.setNavigationBarTitle({
      title: '头像小情侣',
    })
  },

  onShow:function(e){
    list = null
    current_page = 1
    this.loadDataByPage();
  },
  loadDataByPage: function () {
    var that = this
    let url = baseUrl + 'queryheadsbytype'
    wx.request({
      url: url,
      data: {
        'page': current_page,
        'typeid': tid
      },
      method: 'POST',
      success: function (result) {
        wx.stopPullDownRefresh();
        console.log(result.data.data)
        if (list == null) {
          list = result.data.data
        } else {
          list = list.concat(result.data.data)
        }
        that.setData({
          hotList: list
        })
      },
      fail: function (e) {
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    list = null
    current_page = 1
    this.loadDataByPage()
  },

  imagedetail: function (e) {
    let index = e.currentTarget.dataset.index
    console.log('index--->' + index)

    let add_page = 1
    let click_index = 0;
    if (index % page_size == 0) {
      add_page = index / page_size
      click_index = 0
    } else {
      add_page = parseInt(index / page_size)
      click_index = index % page_size
    }
    console.log('add_page--->' + add_page)
    let query_page = add_page + 1
    wx.navigateTo({
      url: '/pages/headshow/headshow?qpage=' + query_page + '&cindex=' + click_index + '&tid=' + tid,
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    current_page++;
    this.loadDataByPage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "@你要个性，就是现在，快换个炫酷图像吧!",
      path: '/pages/home/home'
    }
  }
})