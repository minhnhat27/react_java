import React from 'react'
import classNames from 'classnames/bind'
import Styles from './Footer.module.scss'
import {
  FaCcDiscover,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

const cx = classNames.bind(Styles)
export default function Header() {
  return (
    <footer>
      <div className={cx('footer-top-area')}>
        <div className={cx('zigzag-bottom')}></div>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-md-3 col-sm-6')}>
              <div className={cx('footer-about-us')}>
                <h2>
                  u<span>Stora</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero quam
                  laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi iure eaque
                  ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi veritatis magni at?
                </p>
                <div className={cx('footer-social')}>
                  <a href="#" target="_blank">
                    <i>
                      <FaFacebook />
                    </i>
                  </a>
                  <a href="#" target="_blank">
                    <i>
                      <FaTwitter />
                    </i>
                  </a>
                  <a href="#" target="_blank">
                    <i>
                      <FaYoutube />
                    </i>
                  </a>
                  <a href="#" target="_blank">
                    <i>
                      <FaLinkedin />
                    </i>
                  </a>
                </div>
              </div>
            </div>

            <div className={cx('col-md-3 col-sm-6')}>
              <div className={cx('footer-menu')}>
                <h2 className={cx('footer-wid-title')}>User Navigation </h2>
                <ul>
                  <li>
                    <a href="#">My account</a>
                  </li>
                  <li>
                    <a href="#">Order history</a>
                  </li>
                  <li>
                    <a href="#">Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Vendor contact</a>
                  </li>
                  <li>
                    <a href="#">Front page</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx('col-md-3 col-sm-6')}>
              <div className={cx('footer-menu')}>
                <h2 className={cx('footer-wid-title')}>Categories</h2>
                <ul>
                  <li>
                    <a href="#">Mobile Phone</a>
                  </li>
                  <li>
                    <a href="#">Home accesseries</a>
                  </li>
                  <li>
                    <a href="#">LED TV</a>
                  </li>
                  <li>
                    <a href="#">Computer</a>
                  </li>
                  <li>
                    <a href="#">Gadets</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={cx('col-md-3 col-sm-6')}>
              <div className={cx('footer-newsletter')}>
                <h2 className={cx('footer-wid-title')}>Newsletter</h2>
                <p>
                  Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your inbox!
                </p>
                <div className={cx('newsletter-form')}>
                  <form action="#">
                    <input className={cx('button-email')} type="email" placeholder="Type your email" />
                    <input className={cx('button-submit')} type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('footer-bottom-area')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-md-8')}>
              <div className={cx('copyright')}>
                <p>
                  &copy; 2015 uCommerce. All Rights Reserved.{' '}
                  <a href="http://www.freshdesignweb.com" target="_blank">
                    freshDesignweb.com
                  </a>
                </p>
              </div>
            </div>

            <div className={cx('col-md-4')}>
              <div className={cx('footer-card-icon')}>
                <i>
                  <FaCcDiscover style={{ fontSize: 25 }} />
                </i>
                <i>
                  <FaCcMastercard style={{ fontSize: 25 }} />
                </i>
                <i>
                  {' '}
                  <FaCcPaypal style={{ fontSize: 25 }} />
                </i>
                <i>
                  {' '}
                  <FaCcVisa style={{ fontSize: 25 }} />
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
