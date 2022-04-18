interface IWorkListItem {
  id: number
  CreatedAt: string
  UpdatedAt: string
  projectName: string
}

export interface IWorkListResponse {
  workList: IWorkListItem[]
}
