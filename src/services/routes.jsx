import Home from '../pages/Home'
import Login from '../pages/Login/Login'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Register from '../pages/Register/Register'
import Products from '../pages/Products/Products'
import VerifyCode from '../components/VerifyCode/VerifyCode'
import Cart from '../pages/Cart/Cart'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Pay from '../pages/Pay/Pay'
import ProductLayout from '../components/Layout/ProductLayout'

import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import ProfileDetails from '../components/ProfileDetails/ProfileDetails'
import ProfileAddress from '../components/ProfileDetails/ProfileAddress'
import ProfileOrderLists from '../components/ProfileDetails/ProfileOrders'
import ProfileLayout from '../components/Layout/ProfileLayout'

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/product/:id', component: ProductDetails },
  { path: '/verify', component: VerifyCode, layout: null },
  { path: '/products', component: Products, layout: ProductLayout },
  { path: '/cart', component: Cart },
]

export const privateRoutes = [
  { path: '/profile', component: ProfileDetails, layout: ProfileLayout },
  { path: '/profile/details', component: ProfileDetails, layout: ProfileLayout },
  { path: '/profile/orders', component: ProfileOrderLists, layout: ProfileLayout },
  { path: '/profile/address', component: ProfileAddress, layout: ProfileLayout },
  { path: '/pay', component: Pay, layout: null },
]

export const GenerateRoutes = (route) => {
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
