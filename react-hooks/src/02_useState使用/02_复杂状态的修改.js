import React, {useState} from 'react'

export default function ComplexHookState() {
  const [friends, setFriends] = useState(["ming", "uzi"])
  const [people, setPeople] = useState({id: 1, name: "rookie", age: 25})
  const [students, setStudents] = useState([
    {id: 100, name: "theshy", age: 21},
    {id: 101, name: "wei", age: 22},
    {id: 102, name: "xiaohu", age: 23},
    {id: 103, name: "lwx", age: 24},
    {id: 104, name: "baolan", age: 25}
  ])

  function addFriend(e) {
    console.log(e);
    // friends.push("letme"); // 不生效
    const friend = [...friends, "letme"]
    setFriends(friend);
  }

  function chageStudentAge(id) {
    const newStudents = [...students]; // 浅拷贝
    newStudents.find(item => item.id === id).age += 1;
    setStudents(newStudents)
  }
  return (
    <div>
      <h2>我的好友</h2>
      <ul>
        {friends.map((item,index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
      <button onClick={e => setFriends([...friends, "xiaohu"])}>添加好友1</button>
      <button onClick={e => addFriend(e)}>添加好友2</button>
      <hr/>
      <h3>id: {people.id}</h3>
      <h3>id: {people.name}</h3>
      <h3>id: {people.age}</h3>
      <button onClick={e => setPeople({...people, name: "doinb"})}>修改对象值</button>
      <hr/>
      <h2>队员列表</h2>
      <ul>
        {
          students.map(item => {
            return (
              <li key={item.id}>
                <span>名字: {item.name} -- 年龄: {item.age}</span>
                <button onClick={e => chageStudentAge(item.id)}>age+1</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
