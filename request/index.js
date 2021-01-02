// 同时发送异步代码的次数
let ajaxTimes=0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true,
    });
      
    // url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' 
    const baseUrl='https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((reslove, reject) => {
        wx.request({
            ...params,
            url: baseUrl+params.url,
            success: (result) => {
                reslove(result.data.message)
            },
            fail: (error) => {
                reject(error)
            },
            complete:()=>{
             ajaxTimes--;
             if(ajaxTimes===0){
                wx.hideLoading();
             }
            }
        });
    })
}