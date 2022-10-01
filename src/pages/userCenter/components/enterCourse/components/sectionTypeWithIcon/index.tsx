import { FC } from 'react'

import { PPTIcon, TextIcon, VideoIcon, ExamIcon } from '../icons'

const sectionTypeWithIconPair = [
  ['文本', TextIcon],
  ['课件', PPTIcon],
  ['视频', VideoIcon],
  ['试题', ExamIcon]
]

interface ITypeKeyValue {
  [properName: string]: FC
}

const typeKeyValue: ITypeKeyValue = {}
for (let pair of sectionTypeWithIconPair) {
  typeKeyValue[pair[0] as string] = pair[1] as FC
}

export { sectionTypeWithIconPair, typeKeyValue }
