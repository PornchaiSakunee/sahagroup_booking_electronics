// MUI Imports
import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'

// Component Imports
// import ListOrder from './ListOrder'

const ListOrder = dynamic(() => import('./ListOrder'))

// import InvoiceCard from './InvoiceCard'

const Index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ListOrder />
      </Grid>
    </Grid>
  )
}

export default Index
