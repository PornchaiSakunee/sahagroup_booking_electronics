'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

// Component Imports
import useMediaQuery from '@mui/material/useMediaQuery'

import ViewOrder from '@views/page/orderHistory/viewOrder'

import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const OrderDetail = ({ open, setOpen, data }) => {
  // States
  // const [DataOrder, setDataOrder] = useState(null)

  const handleClose = async () => {
    await setOpen(false)

    // await setData(null)
  }

  return (
    <Dialog maxWidth='lg' fullWidth open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{data != null ? data.f_name : ''}</DialogTitle>
      <DialogContent>{data != null ? <ViewOrder dataOrder={data} /> : ''}</DialogContent>
      <DialogActions className='dialog-actions-dense'>
        {/* <Button onClick={handleClose}>ดาวน์โหลด</Button> */}
        <Button onClick={handleClose}>ปิด</Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetail
