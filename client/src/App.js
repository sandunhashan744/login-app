import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// import components
import UserLoginComponent from './components/UserLoginComponent'
import RegisterComponent from './components/RegisterComponent'
import ProfileComponent from './components/ProfileComponent'
import ResetComponent from './components/ResetComponent'
import RecoveryComponent from './components/RecoveryComponent'
import PageNotFound from './components/PageNotFound'

// auth middleware 
import {AuthorizeUser} from './middleware/auth-route'

// root routers
const router =createBrowserRouter([
  {
    path:'/',
    element: <UserLoginComponent/>
  },
  {
    path:'/register',
    element:<RegisterComponent/>
  },
  {
    path:'/profile',
    element:<AuthorizeUser> <ProfileComponent/> </AuthorizeUser>
  },
  {
    path:'/reset',
    element:<ResetComponent/>
  },
  {
    path:'/recovery',
    element:<RecoveryComponent/>
  },
  {
    path:'*',
    element:<PageNotFound/>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
