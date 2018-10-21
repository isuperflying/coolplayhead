// pages/combine/combine.js
const app = getApp();
var currentHatId
var currentHatImg
var bigImgUrl
var drawBigPath
Page({

  data: {

  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '头像保存',
    })
    bigImgUrl = options.bigImgUrl
    currentHatId = options.hindex;
    currentHatImg = options.currentHatPath
    console.log('currentHatImg--->' + currentHatImg)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    var that = this
    wx.getImageInfo({
      src: bigImgUrl,
      success: res => {
        drawBigPath = res.path
        that.draw();
      }
    })
  },
  backPage: function(e) {
    wx.navigateBack()
  },
  draw() {
    let scale = app.globalData.scale;
    let rotate = app.globalData.rotate;
    let hat_center_x = app.globalData.hat_center_x;
    let hat_center_y = app.globalData.hat_center_y - 40;
    let currentHatId = app.globalData.currentHatId;
    const pc = wx.createCanvasContext('myCanvas');
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const hat_size = 100 * scale;

    pc.clearRect(0, 0, windowWidth, 300);
    pc.drawImage(drawBigPath, windowWidth / 2 - 150, 0, 300, 300);
    pc.translate(hat_center_x, hat_center_y);
    pc.rotate(rotate * Math.PI / 180);
    pc.drawImage(currentHatImg, -hat_size / 2, -hat_size / 2, hat_size, hat_size);
    pc.draw();
  },
  preimage: function(e) {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    wx.showLoading({
      title: '预览中',
    })
    wx.canvasToTempFilePath({
      x: windowWidth / 2 - 150,
      y: 0,
      height: 300,
      width: 300,
      canvasId: 'myCanvas',
      success: (res) => {
        wx.hideLoading()
        var filePath = res.tempFilePath
        wx.previewImage({
          urls: [filePath],
          current: filePath
        })
      },
      fail: function(e) {
        wx.hideLoading()
      }
    });
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
              that.savePic();
            }
          })
        } else {
          console.log('已经有授权--->')
          that.savePic();
        }
      }
    })
  },
  
  savePic() {
    let that = this
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    wx.canvasToTempFilePath({
      x: windowWidth / 2 - 150,
      y: 0,
      height: 300,
      width: 300,
      canvasId: 'myCanvas',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '图片已保存',
            })
            console.log("success:" + res);
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
      }
    });
  },

  toHome: function (e) {
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