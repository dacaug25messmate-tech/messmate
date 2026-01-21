
import {Link, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function AppNavbar() {
  const mystate = useSelector(state => state.logged)  
  return  (
    <>
        <ul className='nav navbar border' >
          <li className='nav-item border'>
            <Link className='nav-link' to="/">HOME</Link> 
          </li>
          <li className='nav-item border'>
            <Link className='nav-link' to="/login">LOGIN</Link> 
          </li>
          <li className='nav-item border'>
            <Link className='nav-link' to="/register">REGISTER</Link> 
          </li>
       </ul>  
        
    </>
  ) 
  
}