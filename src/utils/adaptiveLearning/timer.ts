export default function useTime(startTime: number | null | undefined, presentTime: number) {
  if (!startTime) return
  const totalTime = Math.floor(presentTime - startTime) / 1000 // 总时长
  if (totalTime < 0) return '00:00' // 初始值
  const hours = Math.floor(totalTime / (60 * 60)) // 小时数
  let minutes: number | string = Math.floor((totalTime - hours * 60 * 60) / 60) // 分钟数
  let seconds: number | string = Math.floor(totalTime - (hours * 60 * 60 + minutes * 60)) // 秒数
  if (minutes >= 0 && minutes < 10) minutes = '0' + minutes
  if (seconds >= 0 && seconds < 10) seconds = '0' + seconds
  // return (hours > 0 ? hours + ':' : '') + minutes + ':' + seconds
  return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds}`
}
