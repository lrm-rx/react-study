import Mock from 'mockjs'
Mock.mock('/api/text', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `小明 ${Date.now()}`,
    },
  }
})
