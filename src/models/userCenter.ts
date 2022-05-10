import { Effect, Reducer } from 'umi'

interface IUserCenterModelState {
  className: string
  classBrief: string
  invitePwd: string
  adaptiveLearningSubject: string | undefined
  classID: number | null
}

interface IUserCenterModel {
  namespace: 'userCenter'
  state: IUserCenterModelState
  effects: {
    saveClassInfoEffect: Effect
  }
  reducers: {
    saveClassInfo: Reducer<IUserCenterModelState>
  }
}

const userCenterMode: IUserCenterModel = {
  namespace: 'userCenter',
  state: {
    className: '',
    classBrief: '',
    invitePwd: '',
    adaptiveLearningSubject: '',
    classID: null
  },
  effects: {
    *saveClassInfoEffect({ payload }, { put }) {
      yield put({
        type: 'saveClassInfo',
        payload
      })
    }
  },
  reducers: {
    saveClassInfo(_, { payload }) {
      return {
        ...payload
      }
    }
  }
}

export default userCenterMode
