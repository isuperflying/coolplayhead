var baseUrl = 'https://www.antleague.com/'
let current_page = 1
let page_size = 20
let random_index
let list
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_app_id: 'wxea1ee90fb7d7797a',
    is_nav: true,
    isUse: true,
    base_img_url: baseUrl + 'heads/',
    imgUrls: [
      {
        banner_url: '../../images/banner1.png',
        tid:1
      },
      {
        banner_url: '../../images/banner2.png',
        tid: 5
      }
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    type_top_list: [{
      type_img_url: baseUrl + 'pendant/d1.png',
        text:'情侣头像',
        tid:1
      },
      {
        type_img_url: baseUrl + 'pendant/d2.png',
        text: '男生头像',
        tid: 3
      },
      {
        type_img_url: baseUrl + 'pendant/d3.png',
        text: '女生头像',
        tid: 2
      },
      {
        type_img_url: baseUrl + 'pendant/d4.png',
        text: '动漫头像',
        tid: 5
      },
      {
        type_img_url: baseUrl + 'pendant/d5.png',
        text: '更多头像',
        tid: 0
      }
    ],
    type_bottom_list:[
      {
        type_img_url: '../../images/d5.png',
        text: '微信头像'
      },
      {
        type_img_url: '../../images/d6.png',
        text: '可爱头像'
      },
      {
        type_img_url: '../../images/d7.png',
        text: '精选头像'
      },
      {
        type_img_url: '../../images/d8.png',
        text: '更多头像'
      }
    ]
  },

  newApp: function (e) {
    if (this.data.isUse){
      return;
    }
    var that = this
    wx.navigateToMiniProgram({
      appId: that.data.new_app_id
    })
  },

  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '头像小情侣',
    })
    random_index = Math.floor(Math.random() * 60);
    console.log('random_index--->' + random_index)
    current_page = random_index;

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('sdk version--->' + res.SDKVersion)
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
    })

    this.loadDataByPage();
  },

  loadDataByPage:function(){
    var that = this
    let url = baseUrl + 'queryheadsbytype'
    wx.request({
      url: url,
      data: {
        'page': current_page,
        'typeid':1
      },
      method: 'POST',
      success: function (result) {
        wx.stopPullDownRefresh();
        console.log(result.data.data)
        if(list == null){
          list = result.data.data
        }else{
          list = list.concat(result.data.data)
        }
        that.setData({
          hotList: list
        })
      },
      fail:function(e){
        wx.stopPullDownRefresh();
      }
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    list = null
    random_index = Math.floor(Math.random() * 60);
    console.log('random_index--->' + random_index)
    current_page = random_index;
    this.loadDataByPage()
  },

  imagedetail:function(e){
    let index = e.currentTarget.dataset.index
    console.log('index--->' + index)

    let add_page = 0
    let click_index = 0;
    if (index % page_size == 0){
      add_page = index / page_size
      click_index = 0
    }else{
      add_page = parseInt(index/page_size)
      click_index = index % page_size
    }

    let query_page = random_index + add_page
    wx.navigateTo({
      url: '/pages/headshow/headshow?qpage='+query_page + '&cindex='+click_index,
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    current_page++;
    this.loadDataByPage();
  },

  banner:function(e){
    let tid = e.currentTarget.dataset.tid
    console.log('tid--->' + tid)
    wx.navigateTo({
      url: '../category/category?tid=' + tid,
    })
  },  
  category:function(e){
    let tid = e.currentTarget.dataset.tid
    console.log('tid--->' + tid)
    wx.navigateTo({
      url: '../category/category?tid=' + tid,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "@你要个性，就是现在，快换个炫酷图像吧!",
      path: '/pages/home/home'
    }
  }
})