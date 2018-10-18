var baseUrl = 'https://www.antleague.com/'
let current_page = 1
let start_index = 0
let current_index = 0
let list
let tid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'heads/',
    indicatorDots: false,
    autoplay: false,
    is_show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tid = options.tid
    wx.setNavigationBarTitle({
      title: '趣玩头像',
    })
    console.log('onLoad--->')
    current_page = parseInt(options.qpage);
    console.log('show current page--->' + current_page);
    start_index = options.cindex
    console.log('show current start_index--->' + start_index);
    let that = this
    wx.getStorage({
      key: 'is_show',
      success: function (res) {
        that.setData({
          is_show : false
        })
      },
      fail:function(e){
        wx.setStorage({
          key: 'is_show',
          data: true,
        })
      }
    })
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
        console.log(result.data.data)
        if (list == null) {
          list = result.data.data
          list = list.slice(start_index,list.length)
        } else {
          list = list.concat(result.data.data)
        }
        that.setData({
          headList: list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    list = null
    this.loadDataByPage();
  },

  bindChange: function (e) {
    current_index = e.detail.current
  },

  saveImg: function (e) {
    var that = this
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log('没有授权--->')
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功')
              that.downimage();
            }
          })
        } else {
          console.log('已经有授权--->')
          that.downimage();
        }
      }
    })
  },

  downimage: function () {
    var downUrl = this.data.base_img_url +  this.data.headList[current_index].head_url

    if (downUrl != null && downUrl.indexOf('https') == -1) {
      downUrl = downUrl.replace('http', 'https');
    }

    console.log('downUrl---' + downUrl)

    //文件下载
    wx.downloadFile({
      url: downUrl,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            console.log("save success--->" + data);
            wx.showToast({
              title: '图片已保存',
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              console.log('打开设置窗口')
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  
  imageedit: function (e) {
    var url = this.data.base_img_url + this.data.headList[current_index].head_url
    
    if (url != null && url.indexOf('https') == -1) {
      url = url.replace('http', 'https');
    }
    console.log('edit url---' + url)
    wx.navigateTo({
      url: '../imageeditor/imageeditor?bigImgUrl=' + url,
    })
  },

  toHome:function(e){
    wx.navigateBack({
      delta: 3
    })
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