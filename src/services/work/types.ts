interface IWorkObjectType {
  work: string
  name: string
  id: string
}

export type IWorkResponse = Array<IWorkObjectType>
