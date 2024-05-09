'use client'
import React from 'react'

// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'

import AboutOverview from './AboutOverview'
import ActivityTimeline from './ActivityTimeline'
import ConnectionsTeams from './ConnectionsTeams'
import ProjectsTable from './ProjectsTables'

import AddEditAddress from '@components/dialogs/add-edit-address'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import CustomTextField from '@core/components/mui/TextField'

const data = {
  about: [
    { property: 'Full Name', value: 'John Doe', icon: 'tabler-user' },
    { property: 'Status', value: 'active', icon: 'tabler-check' },
    { property: 'Role', value: 'Developer', icon: 'tabler-crown' },
    { property: 'Country', value: 'USA', icon: 'tabler-flag' },
    { property: 'Language', value: 'English', icon: 'tabler-language' }
  ],
  contacts: [
    { property: 'Contact', value: '(123) 456-7890', icon: 'tabler-phone-call' },
    { property: 'Skype', value: 'john.doe', icon: 'tabler-messages' },
    { property: 'Email', value: 'john.doe@example.com', icon: 'tabler-mail' }
  ],
  teams: [
    { property: 'Backend Developer', value: '(126 Members)' },
    { property: 'React Developer', value: '(98 Members)' }
  ],
  overview: [
    { property: 'Task Compiled', value: '13.5k', icon: 'tabler-check' },
    { property: 'Connections', value: '897', icon: 'tabler-users' },
    { property: 'Projects Compiled', value: '146', icon: 'tabler-layout-grid' }
  ],
  connections: [
    {
      isFriend: true,
      connections: '45',
      name: 'Cecilia Payne',
      avatar: '/images/avatars/2.png'
    },
    {
      isFriend: false,
      connections: '1.32k',
      name: 'Curtis Fletcher',
      avatar: '/images/avatars/3.png'
    },
    {
      isFriend: false,
      connections: '125',
      name: 'Alice Stone',
      avatar: '/images/avatars/4.png'
    },
    {
      isFriend: true,
      connections: '456',
      name: 'Darrell Barnes',
      avatar: '/images/avatars/5.png'
    },
    {
      isFriend: true,
      connections: '1.2k',
      name: 'Eugenia Moore',
      avatar: '/images/avatars/8.png'
    }
  ],
  teamsTech: [
    {
      members: 72,
      ChipColor: 'error',
      chipText: 'Developer',
      title: 'React Developers',
      avatar: '/images/logos/react-bg.png'
    },
    {
      members: 122,
      chipText: 'Support',
      ChipColor: 'primary',
      title: 'Support Team',
      avatar: '/images/icons/support-bg.png'
    },
    {
      members: 7,
      ChipColor: 'info',
      chipText: 'Designer',
      title: 'UI Designer',
      avatar: '/images/logos/figma-bg.png'
    },
    {
      members: 289,
      ChipColor: 'error',
      chipText: 'Developer',
      title: 'Vue.js Developers',
      avatar: '/images/logos/vue-bg.png'
    },
    {
      members: 24,
      chipText: 'Marketing',
      ChipColor: 'secondary',
      title: 'Digital Marketing',
      avatar: '/images/logos/twitter-bg.png'
    }
  ],
  projectTable: [
    {
      id: 1,
      title: 'BGC eCommerce App',
      subtitle: 'React Project',
      leader: 'Eileen',
      avatar: '/images/logos/react-bg.png',
      avatarGroup: ['/images/avatars/1.png', '/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png'],
      status: 78
    },
    {
      id: 2,
      leader: 'Owen',
      title: 'Falcon Logo Design',
      subtitle: 'Figma Project',
      avatar: '/images/logos/figma-bg.png',
      avatarGroup: ['/images/avatars/5.png', '/images/avatars/6.png'],
      status: 18
    },
    {
      id: 3,
      title: 'Dashboard Design',
      subtitle: 'VueJs Project',
      leader: 'Keith',
      avatar: '/images/logos/vue-bg.png',
      avatarGroup: ['/images/avatars/7.png', '/images/avatars/8.png', '/images/avatars/1.png', '/images/avatars/2.png'],
      status: 62
    },
    {
      id: 4,
      title: 'Foodista Mobile App',
      subtitle: 'Xamarin Project',
      leader: 'Merline',
      avatar: '/images/icons/mobile-bg.png',
      avatarGroup: ['/images/avatars/3.png', '/images/avatars/4.png', '/images/avatars/5.png', '/images/avatars/6.png'],
      status: 8
    },
    {
      id: 5,
      leader: 'Harmonia',
      title: 'Dojo React Project',
      subtitle: 'Python Project',
      avatar: '/images/logos/python-bg.png',
      avatarGroup: ['/images/avatars/7.png', '/images/avatars/8.png', '/images/avatars/1.png'],
      status: 36
    },
    {
      id: 6,
      leader: 'Allyson',
      title: 'Blockchain Website',
      subtitle: 'Sketch Project',
      avatar: '/images/logos/sketch-bg.png',
      avatarGroup: ['/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png', '/images/avatars/5.png'],
      status: 92
    },
    {
      id: 7,
      title: 'Hoffman Website',
      subtitle: 'HTML Project',
      leader: 'Georgie',
      avatar: '/images/logos/html-bg.png',
      avatarGroup: ['/images/avatars/6.png', '/images/avatars/7.png', '/images/avatars/8.png', '/images/avatars/1.png'],
      status: 88
    },
    {
      id: 8,
      title: 'eCommerce Website',
      subtitle: 'React Project',
      leader: 'Eileen',
      avatar: '/images/logos/react-bg.png',
      avatarGroup: ['/images/avatars/1.png', '/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png'],
      status: 78
    },
    {
      id: 9,
      leader: 'Owen',
      title: 'Retro Logo Design',
      subtitle: 'Figma Project',
      avatar: '/images/logos/figma-bg.png',
      avatarGroup: ['/images/avatars/5.png', '/images/avatars/6.png'],
      status: 18
    },
    {
      id: 10,
      title: 'Admin Dashboard',
      subtitle: 'VueJs Project',
      leader: 'Keith',
      avatar: '/images/logos/vue-bg.png',
      avatarGroup: ['/images/avatars/7.png', '/images/avatars/8.png', '/images/avatars/1.png', '/images/avatars/2.png'],
      status: 62
    }
  ]
}

