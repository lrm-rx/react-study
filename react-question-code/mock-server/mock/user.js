const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = [
    {
        // 获取用户信息
        url: '/api/user/info',
        method: 'get',
        response() {
            return {
                code: 200,
                data: {
                    username: Random.title(),
                    nickname: Random.cname()
                }
            }
        }
    },
    {
        // 注册
        url: '/api/user/register',
        method: 'post',
        response() {
            return {
                code: 200
            }
        }
    },
    {
        // 登录
        url: '/api/user/login',
        method: 'post',
        response() {
            return {
                code: 200,
                data: {
                    token: Random.word(20)
                }
            }
        }
    }
]