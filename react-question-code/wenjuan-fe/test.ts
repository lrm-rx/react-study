interface IPerson {
  name: string
  age: number
  sex?: string
  show(): void
}
interface IMusic {
  music: string
}
class Person implements IPerson, IMusic {
  name = '许嵩'
  age = 20
  sex = '男'
  music = '庐州月'
  show() {
    console.log(`我是${this.name}，今年${this.age}岁了，我唱过${this.music}`)
  }
}
const a = new Person()
a.show()

interface Ipon extends Person {
  aaa: string
}
class IPon extends Person implements IPon {
  aaa = '周杰伦'
}
const b = new IPon()
console.log(b.aaa)
