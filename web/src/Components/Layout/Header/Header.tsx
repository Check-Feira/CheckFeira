import './Header.modules.css';

// bootstrap components
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

// components
import { Divider } from '../../../Components/Divider';

import logo from '../../../Assets/icon-list.png';
import { Link } from 'react-router-dom';



export function Header() {


  const handleLogout = () => {
   
  }

  return (
    <>
      <Stack direction='horizontal' className='w-100 justify-content-center pt-5'>
        <Stack as='a' href="/" direction='horizontal' className='align-items-center gap-2 text-decoration-none text-success'>
          <div className='stack__image--size'>
            <Image src={logo} alt='logo' fluid />
          </div>
          <h5>Wish List</h5>
        </Stack>
<Link to={`/management`} > <Button variant='success' className='ms-auto' onClick={handleLogout} >Cadatrar produto</Button></Link>
 
      </Stack>
      <Divider />
    </>
  )
}