'use client'
import React, { useEffect, useState } from 'react'

// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'

// import ListBooking from './ListBooking'
// import ListRequest from './listRequest'

import Grid from '@mui/material/Grid'

import ListRequest from './listRequest'
import { getForm } from '@/utils/apiCall'

const Index = ({ masterId }) => {
  const [DataRequest, setDataRequest] = useState([])

  useEffect(() => {
    async function getData() {
      const dataForm = await getForm(masterId)

      setDataRequest(dataForm)
    }

    getData()
  }, [])

  return (
    <Grid container spacing={6}>
      {DataRequest.map((i, k) => (
        <Grid item xs={6} key={k}>
          <ListRequest item={i} masterId={masterId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Index
