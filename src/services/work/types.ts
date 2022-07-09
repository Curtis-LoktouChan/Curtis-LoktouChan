interface IWorkListItem {
  id: number
  CreatedAt: string
  UpdatedAt: string
  projectName: string
}

export interface IWorkListResponse {
  workList: IWorkListItem[]
}

//下载作品请求
export interface downloadWorkReq {
  projectName: string
}
//下载作品
export interface downloadWorkRes extends Blob {
  name?: string
  url?: string
}
//删除作品请求
export interface deleteWorkReq {
  projectName: string
}
