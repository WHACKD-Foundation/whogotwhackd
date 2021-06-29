import { NavLink, useLocation } from 'react-router-dom'
import ctl from '@netlify/classnames-template-literals'
import { SiTwitter as IconTwitter } from 'react-icons/si'

const navitem = active =>
  ctl(`
  h-full
  px-3
  flex
  items-center
  font-semibold
  text-white
  transition
  border-b-2
  hover:border-white
  ${active ? 'border-white' : 'border-transparent'}
`)

export default function TopBar() {
  const { pathname } = useLocation()
  return (
    <div className="z-10 fixed top-0 left-0 right-0 h-16 flex items-center px-5">
      <div className="ml-auto space-x-3 flex items-center h-full">
        <NavLink
          to="/"
          exact
          className={navitem(pathname === '/')}
          activeClassName="border-white"
        >
          Home
        </NavLink>
        <NavLink
          to="/howtobuy"
          className={navitem(pathname === '/howtobuy')}
          activeClassName="border-white"
        >
          How to Buy
        </NavLink>

        <a
          href="https://twitter.com/whackdbiz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconTwitter className="w-6 h-6 text-[#1DA1F2]" />
        </a>
      </div>
    </div>
  )
}
