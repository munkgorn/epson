import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'

const Logout = () => {
  useEffect(() => {
    signOut({ callbackUrl: '/auth/login' });
  }, [])
  
  return (
    <div>Logout</div>
  )
}

export default Logout