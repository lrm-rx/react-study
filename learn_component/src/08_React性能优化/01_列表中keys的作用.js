import React, { Component } from 'react'

export default class App extends Component {
  state = {
    movies: ["星际穿越", "盗梦空间"]
  }
  render() {
    return (
      <div>
        <h2>电影列表</h2>
        <ul>
          {
            this.state.movies.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
        <button onClick={e => this.insertMovie()}>添加电影</button>
      </div>
    )
  }
  insertMovie() {
    this.setState({
      movies: [...this.state.movies, '大话西游']
    })
  }
}
