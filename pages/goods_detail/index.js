// pages/goods_detail/index.js
/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage 
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */ 
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailList:[] 
  },

  goodsDetailList:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsDetailList = await request({url:'/goods/detail',data:{goods_id}})
    this.goodsDetailList = goodsDetailList
    this.setData({
      goodsDetailList:{
        goods_name:goodsDetailList.goods_name,
        goods_price:goodsDetailList.goods_price,
        // iphone部分手机 不识别webp 图片格式
        goods_introduce:goodsDetailList.goods_introduce,
          // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        // goods_introduce: goodsDetailList.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics:goodsDetailList.pics
      }
    })  
    console.log(goodsDetailList)
  },
  // 点击轮播图放大预览
  handelImagePreview(e){
    const urls = this.goodsDetailList.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    console.log(urls,current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  handelCartAdd(){
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(v=>v.goods_id===this.goodsDetailList.goods_id)
    if(index===-1){
      //不存在，第一次添加
      this.goodsDetailList.num=1
      cart.push(this.goodsDetailList)
    }else{
       cart[index].num++;

    }
    wx.setStorageSync("cart",cart)
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
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