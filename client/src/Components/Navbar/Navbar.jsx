import {Link} from 'react-router-dom'
import './Navbar.css'

export const Navbar=()=>{
    return <>
        <div className='navbar'>
            <Link style={{textDecoration:"none",color:'darkblue'}} to="/">Punchure</Link>
            <Link style={{textDecoration:"none",color:'darkblue'}} to="/cart">Cart</Link>
        </div>
    </>
}