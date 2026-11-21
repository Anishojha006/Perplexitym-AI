import {RouterProvider} from 'react-router'
import { router } from './app.routes'
import {useAuth} from '../features/auth/hooks/useAuth.js'
import { useEffect } from 'react';

function App() {
  const auth = useAuth();
  useEffect(()=>{
   auth.handlegetme();
  },[])
  return (
  <RouterProvider router={router} />
  )
}

export default App
