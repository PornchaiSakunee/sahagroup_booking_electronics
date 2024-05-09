'use client'
import React from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import ListFair from './ListFair'

function index() {
  return (
    <Card>
      <CardHeader title='งานแฟร์' />
      <ListFair />
    </Card>
  )
}

export default index
