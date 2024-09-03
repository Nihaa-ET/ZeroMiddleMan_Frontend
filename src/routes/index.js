import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import App from '../App';



import AllSellerDetails from '../pages/sellerDashboard/AllSellerDetails';
import AddSeller from '../pages/sellerDashboard/AddSeller';
import TrashedSellerDetails from '../pages/sellerDashboard/TrashedSellerDetails';
import EditSellerDetails from '../pages/sellerDashboard/EditSellerDetails';
import ViewSellerDetails from '../pages/sellerDashboard/ViewSellerDetails';
import BulkUpload from '../pages/sellerDashboard/BulkUpload';
import RegisterUser from '../pages/sellerDashboard/RegisterUser';
import LoginForm from '../pages/admin/LoginForm';
import RegisterSuperAdmin from '../pages/admin/RegisterSuperAdmin';
import Settings2 from '../pages/sellerDashboard/Settings2';
import ActiveUsers from '../pages/sellerDashboard/ActiveUser';
import DisabledUsers from '../pages/sellerDashboard/DisabledUsers';
import PrivateRoute from '../PrivateRoute';
import Unauthorized from '../pages/sellerDashboard/Unauthorized';
import ActiveAdmins from '../pages/admin/ActiveAdmins';
import SellerDashBoard from '../pages/sellerDashboard/SellerDashBoard';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <LoginForm />,
      },
      {
        path: 'home',
        element: <Home />,
        children: [
          {
            path: 'seller-dashboard',
            element: <SellerDashBoard />,
            children: [
              {
                path: 'allseller-details',
                element: <AllSellerDetails />,
              },
              {
                path: 'add-seller',
                element: <AddSeller />,
              },
              {
                path: 'edit-seller/:id',
                element: <EditSellerDetails />,
              },
              {
                path: 'trash-seller-details',
                element: (
                  <PrivateRoute allowedRoles={['superadmin', 'Admin', 'TL']}>
                    <TrashedSellerDetails />
                  </PrivateRoute>
                ),
              },
              {
                path: 'bulk-upload',
                element: <BulkUpload />,
              },

              {
                path: 'view-seller-details/:id',
                element: <ViewSellerDetails />,
              },
              {
                path: 'settings2',
                element: (
                  <PrivateRoute allowedRoles={['superadmin', 'Admin']}>
                    <Settings2 />
                  </PrivateRoute>
                ),
                children: [
                  {
                    path: 'active-users',
                    element: (
                      <PrivateRoute allowedRoles={['superadmin', 'Admin']}>
                        <ActiveUsers />
                      </PrivateRoute>
                    ),
                  },
                  {
                    path: 'disabled-users',
                    element: (
                      <PrivateRoute allowedRoles={['superadmin', 'Admin']}>
                        <DisabledUsers />
                      </PrivateRoute>
                    ),
                  },
                  {
                    path: 'register-user',
                    element: (
                      <PrivateRoute allowedRoles={['superadmin', 'Admin']}>
                        <RegisterUser />
                      </PrivateRoute>
                    ),
                  },
                  {
                    path: 'active-admins',
                    element: (
                      <PrivateRoute allowedRoles={['superadmin', 'Admin']}>
                        <ActiveAdmins />
                      </PrivateRoute>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'register-superadmin',
        element: <RegisterSuperAdmin />,
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      
    ],
  },
]);

export default router;
