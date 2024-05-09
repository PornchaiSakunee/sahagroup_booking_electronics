'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import CardHeader from '@mui/material/CardHeader'

// import ListBooking from './ListBooking'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Index = ({ item, masterId }) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)

  const boxStyle = {
    cursor: isHover ? 'pointer' : '',
    boxShadow: isHover ? '2px 2px 2px  #9E9E9E' : ''
  }

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <Card
      onClick={() => router.push(`/bookingForm/${masterId}/${item.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={boxStyle}
    >
      <Grid container>
        <Grid item xs={12} md={5} className='flex items-center justify-center'>
          <CardContent className='flex items-center justify-center'>
            <img alt='iPhone 11 Pro' src={item.f_image} height={120} />
          </CardContent>
        </Grid>
        <Grid item xs={12} md={7} className='md:border-is border-bs md:border-bs-0'>
          <CardContent>
            <Typography variant='h5' className='mbe-2'>
              {item.f_name}
            </Typography>
            {/* <Typography className='mbe-2' color='text.secondary'>
              {item.f_name}
            </Typography> */}
            {/* <div className='flex gap-1'>
              <Typography>Price:</Typography>
              <Typography className='font-medium'>$899</Typography>
            </div> */}
          </CardContent>
          <CardActions className='justify-between card-actions-dense'>
            {/* <Button
              startIcon={<i className='tabler-file-check' />}
              onClick={() => router.push(`/bookingForm/${masterId}/${item.id}`)}
            >
              ใบจอง
            </Button> */}
            {/* <IconButton
              id='share-button'
              aria-haspopup='true'
              {...(open && { 'aria-expanded': true, 'aria-controls': 'share-menu' })}
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

export default Index
