'use client'
import React, { useEffect, useState } from 'react'

// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'

// import ListBooking from './ListBooking'
// import ListRequest from './listRequest'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'

import ListProduct from './listProduct'
import ItemProducts from './itemProducts'
import FormatNumber from '@components/FormatNumber'

const Index = ({ masterId }) => {
  const [Device, setDevice] = useState([])

  useEffect(() => {
    setDevice([
      {
        id: 1,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 450,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 2,
        device_photo: 'd2.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 400,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 3,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 300,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 4,
        device_photo: 'd2.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 200,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 5,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 100,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 6,
        device_photo: 'd2.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 90,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 7,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 80,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 8,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 9,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 10,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 11,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 12,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 13,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 14,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      },
      {
        id: 15,
        device_photo: 'd1.jpg',
        device_name: 'โคมไฟ',
        device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
        device_price_unit: 70,
        device_num: 0,
        device_total_price: 0
      }
    ])
  }, [])

  const [value, setValue] = useState('1')
  const [DataCart, setDataCart] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function setCart(i) {
    setDataCart([...DataCart, i])
    localStorage.setItem('dataCart', [...DataCart, i])
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <div style={{ textAlign: 'right', padding: 20 }}>
            <Button
              variant='contained'
              startIcon={<i className='tabler-shopping-cart' />}
              href='#'
              className='is-full sm:is-auto'
            >
              ตะกร้า {DataCart.length > 0 ? `(${DataCart.length})` : ''}
            </Button>
          </div>

          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='card navigation examples'>
              <Tab value='1' label='หลอดไฟ' />
              <Tab value='2' label='โต๊ะ' />
              <Tab value='3' label='ประปา' />
            </TabList>
            <CardContent>
              <TabPanel value='1'>
                <Grid container>
                  {Device.map(i => (
                    <Grid key={i.id} container item xs={3} md={3} className='flex items-center justify-center '>
                      {/* <ItemProducts /> */}
                      <Grid item xs={12} md={12} className='flex items-center justify-center'>
                        <img alt='iPhone 11 Pro' src='/images/fair/d1.jpg' height={175} />
                      </Grid>
                      <Grid item xs={12} md={12} className='text-center '>
                        <Typography variant='h6' className='mbe-2'>
                          {i.device_name}
                        </Typography>
                        <Typography variant='h5' className='mbe-2'>
                          <FormatNumber number={i.device_price_unit} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} className='flex items-center justify-center'>
                        <Button variant='contained' onClick={() => setCart(i)}>
                          หยิบใส่ตะกร้า
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                {/* <Typography variant='h5' className='mbe-2'>
                  Header One
                </Typography>
                <Typography color='text.secondary' className='mbe-6'>
                  Pudding tiramisu caramels. Gingerbread gummies danish chocolate bar toffee marzipan. Wafer wafer cake
                  powder danish oat cake.
                </Typography>
                <Button variant='contained'>Button One</Button> */}
              </TabPanel>
              <TabPanel value='2'>
                <Typography variant='h5' className='mbe-2'>
                  Header Two
                </Typography>
                <Typography color='text.secondary' className='mbe-6'>
                  Dragée chupa chups soufflé cheesecake jelly tootsie roll cupcake marzipan. Carrot cake sweet roll
                  gummi bears caramels jelly beans.
                </Typography>
                <Button variant='contained'>Button Two</Button>
              </TabPanel>
              <TabPanel value='3'>
                <Typography variant='h5' className='mbe-2'>
                  Header Three
                </Typography>
                <Typography color='text.secondary' className='mbe-6'>
                  Icing cake macaroon macaroon jelly chocolate bar. Chupa chups dessert dessert soufflé chocolate bar
                  jujubes gummi bears lollipop.
                </Typography>
                <Button variant='contained'>Button Three</Button>
              </TabPanel>
            </CardContent>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Index
