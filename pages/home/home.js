// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg',
    ],
    indicatorDots: false,
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
    ],
    hotList:[
      {img_url:'../../images/mn/1.jpeg'},
      { img_url: '../../images/mn/2.jpeg' },
      { img_url: '../../images/mn/3.jpeg' },
      { img_url: '../../images/mn/4.jpeg' },
      { img_url: '../../images/mn/5.jpeg' },
      { img_url: '../../images/mn/6.jpeg' },
      { img_url: '../../images/mn/7.jpeg' },
      { img_url: '../../images/mn/8.jpeg' },
      { img_url: '../../images/mn/9.jpeg' },
      { img_url: '../../images/mn/10.jpeg' },
      { img_url: '../../images/mn/11.jpeg' },
      { img_url: '../../images/mn/12.jpeg' },
      { img_url: '../../images/mn/13.jpeg' },
      { img_url: '../../images/mn/14.jpeg' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})