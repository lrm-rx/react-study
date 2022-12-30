import Home from '../pages/Home'
import About, { AboutJoin } from '../pages/About'
import Profile from '../pages/Profile'
import User from '../pages/User'
import Detail from '../pages/Detail'
import Detail2 from '../pages/Detail2'
import Detail3 from '../pages/Detail3'
import Nomatch from '../pages/noMatch'
import Login from '../pages/Login'
import Product from '../pages/Product'

import History from '../pages/about/History'
import Culture from '../pages/about/Culture'
import Contact from '../pages/about/Contact'

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About,
    routes: [
      {
        path: "/about",
        exact: true,
        component: History
      },
      {
        path: "/about/culture",
        component: Culture
      },
      {
        path: "/about/contact",
        component: Contact
      },
      {
        path: "/about/join",
        component: AboutJoin
      },
    ]
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/detail/:id",
    component: Detail
  },
  {
    path: "/detail2",
    component: Detail2
  },
  {
    path: "/detail3",
    component: Detail3
  }
]

export default routes;