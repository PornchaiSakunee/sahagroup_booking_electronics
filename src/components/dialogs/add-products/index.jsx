'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import classnames from 'classnames'

import FormatNumber from '@components/FormatNumber'
import styles from '@core/styles/table.module.css'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const countries = ['Select Country', 'France', 'Russia', 'China', 'UK', 'US']

const initialAddressData = {
  firstName: '',
  lastName: '',
  country: '',
  address1: '',
  address2: '',
  landmark: '',
  city: '',
  state: '',
  zipCode: ''
}

const customInputData = [
  {
    title: 'Home',
    content: 'Delivery Time (7am - 9pm)',
    value: 'home',
    isSelected: true,
    asset: 'tabler-home'
  },
  {
    title: 'Office',
    content: 'Delivery Time (10am - 6pm)',
    value: 'office',
    asset: 'tabler-building-skyscraper'
  }
]

const AddProducts = ({ open, setOpen, products, setProducts }) => {
  // Vars
  const initialSelected = customInputData?.find(item => item.isSelected)?.value || ''

  // States
  const [selected, setSelected] = useState(initialSelected)

  const [addressData, setAddressData] = useState(initialAddressData)

  const handleChange = prop => {
    if (typeof prop === 'string') {
      setSelected(prop)
    } else {
      setSelected(prop.target.value)
    }
  }

  useEffect(() => {
    // setAddressData(data ?? initialAddressData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => {
        setOpen(false)
        setSelected(initialSelected)
      }}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        <Typography component='span' className='flex flex-col text-center'>
          เลือกอุปกรณ์
        </Typography>
      </DialogTitle>

      <DialogContent className='pbs-0 sm:pli-16'>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <Grid container spacing={6}>
          fffff
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              {/* {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))} */}
              <tr>
                <th>รูป</th>
                <th>ชื่อสินค้า</th>
                <th>รายละเอียด</th>
                <th>ราคาต่อหน่วย</th>

                <th>เลือกอุปกรณ์</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row, k) => (
                <tr key={row.id}>
                  <td>
                    <img alt='iPhone 11 Pro' src={'/images/fair/' + row.device_photo} height={80} />
                  </td>
                  <td style={{ width: '20%' }}>{row.device_name}</td>
                  <td style={{ width: '20%' }}>{row.device_dsc}</td>
                  <td style={{ width: '15%', textAlign: 'right' }}>
                    <FormatNumber number={row.device_price_unit} />
                  </td>

                  <td>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setProducts(row)
                        setOpen(false)
                      }}
                      type='button'
                    >
                      เลือก
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default AddProducts
