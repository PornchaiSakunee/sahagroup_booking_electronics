'use client'
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Component Imports
import { parseISO, format } from 'date-fns'

// import Logo from '@components/layout/shared/Logo'
import FormatNumber from '@components/FormatNumber'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const ViewOrder = ({ dataOrder }) => {
  // const [subTotal, setSubTotal] = useState(0)
  // const [vatTotal, setvatTotal] = useState(0)
  // const [Total, setTotal] = useState(0)

  // useEffect(() => {
  //   async function sumAll() {
  //     const sumSubtotal = await fucSubTotal()

  //     await setSubTotal(sumSubtotal)
  //     await setvatTotal(sumSubtotal * 1.07 - sumSubtotal)
  //     await setTotal(sumSubtotal * 1.07)
  //   }

  //   sumAll()
  // }, [])

  // function fucSubTotal() {
  //   const subTotal_ = dataItem.reduce(
  //     (accumulator, currentValue) => accumulator + parseInt(currentValue.device_total_price),
  //     0
  //   )

  //   return subTotal_
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='p-6 bg-actionHover rounded'>
          <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
            <div className='flex flex-col gap-6'>
              {/* <div className='flex items-center gap-2.5'>
                <Typography variant='h4' color='text.primary'>
                  {invoiceData.form_name}
                </Typography>
              </div> */}
              <div className='flex items-center gap-2'>
                <Typography color='text.primary'>บูธ : </Typography>
                {dataOrder.tb_form_request_booth.map((i, k) => (
                  <Typography key={k} color='text.primary'>
                    {i.tb_booth.boothname}
                  </Typography>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <Typography variant='h5'>{`เลขที่ใบจอง : ${dataOrder.id}`}</Typography>
              <div className='flex flex-col gap-1'>
                <Typography color='text.primary'>{`วันที่จอง: ${format(parseISO(dataOrder.createdAt), 'dd-MM-yyyy HH:mm:ss')}`}</Typography>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <div className='flex flex-col gap-4'>
              <Typography className='font-medium' color='text.primary'>
                ที่อยู่เปิดบิล:
              </Typography>
              <div>
                <Typography>{dataOrder.address_open.user.customer.cus_company}</Typography>
                <Typography>{dataOrder.address_open.full_address}</Typography>
                {/* <Typography>{invoiceData.companyInfo.comp_tax}</Typography> */}
              </div>
            </div>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>$12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>American Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>United States</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
                  </div>
                </div>
              </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className='overflow-x-auto border rounded'>
          <table className={tableStyles.table}>
            <thead className='border-bs-0'>
              <tr>
                <th className='!bg-transparent'>
                  <Typography className='font-medium'>รูป</Typography>
                </th>
                <th className='!bg-transparent'>
                  <Typography className='font-medium'>ชื่ออุปกรณ์</Typography>
                </th>
                <th className='!bg-transparent'>
                  <Typography className='font-medium'>รายค่าต่อหน่อย</Typography>
                </th>
                {dataOrder.tb_date_use.map((i, k) => (
                  <th key={k} className='!bg-transparent'>
                    <Typography className='font-medium'> {i.date_use_title} </Typography>
                    <Typography className='font-medium'> {i.date_use_startdate} </Typography>
                  </th>
                ))}

                <th className='!bg-transparent'>
                  <Typography className='font-medium'>จำนวนเงิน</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataOrder.tb_form_request_equipment.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img alt='iPhone 11 Pro' src={item.tb_equipment_fair.tb_equipment.eq_photo} height={80} />
                  </td>
                  <td style={{ width: '40%' }}>{item.tb_equipment_fair.tb_equipment.eq_name}</td>
                  <td style={{ width: '15%' }}>
                    <FormatNumber number={parseFloat(item.freq_total_price) / parseFloat(item.freq_quantity)} />
                  </td>
                  {dataOrder.tb_date_use.map((i, k) => (
                    <td style={{ width: '15%', textAlign: 'center' }} key={k}>
                      {i.id === item.tb_date_use.id ? item.freq_quantity : '-'}
                    </td>
                  ))}

                  <td style={{ width: '15%', textAlign: 'right' }}>
                    <FormatNumber number={parseFloat(item.freq_total_price)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className='flex justify-between flex-col gap-y-4 sm:flex-row'>
          <div className='flex flex-col gap-1 order-2 sm:order-[unset]'>
            {/* <div className='flex items-center gap-2'>
              <Typography className='font-medium' color='text.primary'>
                Salesperson:
              </Typography>
              <Typography>Tommy Shelby</Typography>
            </div>
            <Typography>Thanks for your business</Typography> */}
          </div>
          <div className='min-is-[200px]'>
            <div className='flex items-center justify-between'>
              <Typography>รวมเงิน:</Typography>
              <Typography className='font-medium' color='text.primary'>
                <FormatNumber number={parseFloat(dataOrder.f_sub_total)} />
              </Typography>
            </div>
            {/* <div className='flex items-center justify-between'>
                  <Typography>Discount:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    $28
                  </Typography>
                </div> */}
            <Divider className='mlb-2' />
            <div className='flex items-center justify-between'>
              <Typography>ภาษีมูลค่าเพิ่ม 7%:</Typography>
              <Typography className='font-medium' color='text.primary'>
                <FormatNumber number={parseFloat(dataOrder.f_sub_vat)} />
              </Typography>
            </div>
            <Divider className='mlb-2' />
            <div className='flex items-center justify-between'>
              <Typography>หัก ณ ที่จ่าย 3%:</Typography>
              <Typography className='font-medium' color='text.primary'>
                <FormatNumber number={parseFloat(dataOrder.f_sub_withholding_tax)} />
              </Typography>
            </div>
            <Divider className='mlb-2' />
            <div className='flex items-center justify-between'>
              <Typography>จำนวนเงินทั้งสิ้น:</Typography>
              <Typography className='font-medium' color='text.primary'>
                <FormatNumber number={parseFloat(dataOrder.f_total)} />
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider className='border-dashed' />
      </Grid>
      {/* <Grid item xs={12}>
        <Typography>
          <Typography component='span' className='font-medium' color='text.primary'>
            Note:
          </Typography>{' '}
          It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
          projects. Thank You!
        </Typography>
      </Grid> */}
    </Grid>
  )
}

export default ViewOrder
