import { Effect, Reducer } from 'umi'
import { ISubmitAnswer, IKnowledgeList, IExamList } from '@/services/adaptiveLearning/types'

interface IAdaptiveLearningModelState {
  isLearn: boolean
  isFinish: boolean
  isTesting: boolean
  presentTime: number | null
  startTime: number | null
  answerList: ISubmitAnswer[]
  knowledgeList: IKnowledgeList[]
  examList: IExamList[]
}

interface IUserModel {
  namespace: 'adaptiveLearning'
  state: IAdaptiveLearningModelState
  effects: {
    setTestingStateEffect: Effect
    setPresentTimeEffect: Effect
    setExamListEffect: Effect
    setKnowledgeListEffect: Effect
    setAnswerListEffect: Effect
    setKnowledgeNameEffect: Effect
    setStartTimeEffect: Effect
  }
  reducers: {
    setIsTesting: Reducer<IAdaptiveLearningModelState>
    setPresentTime: Reducer<IAdaptiveLearningModelState>
    setExamList: Reducer<IAdaptiveLearningModelState>
    setKnowledgeList: Reducer<IAdaptiveLearningModelState>
    setAnswerList: Reducer<IAdaptiveLearningModelState>
    setKnowledgeName: Reducer<IAdaptiveLearningModelState>
    setStartTime: Reducer<IAdaptiveLearningModelState>
  }
}

const adaptiveLearningModel: IUserModel = {
  namespace: 'adaptiveLearning',
  state: {
    isLearn: false,
    isFinish: false,
    presentTime: null,
    isTesting: false,
    startTime: null,
    examList: [],
    answerList: [],
    knowledgeList: []
  },
  effects: {
    *setTestingStateEffect({ payload }, { put }) {
      yield put({
        type: 'setIsTesting',
        payload
      })
    },
    *setPresentTimeEffect({ payload }, { put }) {
      yield put({
        type: 'setPresentTime',
        payload
      })
    },
    *setExamListEffect({ payload }, { put }) {
      yield put({
        type: 'setExamList',
        payload
      })
    },
    *setKnowledgeListEffect({ payload }, { put }) {
      yield put({
        type: 'setKnowledgeList',
        payload
      })
    },
    *setAnswerListEffect({ payload }, { put }) {
      yield put({
        type: 'setAnswerList',
        payload
      })
    },
    *setKnowledgeNameEffect({ payload }, { put }) {
      yield put({
        type: 'setKnowledgeName',
        payload
      })
    },
    *setStartTimeEffect({ payload }, { put }) {
      yield put({
        type: 'setStartTime',
        payload
      })
    }
  },
  reducers: {
    setIsTesting(state, { payload }) {
      return {
        ...state!,
        isTesting: payload.isTesting
      }
    },
    setPresentTime(state) {
      return {
        ...state!,
        presentTime: new Date().getTime()
      }
    },
    setExamList(state, { payload }) {
      return {
        ...state!,
        examList: payload.examList
      }
    },
    setKnowledgeList(state, { payload }) {
      return {
        ...state!,
        knowledgeList: payload.knowledgeList,
        isLearn: true
      }
    },
    setAnswerList(state, { payload }) {
      return {
        ...state!,
        answerList: payload.answerList
      }
    },
    setKnowledgeName(state, { payload }) {
      return {
        ...state!,
        knowledgeName: payload.knowledgeName
      }
    },
    setStartTime(state, { payload }) {
      return {
        ...state!,
        startTime: payload.startTime
      }
    }
  }
}

export default adaptiveLearningModel
