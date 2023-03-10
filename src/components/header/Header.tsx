import logo from '../../assets/logo.png';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  return (
    <header>
      <img src={logo} alt='logo' />
      {location.pathname === '/admin' && (
        <div className='user'>
          <Link to='/'>
            <span className='logout'>Logout</span>
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
