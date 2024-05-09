// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import AddEditAddress from '@components/dialogs/add-edit-address'

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

import CustomInputHorizontal from '@core/components/custom-inputs/Horizontal'
import CustomInputVertical from '@core/components/custom-inputs/Vertical'

import { delAddress } from '@/utils/apiCall'

// Styled Components
const HorizontalContent = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'content'
})({})

const VerticalContent = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'content'
})({
  textAlign: 'center'
})

const Address = ({ dataAdr = [], setDataAdr, setAddress, onAction }) => {
  // Vars

  // States
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedSpeed, setSelectedSpeed] = useState('standard')

  const [mapAdressItem, setAddressItem] = useState([])

  const [dataUpdate, setDataUpdate] = useState(null)

  const [OpenAdr, setOpenAdr] = useState(false)

  const buttonProps = {
    variant: 'tonal',
    children: 'เพิ่มที่อยู่',
    onClick: () => setDataUpdate(null)
  }

  const onDelAdr = async id => {
    if (confirm('ยืนยันลบที่อยู่')) {
      const stDelAdr = await delAddress(id)

      if (stDelAdr.status) {
        const dataDel = dataAdr.filter(i => i.id !== id)

        setDataAdr(dataDel)
        alert(stDelAdr.msg)
      } else {
        alert(stDelAdr.msg)
      }
    }
  }

  const onUpdateAdr = async data => {
    // const stDelAdr = await delAddress(id)
    await setOpenAdr(true)
    await setOpenAdr(false)
    setDataUpdate(data)
  }

  useEffect(() => {
    const MapData = dataAdr.map(i => {
      return {
        title: i.user.customer.cus_company,

        value: i.id,
        isSelected: true,
        content: (
          <HorizontalContent component='div' className='flex flex-col gap-3 mbs-2 bs-full'>
            <Typography variant='body2'>
              {i.full_address}
              <br />
            </Typography>
            <Divider />
            <div className='flex items-center gap-4 mbs-0.5 pbe-[6px]'>
              <Typography href='javascript:void(0)' component={Link} onClick={e => onUpdateAdr(i)} color='primary'>
                Edit
              </Typography>
              <Typography href='javascript:void(0)' component={Link} onClick={e => onDelAdr(i.id)} color='primary'>
                Remove
              </Typography>
            </div>
          </HorizontalContent>
        )
      }
    })

    // const valSelect = dataadr.filter(i => i.isSelected == true)

    // setSelectedOption(valSelect[0].id)
    setAddressItem(MapData)
  }, [dataAdr])

  const handleOptionChange = prop => {
    console.log(typeof prop)

    if (typeof prop === 'number') {
      setSelectedOption(prop)
      setAddress(prop)
    } else {
      setSelectedOption(parseInt(prop.target.value))
      setAddress(parseInt(prop.target.value))
    }

    // if (typeof prop === 'string') {
    //   setSelectedOption(prop)
    // } else {
    //   setSelectedOption(prop.target.value)
    // }
  }

  // const handleSpeedChange = prop => {
  //   if (typeof prop === 'string') {
  //     setSelectedSpeed(prop)
  //   } else {
  //     setSelectedSpeed(prop.target.value)
  //   }
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12} className='flex flex-col gap-6'>
        <div className='flex flex-col items-start gap-4'>
          <Typography color='text.primary' className='font-medium'>
            ที่อยู่ในการเปิดบิล
          </Typography>
          <Grid container spacing={6}>
            {mapAdressItem.map((item, index) => (
              <CustomInputHorizontal
                type='radio'
                key={index}
                data={item}
                gridProps={{ sm: 6, xs: 12 }}
                selected={selectedOption}
                name='custom-radios-basic'
                handleChange={handleOptionChange}
              />
            ))}
          </Grid>
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={AddEditAddress}
            exOpen={OpenAdr}
            dialogProps={{ onAction, dataUpdate }}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default Address
