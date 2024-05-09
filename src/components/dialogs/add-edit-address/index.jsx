'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// import MenuItem from '@mui/material/MenuItem'
// import Switch from '@mui/material/Switch'
// import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
// import classnames from 'classnames'

// Component Imports
import Chip from '@mui/material/Chip'

// import { flattenBy } from '@tanstack/react-table'

// import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

import { getProvinces, getAmphures, getDistricts, insertAddress, updateAddress } from '@/utils/apiCall'

// const countries = ['Select Country', 'France', 'Russia', 'China', 'UK', 'US']

// const furnishingArray = ['A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A007', 'A008', 'A009', 'A010']

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

const AddEditAddress = ({ open, setOpen, data, onAction, dataUpdate }) => {
  // Vars
  const initialSelected = customInputData?.find(item => item.isSelected)?.value || ''

  const [Provinces, setProvinces] = useState([])
  const [DefaultProvinces, setDefaultProvinces] = useState(null)

  const [Amphures, setAmphures] = useState([])
  const [DefaultAmphures, setDefaultAmphures] = useState(null)

  const [Districts, setDistricts] = useState([])
  const [DefaultDistricts, setDefaultDistricts] = useState(null)

  const [formData, setformData] = useState({
    address: null,
    provinces: null,
    amphures: null,
    districts: null,
    zipCode: null
  })

  // States
  const [selected, setSelected] = useState(initialSelected)
  const [addressData, setAddressData] = useState(initialAddressData)

  // const handleChangeAddress = async prop => {
  //   setformData({ ...formData, address: prop })
  // }

  const handleChangeProvinces = async prop => {
    const dataAmp = await getAmphures(prop.province_id)

    setformData({ ...formData, provinces: prop })
    setAmphures(dataAmp)
  }

  const handleChangeAmphures = async prop => {
    // console.log(prop)
    setformData({ ...formData, amphures: prop })
    const dataDid = await getDistricts(prop.amphure_id)

    setDistricts(dataDid)
  }

  const handleChangeDistricts = async prop => {
    // console.log(prop)
    setformData({ ...formData, districts: prop, zipCode: prop.zip_code })

    // const dataDid = await getDistricts(prop.amphure_id)

    // setDistricts(dataDid)
  }

  const onSubmit = async () => {
    if (formData.address === null) {
      alert('กรุณากรอกที่อยู่')
    } else if (formData.provinces === null) {
      alert('กรุณากรอกจังหวัด')
    } else if (formData.amphures === null) {
      alert('กรุณากรอกอำเภอ')
    } else if (formData.districts === null) {
      alert('กรุณากรอกตำบล')
    } else if (formData.zipCode === null) {
      alert('กรุณากรอก รหัสไปรษณีย์')
    } else {
      if (dataUpdate !== null) {
        const id = dataUpdate.id

        const updateAdr = await updateAddress(
          {
            address: formData.address,
            districts_id: formData.districts.districts_id,
            zip_code: formData.zipCode
          },
          id
        )

        // if (updateAdr.status === true) {
        //   alert('OK')
        //   setOpen(false)
        //   onAction(true)
        // }
      } else {
        const insertAdr = await insertAddress({
          address: formData.address,
          districts_id: formData.districts.districts_id,
          zip_code: formData.zipCode
        })

        // if (insertAdr.status === true) {
        //   alert('OK')
        //   setOpen(false)
        //   onAction(true)
        // }
      }

      setOpen(false)
      onAction(true)

      // console.log('insertAdr', insertAdr)
    }
  }

  useEffect(() => {
    async function getData() {
      const dataProvin = await getProvinces()

      setProvinces(dataProvin)
    }

    getData()
  }, [])

  useEffect(() => {
    setAddressData(data ?? initialAddressData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    async function getDataUpdate() {
      if (dataUpdate !== null) {
        console.log('dataUpdate', dataUpdate)
        const id = dataUpdate.id
        const pvID = dataUpdate.districts.amphures.provinces.id
        const ampID = dataUpdate.districts.amphures.id
        const disID = dataUpdate.districts.id

        // address: null,
        // provinces: null,
        // amphures: null,
        // districts: null,
        // zipCode: null

        if (Provinces.length === 0) {
          const dataProvin = await getProvinces()

          await setProvinces(dataProvin)
        }

        const dataAmp = await getAmphures(pvID)
        const dataDis = await getDistricts(ampID)

        await setAmphures(dataAmp)
        await setDistricts(dataDis)

        const pv = await Provinces.filter(i => i.province_id === pvID)
        const amp = await dataAmp.filter(i => i.amphure_id === ampID)
        const dis = await dataDis.filter(i => i.districts_id === disID)

        console.log('amp', Amphures, amp)
        console.log('dataDis', dataDis, disID, dis)

        setformData({
          ...formData,
          address: dataUpdate.address,
          provinces: pv[0],
          amphures: amp[0],
          districts: dis[0],
          zipCode: dataUpdate.zip_code
        })
      } else {
        setformData({
          address: null,
          provinces: null,
          amphures: null,
          districts: null,
          zipCode: null
        })
      }
    }

    getDataUpdate()
  }, [dataUpdate])

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
        {dataUpdate ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่'}
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='pbs-0 sm:pli-16'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='ที่อยู่'
                name='address'
                variant='outlined'
                placeholder='กรอกที่อยู่'
                value={formData.address}
                onChange={e => setformData({ ...formData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                fullWidth
                value={formData.provinces}
                onChange={(event, value) => handleChangeProvinces(value)}
                id='select-furnishing-details'
                options={Provinces}
                defaultValue={DefaultProvinces}
                getOptionLabel={option => option.name_th || ''}
                renderInput={params => <CustomTextField {...params} label='ที่อยู่จังหวัด' />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} size='small' {...getTagProps({ index })} key={index} />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                fullWidth
                value={formData.amphures}
                onChange={(event, value) => handleChangeAmphures(value)}
                id='select-furnishing-details'
                options={Amphures}
                defaultValue={formData.amphures}
                getOptionLabel={option => option.name_th || ''}
                renderInput={params => <CustomTextField {...params} label='อำเภอ' />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} size='small' {...getTagProps({ index })} key={index} />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                fullWidth
                value={formData.districts}
                onChange={(event, value) => handleChangeDistricts(value)}
                id='select-furnishing-details'
                options={Districts}
                defaultValue={formData.districts}
                getOptionLabel={option => option.name_th || ''}
                renderInput={params => <CustomTextField {...params} label='ตำบล / แขวง' />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} size='small' {...getTagProps({ index })} key={index} />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='รหัสไปรษณ์ย์'
                type='number'
                name='zipCode'
                variant='outlined'
                placeholder='99950'
                value={formData.zipCode}
                onChange={e => setformData({ ...formData, zipCode: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={() => onSubmit()} type='submit'>
            {data ? 'Update' : 'Submit'}
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              setOpen(false)
              setSelected(initialSelected)
            }}
            type='reset'
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEditAddress
