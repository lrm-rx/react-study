import React, { PureComponent } from 'react'
import { renderRoutes } from 'react-router-config';
import routes from './router';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import User from './pages/User'
import Detail from './pages/Detail'
import Detail2 from './pages/Detail2'
import Detail3 from './pages/Detail3'
import Nomatch from './pages/noMatch'
import Login from './pages/Login'
import Product from './pages/Product'

class App extends PureComponent {
  render() {
    const id = 123;
    const info = {name: "ming", age: 18, height: 168};
    return (
      <div>
        {/* <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
          <Link to="/profile">我的</Link> */}

        {/* <NavLink exact activeStyle={{color: "pink"}} to="/">首页</NavLink>
          <NavLink exact activeStyle={{color: "pink"}} to="/about">关于</NavLink>
          <NavLink exact activeStyle={{color: "pink"}} to="/profile">我的</NavLink> */}

        <NavLink exact activeClassName="link-active" to="/">首页</NavLink>
        <NavLink activeClassName="link-active" to="/about">关于</NavLink>
        <NavLink activeClassName="link-active" to="/profile">我的</NavLink>
        <NavLink activeClassName="link-active" to="/user">用户</NavLink>
        <NavLink activeClassName="link-active" to={`/detail/${id}`}>详情</NavLink>
        <NavLink to={`/detail2?name=why&age=18`} activeClassName="link-active">详情2</NavLink>
        <NavLink to={{
          pathname: "/detail3",
          search: "name=abc",
          state: info
        }}
          activeClassName="link-active">
          详情3
        </NavLink>
        <button onClick={e => this.jumpToProduct()}>商品</button>

        {/* <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/user" component={User} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/detail2" component={Detail2} />
          <Route path="/detail3" component={Detail3} />
          <Route path="/login" component={Login} />
          <Route path="/product" component={Product} />
          <Route component={Nomatch} />
        </Switch> */}

        {renderRoutes(routes)}

        {/* <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/:id" component={User} />
          <Route component={Nomatch} /> */}
      </div>
    )
  }
  jumpToProduct() {
    this.props.history.push({
      pathname: "/product",
      search: "name=abc",
      state: {name: "ming", age: 18}
    })
  }
}

export default withRouter(App)

