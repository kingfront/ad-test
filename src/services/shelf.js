const SHELF = 'SHELF'

const shelf = {
  async getList() {
    return await this._shelf()
  },
  async add(book) {
    const isOnShelf = await this.isOnShelf(book)
    if (isOnShelf) return true
    const list = await this._shelf()
    return this._persist([book, ...list])
  },
  async remove(book) {
    const list = await this._shelf()
    const list1 = list.filter((i) => i.bookId !== book.bookId)
    return this._persist(list1)
  },
  async isOnShelf(book) {
    const list = await this._shelf()
    const res0 = list.find((i) => i.bookId === book.bookId)
    return !!list.find((i) => i.bookId === book.bookId)
  },
  async _shelf() {
    const list = await store2.get(SHELF)
    return list !== '' ? JSON.parse(list) : []
  },
  async _persist(data) {
    const res0 = store2.set(SHELF, data)
    console.log('res0', res0)
    return res0
  },
}

export default shelf
