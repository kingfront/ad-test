import { cleanObj } from '../utils/object'
import request from '../cmps/em-request/index'
const { get } = request

async function getTaskConfig() {
  try {
    const { data: serverTaskConfig } = await get('/task-conf', {})
    const taskConfig = cleanObj(serverTaskConfig)
    // console.log('taskConfig', JSON.stringify(taskConfig, null, 2))

    return taskConfig
  } catch (error) {
    console.log('getTaskConfig error', error)
    throw new Error(error.message)
  }
}

export { getTaskConfig }
