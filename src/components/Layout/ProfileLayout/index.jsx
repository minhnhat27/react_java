import Profile from '../../../pages/Profile/Profile'
import Header from '../Header/Header'

export default function ProfileLayout({ children }) {
  return (
    <div>
      <Header />
      <>
        <Profile children={children} />
      </>
    </div>
  )
}
