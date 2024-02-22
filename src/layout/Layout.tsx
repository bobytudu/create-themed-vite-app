import React from 'react'
import { Outlet } from 'react-router-dom'
import { Topbar } from 'components'

export default function Layout() {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  )
}