function index() {
  const buttonProps = {
    variant: 'tonal',
    children: 'Add New Address'
  }

  const adr = [
    { id: 1, adr: '250/25 ตำบลบึง ศรีราชา ชลบุรี' },
    { id: 2, adr: '250/25 ตำบลบึง ศรีราชา ชลบุรี' }
  ]

  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item lg={4} md={5} xs={12}>
          <AboutOverview data={data} />
        </Grid>
        <Grid item lg={8} md={7} xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h5'>ที่อยู่</Typography>

              <div className='border rounded'>
                {adr.map((row, index) => (
                  <div
                    key={index}
                    className='flex flex-col sm:flex-row items-center gap-4 p-6 relative [&:not(:last-child)]:border-be'
                  >
                    <div className='flex flex-col sm:flex-row items-center sm:justify-between is-full'>
                      <div className='flex flex-col items-center gap-2 sm:items-start'>
                        <Typography color='text.primary' className='font-medium'>
                          {row.adr}
                        </Typography>

                        {/* <Rating
                    name='google-nest-rating'
                    value={product.rating}
                    emptyIcon={<i className='tabler-star-filled text-textDisabled' />}
                    readOnly
                  /> */}
                      </div>
                      <div className='flex flex-col justify-between items-center gap-4 sm:items-end'>
                        <div className='flex'>
                          {/* <Typography className='line-through'>{`$${product.originalPrice}`}</Typography> */}
                        </div>
                        <Button variant='tonal' size='small'>
                          ลบ
                        </Button>
                        <Button variant='tonal' size='small'>
                          แก้ไข
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={AddEditAddress} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default index
