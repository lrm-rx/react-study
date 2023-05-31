const Mock = require('mockjs');
const getQuestionList = require('./data/getQuestionList');
const getComponentList = require('./data/getComponentList');

const Random = Mock.Random;

module.exports = [
    {
        // 获取单个问卷信息
        url: '/api/question/:id',
        method: 'get',
        response() {
            return {
                code: 200,
                data: {
                    id: Random.id(),
                    title: Random.title(),
                    desc: '问卷描述',
                    js: '',
                    css: '',
                    isDeleted: false,
                    isPublished: true,
                    componentList: getComponentList()
                }
            }
        }
    },
    {
        // 创建问卷
        url: '/api/question',
        method: 'post',
        response() {
            return {
                code: 200,
                data: {
                    id: Random.id()
                }
            }
        }
    },
    {
        //  获取(查询)问卷列表 
        url: '/api/question',
        method: 'get',
        response(ctx) {
            const {url='', query={}} = ctx;
            const isDeleted = url.indexOf('isDeleted=true') >= 0;
            const isStar = url.indexOf('isStar=true') >= 0;
            const pageSize = parseInt(query.pageSize) || 10;

            return {
                code: 200,
                data: {
                    list: getQuestionList({len: pageSize, isDeleted, isStar}), // 当前页
                    total: 100 // 总数
                }
            }
        }
    },
    {
        // 更新问卷
        url: '/api/question/:id',
        method: 'patch',
        response() {
            return {
                code: 200
            }
        }
    },
    {
        // 复制问卷
        url: '/api/question/duplicate/:id',
        method: 'post',
        response() {
            return {
                code: 200,
                data: {
                    id: Random.id()
                }
            }
        }
    },
    {
        // 批量删除
        url: '/api/question',
        method: 'delete',
        response() {
            return {
                code: 200
            }
        }
    }
]