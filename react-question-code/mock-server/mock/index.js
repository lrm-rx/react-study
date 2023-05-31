const test = require('./test');
const user = require('./user');
const question = require('./question');
const stat = require('./stat');
const answer = require('./answer');

const mockList = [
    ...test,
    ...user,
    ...question,
    ...stat,
    ...answer
]

module.exports = mockList;