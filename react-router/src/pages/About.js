import React, { PureComponent } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config';
import History from './about/History'
import Culture from './about/Culture'
import Contact from './about/Contact'

export function AboutJoin(props) {
  return (
    <div>
      <h4>欢迎加入我们</h4>
    </div>
  )
}
export default class About extends PureComponent {
  render() {
    console.log(this.props.route);
    const branch = matchRoutes(this.props.route.routes, "/about");
    console.log(branch);
    
    return (
      <div>
        <NavLink exact activeClassName="about-active" to="/about">历史</NavLink>
        <NavLink activeClassName="about-active" to="/about/culture">文化</NavLink>
        <NavLink activeClassName="about-active" to="/about/contact">联系我们</NavLink>
        {/* <NavLink activeClassName="about-active" to="/about/join">123</NavLink> */}
        <button onClick={e => this.clickJoin()}>加入我们</button>

        {/* <Switch>
          <Route exact path="/about" component={History} />
          <Route path="/about/culture" component={Culture} />
          <Route path="/about/contact" component={Contact} />
          <Route path="/about/join" component={AboutJoin} />
        </Switch> */}
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }

  clickJoin() {
    // console.log(this.props.history);
    // console.log(this.props.location);
    // console.log(this.props.match);
    this.props.history.push("/about/join")
  }
}
