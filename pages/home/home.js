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
    base_img_url: baseUrl + 'heads/',
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    type_top_list: [{
        type_img_url: '../../images/d1.png',
        text:'情侣头像'
      },
      {
        type_img_url: '../../images/d2.png',
        text: '男生头像'
      },
      {
        type_img_url: '../../images/d3.png',
        text: '女生头像'
      },
      {
        type_img_url: '../../images/d4.png',
        text: '动漫头像'
      },
      {
        type_img_url: '../../images/d8.png',
        text: '更多头像'
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    random_index = Math.floor(Math.random() * 60);
    console.log('random_index--->' + random_index)
    current_page = random_index;
    this.loadDataByPage();
  },

  loadDataByPage:function(){
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
        if(list == null){
          list = result.data.data
        }else{
          list = list.concat(result.data.data)
        }
        that.setData({
          hotList: list
        })
      }
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})