var baseUrl = 'https://www.antleague.com/'
//获取应用实例
const app = getApp()
var iurl;
var imgList
var currentHatImgurl
var bigImgUrl
var currentHatPath
let list
Page({
  data: {
    base_img_url: baseUrl + 'pendant/',
    bgPic: null,
    currentHatId: 1,

    hatCenterX: wx.getSystemInfoSync().windowWidth / 2,
    hatCenterY: 250 - 100,
    cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
    cancelCenterY: 100,
    handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
    handleCenterY: 200,

    hatSize: 100,

    scale: 1,
    rotate: 0,
    is_sticker: true,
  },
  onLoad(options) {
    var that = this

    console.log(options.bigImgUrl)
    bigImgUrl = options.bigImgUrl
    //bigImgUrl = 'https://www.antleague.com/heads/qinglv_detail_41_3_17.jpg'
    wx.getImageInfo({
      src: bigImgUrl,
      success: function(res) {
        console.log('res path---' + res.path)
        that.setData({
          bgPic: res.path,
          is_sticker: true
        })
      }
    })

    let url = baseUrl + 'querypandents'
    wx.request({
      url: url,
      data: {},
      method: 'POST',
      success: function(result) {
        console.log(result.data.data)
        if (list == null) {
          list = result.data.data
        } else {
          list = list.concat(result.data.data)
        }

        that.setData({
          pendantlist: list,
          current_hat_img: that.data.base_img_url + list[0].pen_img_url
        })
        console.log(list)
        wx.getImageInfo({
          src: that.data.base_img_url + list[0].pen_img_url,
          success: function (res) {
            currentHatPath = res.path
          }
        })

      }
    })

  },

  onReady() {
    this.hat_center_x = this.data.hatCenterX;
    this.hat_center_y = this.data.hatCenterY;
    this.cancel_center_x = this.data.cancelCenterX;
    this.cancel_center_y = this.data.cancelCenterY;
    this.handle_center_x = this.data.handleCenterX;
    this.handle_center_y = this.data.handleCenterY;

    this.scale = this.data.scale;
    this.rotate = this.data.rotate;

    this.touch_target = "";
    this.start_x = 0;
    this.start_y = 0;
  },
  touchStart(e) {
    if (e.target.id == "hat") {
      this.touch_target = "hat";
    } else if (e.target.id == "handle") {
      this.touch_target = "handle"
    } else {
      this.touch_target = ""
    };

    if (this.touch_target != "") {
      this.start_x = e.touches[0].clientX;
      this.start_y = e.touches[0].clientY;
    }
  },
  touchEnd(e) {

    console.log('touchEnd');

    this.hat_center_x = this.data.hatCenterX;
    this.hat_center_y = this.data.hatCenterY;
    this.cancel_center_x = this.data.cancelCenterX;
    this.cancel_center_y = this.data.cancelCenterY;
    this.handle_center_x = this.data.handleCenterX;
    this.handle_center_y = this.data.handleCenterY;
    // }
    this.touch_target = "";
    this.scale = this.data.scale;
    this.rotate = this.data.rotate;
  },
  touchMove(e) {
    var current_x = e.touches[0].clientX;
    var current_y = e.touches[0].clientY;
    var moved_x = current_x - this.start_x;
    var moved_y = current_y - this.start_y;

    //console.log('mx--->' + moved_x + '--->my--->' + moved_y)

    if (this.touch_target == "hat") {
      var tempX = (parseInt(this.data.cancelCenterX) + parseInt(moved_x))
      var tempY = (parseInt(this.data.cancelCenterY) + parseInt(moved_y))
      console.log(tempX)
      if (tempX < 40 || tempX > 270 || tempY < 30|| tempY > 227) {
        return;
      }
      this.setData({
        hatCenterX: this.data.hatCenterX + moved_x,
        hatCenterY: this.data.hatCenterY + moved_y,
        cancelCenterX: this.data.cancelCenterX + moved_x,
        cancelCenterY: this.data.cancelCenterY + moved_y,
        handleCenterX: this.data.handleCenterX + moved_x,
        handleCenterY: this.data.handleCenterY + moved_y
      })
    };
    if (this.touch_target == "handle") {
      this.setData({
        handleCenterX: this.data.handleCenterX + moved_x,
        handleCenterY: this.data.handleCenterY + moved_y,
        cancelCenterX: 2 * this.data.hatCenterX - this.data.handleCenterX - 5,
        cancelCenterY: 2 * this.data.hatCenterY - this.data.handleCenterY - 2
      });
      let diff_x_before = this.handle_center_x - this.hat_center_x;
      let diff_y_before = this.handle_center_y - this.hat_center_y;
      let diff_x_after = this.data.handleCenterX - this.hat_center_x;
      let diff_y_after = this.data.handleCenterY - this.hat_center_y;
      let distance_before = Math.sqrt(diff_x_before * diff_x_before + diff_y_before * diff_y_before);
      let distance_after = Math.sqrt(diff_x_after * diff_x_after + diff_y_after * diff_y_after);
      let angle_before = Math.atan2(diff_y_before, diff_x_before) / Math.PI * 180;
      let angle_after = Math.atan2(diff_y_after, diff_x_after) / Math.PI * 180;
      this.setData({
        scale: distance_after / distance_before * this.scale,
        rotate: angle_after - angle_before + this.rotate,
      })
    }
    this.start_x = current_x;
    this.start_y = current_y;
  },

  backPage: function(e) {
    wx.navigateBack()
  },

  chooseImg(e) {
    console.log(e);
    var hindex = e.target.dataset.hatId
    this.data.currentHatId = hindex
    this.setData({
      is_sticker: true,
      current_hat_img: imgList[hindex].ico
    })

    currentHatImgurl = this.data.current_hat_img

    if (currentHatImgurl != null && currentHatImgurl.indexOf('https') == -1) {
      currentHatImgurl = currentHatImgurl.replace('http', 'https');
    }

    var that = this
    wx.getImageInfo({
      src: currentHatImgurl,
      success: function(res) {
        app.globalData.hatImgPath = res.path
        currentHatPath = res.path
      }
    })

  },
  combinePic() {
    console.log('currentHatPath--->' + currentHatPath)
    app.globalData.scale = this.scale;
    app.globalData.rotate = this.rotate;
    app.globalData.hat_center_x = this.hat_center_x;
    app.globalData.hat_center_y = this.hat_center_y;
    app.globalData.currentHatId = this.data.currentHatId;
    wx.navigateTo({
      url: '../combine/combine?hindex=' + this.data.currentHatId + '&bigImgUrl=' + bigImgUrl + '&currentHatPath=' + currentHatPath
    })
  },
  deletesticker: function(e) {
    this.setData({
      is_sticker: false
    })
  }
})