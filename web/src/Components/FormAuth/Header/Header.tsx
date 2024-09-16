// bootstrap components
import Stack from "react-bootstrap/esm/Stack";
import Image from 'react-bootstrap/Image';

import logo from '../../../Assets/icon-list.png';

export function Header() {
  return (
    <>
      <Stack direction='horizontal' className='w-100 justify-content-center pt-5'>
        <Stack as='a' href="/" direction='vertical' className='flex-column align-items-center gap-2 text-decoration-none text-success'>
          <div className='stack__image--size'>
            <Image src={logo} alt='logo' fluid />
          </div>
          <h5>Wish List</h5>
        </Stack>
      </Stack>
    </>
  )

}