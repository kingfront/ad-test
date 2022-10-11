import { format, addDays, parse, endOfDay, getISOWeek } from 'date-fns'
import store from './store'

const currentYear = new Date().getFullYear()
const weekOfYear = getISOWeek(new Date())

const TASKS_KEY = `Tasks-${currentYear}-${weekOfYear}`

const loadTasks = async () => {
  try {
    const res0 = await store.get(TASKS_KEY)
    const _res0 = res0 && JSON.parse(res0)
    let ret
    if (!_res0 || _res0.length === 0) {
      ret = _generateTasks()
      store.set(TASKS_KEY, ret)
    } else {
      ret = _renewTask()
    }
    return ret
  } catch (error) {
    console.log('loadTasks fail', error)
  }
}

const _renewTask = async () => {
  const today = new Date()

  try {
    const res0 = await store.get(TASKS_KEY)
    const arr = JSON.parse(res0)
    const arr1 = arr.map((i) => {
      const _date = endOfDay(parse(i.date, 'yyyy-MM-dd', new Date()))
      if (_date < today) {
        return { date: i.date, status: i.status === 'claimable' ? 'expired' : i.status }
      } else {
        return i
      }
    })
    store.set(TASKS_KEY, arr1)
    return arr1
  } catch (error) {
    console.log('error', error)
  }
}

function _generateTasks() {
  const arr = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = format(addDays(today, i), 'yyyy-MM-dd')
    arr.push({ date, status: 'claimable' })
  }
  return arr
}

export { loadTasks, TASKS_KEY }
