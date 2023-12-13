const list = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
]

const newList = list.map(item => {
  if (item.id === 1) {
    return {
      ...item,
      name: 'cccc',
    }
  }
  return item
})

console.log('newList:', newList)
console.log('list:', list)
