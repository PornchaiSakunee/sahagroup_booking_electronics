'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import { useRouter } from 'next/navigation'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
// import styles from '@core/styles/table.module.css'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Data Imports
// import defaultData from './data'

// Column Definitions
const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: 'ID'
  }),
  columnHelper.accessor('fullName', {
    cell: info => info.getValue(),
    header: 'Fair Name'
  }),

  columnHelper.accessor('start_date', {
    cell: info => info.getValue(),
    header: 'Date'
  }),
  columnHelper.accessor('experience', {
    cell: info => info.getValue(),
    header: 'Experience'
  }),
  columnHelper.accessor('experience', {
    cell: info => info.getValue(),
    header: 'Service Request'
  })
]

const ListFair = () => {
  // States
  const router = useRouter()
  const [data, setData] = useState(() => [])

  useEffect(() => {
    setData([
      {
        id: 1,
        fullName: "Korrie O'Crevy",
        start_date: '09/23/2016',
        end_date: '09/23/2016',
        status: 2
      },
      {
        id: 2,
        fullName: "Korrie O'Crevy",
        start_date: '09/23/2016',
        end_date: '09/23/2016',
        status: 2
      }
    ])
  }, [])

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={5} className='flex items-center justify-center'>
          <CardContent className='flex items-center justify-center'>
            <img alt='iPhone 11 Pro' src='/images/fair/fairbitec28.jpg' height={175} />
          </CardContent>
        </Grid>
        <Grid item xs={12} md={7} className='md:border-is border-bs md:border-bs-0'>
          <CardContent>
            <Typography variant='h5' className='mbe-2'>
              สหกรุ๊ปแฟร์ ไบเทค บางนา ครั้งที่ 28
            </Typography>
            <Typography className='mbe-2' color='text.secondary'>
              ไบเทคบางนา ฮอลล์ 98-100 วันที่ 27-30 มิถุนายน 2567
            </Typography>
            {/* <div className='flex gap-1'>
              <Typography>Price:</Typography>
              <Typography className='font-medium'>$899</Typography>
            </div> */}
          </CardContent>
          <CardActions className='justify-between card-actions-dense'>
            <Button
              startIcon={<i className='tabler-file-check' />}
              onClick={() => router.push('/booking/e7e5ebdc35ef02f1b4a24b54eab06212')}
            >
              จองอุปกรณ์
            </Button>
            {/* <Button startIcon={<i className='tabler-shopping-cart' />} onClick={() => router.push('/bookingV2/1234')}>
              จองอุปกรณ์ V2
            </Button> */}
            {/* <IconButton
              id='share-button'
              aria-haspopup='true'
              {...(open && { 'aria-expanded': true, 'aria-controls': 'share-menu' })}
              onClick={handleClick}
            >
              <i className='tabler-share text-xl' />
            </IconButton> */}
            {/* <Menu
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{ 'aria-labelledby': 'share-button' }}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <i className='tabler-brand-facebook text-xl' />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <i className='tabler-brand-twitter text-xl' />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <i className='tabler-brand-linkedin text-xl' />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <i className='tabler-brand-google text-xl' />
              </MenuItem>
            </Menu> */}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ListFair
