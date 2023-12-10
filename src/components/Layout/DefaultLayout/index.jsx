import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <>{children}</>
      <Footer />
    </div>
  )
}
