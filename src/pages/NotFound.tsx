import { Typography } from '@mui/material'
import Page from "components/page/Page";
import React from 'react'

export default function NotFound() {
  return (
    <Page
      title="Not Found"
      description="Not Found">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
        <Typography variant="h3">Sorry!! The page you're trying to access is not available</Typography>
      </div>
    </Page>
  )
}
