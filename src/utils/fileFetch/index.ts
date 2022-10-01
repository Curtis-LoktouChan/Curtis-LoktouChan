/*
  定义了课件小节获取和下载课件的方法，
  临时使用，重构代码时在响应拦截器作处理，
  文件名保存在响应头Content-Disposition字段中，
  如何修改拦截器与Fetch API有关
*/

async function getFileFromServer(urlWithQuery: string) {
  const response = await fetch(urlWithQuery, {
    headers: { Authorization: localStorage.getItem('login_token')! }
  })
  const headContentDisposition = response.headers.get('Content-Disposition') // 文件名保存在请求头Content-Disposition中
  const equalIndex = headContentDisposition?.indexOf('=')
  const fileName = headContentDisposition?.slice(equalIndex, headContentDisposition.length) // 截取文件名
  const fileBlob = await response.blob() // 转换成Blob对象
  return {
    fileBlob,
    fileName
  }
}

function downloadFileFromBlob(fileBlob: Blob, fileName: string) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = URL.createObjectURL(fileBlob)
  link.click()
  link.remove()
  URL.revokeObjectURL(link.href) // 移出链接避免占用内存
}

export { getFileFromServer, downloadFileFromBlob }
