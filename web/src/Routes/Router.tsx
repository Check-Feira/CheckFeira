import { createBrowserRouter } from "react-router-dom";

// pages
import { Management} from "../Pages";

// components
import { DefaultLayout } from "../Components/Layout";

// authentication 


const router = createBrowserRouter([


      {  path: '/',
        element: <DefaultLayout />,
        children: [
          {
            path: '/management',
            element: <Management />,
          }
        ]
      }
 

]);

export default router;