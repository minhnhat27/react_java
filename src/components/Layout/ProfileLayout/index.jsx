import Profile from '../../../pages/Profile/Profile'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function ProfileLayout({ children }) {
  return (
    <div>
      <Header />
      <>
        <Profile children={children} />
      </>
      <Footer />
    </div>
  )
}
