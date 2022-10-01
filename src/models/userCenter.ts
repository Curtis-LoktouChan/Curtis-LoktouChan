import { Effect, Reducer } from 'umi'

//
interface IUserCenterModelState {
  className: string
  classBrief: string
  invitePwd: string
  adaptiveLearningSubject: string | undefined
  classID: number | null
  courseID: number | null
  courseTitle: string
  courseIntro: string
}

interface IUserCenterModel {
  namespace: 'userCenter'
  state: IUserCenterModelState
  effects: {
    saveClassInfoEffect: Effect
    saveCourseInfoEffect: Effect
  }
  reducers: {
    saveClassInfo: Reducer<IUserCenterModelState>
    saveCourseInfo: Reducer<IUserCenterModelState>
  }
}

const userCenterMode: IUserCenterModel = {
  namespace: 'userCenter',
  state: {
    className: '',
    classBrief: '',
    invitePwd: '',
    adaptiveLearningSubject: '',
    classID: null,
    courseID: null,
    courseTitle: '',
    courseIntro: ''
  },
  effects: {
    *saveClassInfoEffect({ payload }, { put }) {
      yield put({
        type: 'saveClassInfo',
        payload
      })
    },
    *saveCourseInfoEffect({ payload }, { put }) {
      yield put({
        type: 'saveCourseInfo',
        payload
      })
    }
  },
  reducers: {
    saveClassInfo(_, { payload }) {
      const _state = JSON.parse(JSON.stringify(_))
      _state.classID = payload.classID
      return {
        ..._state
      }
    },
    saveCourseInfo(_, { payload }) {
      console.log('222', payload)
      return {
        ...payload
      }
    }
  }
}

export default userCenterMode
