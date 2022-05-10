export interface ICaseShowRequest {
  searchCase?: string
  pageSize?: number
  pageNumber?: number
  myCase?: string
}

interface ICaseShowData {
  ID: string
  caseTitle: string
  caseDiscription?: string
  author: string
  created_at: string
}

export interface ICaseShowResponse {
  case: ICaseShowData[]
  total: number
  hasmore: boolean
}
