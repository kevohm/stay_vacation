import React from 'react'
import {Navigate } from 'react-router-dom'
import { useGlobal } from '../../context/AppContext'

const Protection = ({children}) => {
    const {state} = useGlobal()
    if (state.user.role !== import.meta.env.VITE_ADMIN) {
      return <Navigate to="/" />;
    }
  return (
    children
  )
}

export default Protection