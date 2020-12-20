export const request = (params) => {
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
        });
    })
}