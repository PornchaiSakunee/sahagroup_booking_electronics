'use client'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

// import ListBooking from './ListBooking'
// import ListRequest from './listRequest'

import Grid from '@mui/material/Grid'

import classnames from 'classnames'

import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Style Imports

import { isAfter, format } from 'date-fns'

// import getFormItem from '@components/utls'

import { getFormItem, getAddress, getTrans, AddForm } from '@/utils/apiCall'

import tableStyles from '@core/styles/table.module.css'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

import ListItem from './ListItem'
import CustomInputVertical from '@core/components/custom-inputs/Vertical'

import Address from './Address'

// Vars
const data = {
  title: 'Earl rate',
  value: 'builder',
  content: 'Within 15 March 2023',
  asset: 'tabler-building',
  isSelected: true
}

const furnishingArray = ['A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A007', 'A008', 'A009', 'A010']

const Index = ({ masterId, id }) => {
  const router = useRouter()

  const [DataDevice, setDevice] = useState([])
  const [selectedOption, setSelectedOption] = useState([])
  const [bootDefault, setBootDefault] = useState([])

  const [DataForm, setDataForm] = useState([])

  const [DataAdr, setDataAdr] = useState([])
  const [DataTrans, setDataTrans] = useState([])
  const [DataBoot, setDataBoot] = useState([])

  const [FormAddress, setFormAddress] = useState(null)

  const [ListFooter, setListFooter] = useState({
    f_sub_total: 0,
    f_sub_vat: 0,
    f_sub_withholding_tax: 0,
    f_total: 0
  })

  useEffect(() => {
    console.log('dddd', DataDevice)
  }, [DataDevice])

  useEffect(() => {
    getFormItem_()
  }, [])

  async function onsubmit() {
    const mapBooot = await bootDefault.map(i => {
      const filterBoot = DataTrans.sahagroupfair_trans[0].tb_booth.filter(i2 => i2.boothname === i)

      return { tb_booth_id: filterBoot[0].id }
    })

    let equest_equipment = []

    for (let index = 0; index < DataDevice.length; index++) {
      const itemD = DataDevice[index]

      const filterData = itemD.tb_date_use.filter(i => i.num > 0)

      let itemInDay = filterData.map(i => ({
        freq_quantity: i.num,
        freq_total_price: itemD.total_price,
        tb_equipment_fair_id: itemD.id,
        tb_date_use_id: i.id
      }))

      equest_equipment = [...equest_equipment, ...itemInDay]
    }

    let formData = {
      master_id: masterId,
      trans_id: DataTrans.sahagroupfair_trans[0].etag,
      tb_form_request: {
        ...ListFooter,
        f_address_open: FormAddress,
        f_address_send: FormAddress,
        tb_form_request_equipment: equest_equipment,
        tb_form_request_booth: mapBooot,
        f_delete: 'N'
      }
    }

    if (FormAddress == null) {
      alert('กรุณาเลือกที่อยู่ในการเปิดบิล')
    } else if (mapBooot.length === 0) {
      alert('กรุณาเลือกบูธ')
    } else if (equest_equipment.length === 0) {
      alert('กรุณากรอก จำนวนอุปกรณ์อย่างน้อย 1 รายการ')
    } else {
      if (confirm('ยืนยันการจองอุปกรณ์')) {
        console.log('formData', formData)

        const addFormData = await AddForm(formData, id)

        if (addFormData.status) {
          router.push('/order-history')
        }
      }
    }
  }

  async function getFormItem_() {
    // parses JSON response into native JavaScript objects

    const dataForm = await getFormItem(masterId, id)
    const ddr = await getAddress()
    const dataTrans_ = await getTrans(masterId)

    setDataForm(dataForm)
    setDataAdr(ddr)
    setDataTrans(dataTrans_)

    const databoot_ = dataTrans_.sahagroupfair_trans[0].tb_booth.map(i => i.boothname)

    // console.log('databoot_', databoot_)

    setDataBoot(databoot_)

    // console.log('fff', dataForm)

    const today = new Date()

    const filInput = dataForm.tb_date_use.map(i => ({ id: i.id, num: 0 }))

    console.log('filInput', filInput)

    if (typeof dataForm.tb_equipment_fair != 'undefined') {
      const mapDataItem = dataForm.tb_equipment_fair.map(i => {
        const deadline = new Date(i.eqf_price_special_date)

        let price_unit = isAfter(today, deadline) ? i.eqf_price_normal + 1 : i.eqf_price_special

        return { ...i, device_price_unit: price_unit, total_price: 0, tb_date_use: filInput }
      })

      setDevice([...mapDataItem])
    }
  }

  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption(prop.target.value)
    }
  }

  const onAdrAction = async prop => {
    console.log(prop)

    if (prop === true) {
      const ddr = await getAddress()

      setDataAdr(ddr)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardHeader title={DataForm.f_name} className='pbe-4' />
          <CardContent>
            <Grid container spacing={6}>
              {/* <Grid item xs={12}>
                <div className='p-6 bg-actionHover rounded'>
                  <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                    <div className='flex flex-col gap-6'>
                      <div className='flex items-center gap-2.5'>
                        <Typography variant='h4' color='text.primary'>
                          {data.title}
                        </Typography>
                      </div>
                      <div>
                        <Typography color='text.primary'> {data.content} </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid> */}
              <Grid item xs={12}>
                <Address dataAdr={DataAdr} setDataAdr={setDataAdr} setAddress={setFormAddress} onAction={onAdrAction} />
              </Grid>

              <Grid item xs={12}>
                <CustomAutocomplete
                  fullWidth
                  multiple
                  value={bootDefault}
                  onChange={(event, value) => setBootDefault(value)}
                  id='select-furnishing-details'
                  options={DataBoot}
                  defaultValue={bootDefault}
                  getOptionLabel={option => option || ''}
                  renderInput={params => <CustomTextField {...params} label='บูท' />}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} size='small' {...getTagProps({ index })} key={index} />
                    ))
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <ListItem
                  itemDevice={DataDevice}
                  tbHead={DataForm.tb_date_use}
                  setitemdevice={setDevice}
                  setFooter={setListFooter}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button type='submit' variant='contained' onClick={() => onsubmit()} className='mie-2'>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Index
