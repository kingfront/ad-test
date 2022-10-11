import store2 from '../utils/store'
import { format } from 'date-fns'

const todayStr = format(new Date(), 'yyyy-MM-dd')

async function addBalance(amount = 0, description = '领取红包') {
  const Balance = await store2.get('Balance')
  await store2.set('Balance', +Balance + amount)

  const BalancesList = await store2.get('BalancesList')
  await store2.set('BalancesList', [{ text: description, amount, date: todayStr }, ...JSON.parse(BalancesList || '[]')])
}

export { addBalance }
