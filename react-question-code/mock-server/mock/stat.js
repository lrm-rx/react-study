const getStatList = require('./data/getStatList');

module.exports = [
    {
        // 答卷列表
        url: '/api/stat/:questionId',
        method: 'get',
        response() {
            return {
                code: 200,
                data: {
                    list: getStatList(),
                    total: 100
                }
            }
        }
    },
    {
        // 获取单个组件的统计数据汇总
        url: '/api/stat/:questionId/:componentId',
        method: 'get',
        response() {
            return {
                code: 200,
                data: {
                    stat: [
                        {name: '选项1', count: 100},
                        {name: '选项2', count: 60},
                        {name: '选项3', count: 160},
                    ]
                }
            }
        }
    }
]
 