import Home from '../pages/Home'
import Login from '../pages/Login/Login'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Register from '../pages/Register/Register'

import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Products from '../pages/Products/Products'
import VerifyCode from '../components/VerifyCode/VerifyCode'
import Profile from '../pages/Profile/Profile'
import Cart from '../pages/Cart/Cart'

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/verify', component: VerifyCode, layout: null },
  { path: '/products', component: Products },
  { path: '/cart', component: Cart },
]

export const privateRoutes = [
  { path: '/profile', component: Profile },
  { path: '/profile/details', component: Profile },
  { path: '/profile/orders', component: Profile },
  { path: '/profile/address', component: Profile },
]

export const generateRoutes = (route) => {
  return route.map((route, index) => {
    const Page = route.component
    let Layout = DefaultLayout

    if (route.layout) {
      Layout = route.layout
    } else if (route.layout === null) {
      Layout = Fragment
    }
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    )
  })
}
