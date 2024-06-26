'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import Typography from '@mui/material/Typography'

import FormatNumber from '@components/FormatNumber'

// Style Imports

import styles from '@core/styles/table.module.css'
import CustomTextField from '@core/components/mui/TextField'

// Data Imports
// import defaultData from './data'

const ListBooking = ({ itemDevice, tbHead = [], setitemdevice, setFooter }) => {
  // {
  //   id: 10,
  //   device_photo: 'd1.jpg',
  //   device_name: 'โคมไฟ',
  //   device_dsc: 'โคมไฟ ตั้งดโต๊ะ ขนาดเล็ก',
  //   device_price_unit: 0,
  //   device_num: 0,
  //   device_total_price: 0
  // },

  const [subTotal, setSubTotal] = useState(0)
  const [vatTotal, setvatTotal] = useState(0)
  const [taxTotal, settaxTotal] = useState(0)
  const [Total, setTotal] = useState(0)

  useEffect(() => {
    async function sumAll() {
      const sumSubtotal = await fucSubTotal()
      const sub_vat = sumSubtotal * 1.07 - sumSubtotal
      const total = sumSubtotal * 1.07
      const sub_withholding_tax = sumSubtotal >= 1000 ? sumSubtotal * 1.03 - sumSubtotal : 0

      await setSubTotal(sumSubtotal)
      await setvatTotal(sub_vat)
      await settaxTotal(sub_withholding_tax)
      await setTotal(total)

      await setFooter({
        f_sub_total: sumSubtotal,
        f_sub_vat: sub_vat,
        f_sub_withholding_tax: sub_withholding_tax,
        f_total: total
      })
    }

    sumAll()
  }, [itemDevice])

  async function setvalueNum(IDRowItem, IDInput, val) {
    // console.log('itemDevice', itemDevice, IDRowItem, IDInput, val)

    const num_ = val == '' ? 0 : parseInt(val) < 0 ? 0 : parseInt(val)

    //new

    const dataNew = itemDevice.map(i => {
      if (i.id === IDRowItem) {
        const dataDevice = i.tb_date_use.map(i2 => {
          if (i2.id === IDInput) {
            return { ...i2, num: num_ }
          } else {
            return i2
          }
        })

        // console.log('11', dataDevice)

        let totalRow = dataDevice.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.num), 0)

        let total_price = totalRow * i.device_price_unit

        return { ...i, tb_date_use: dataDevice, total_price }
      } else {
        return i
      }
    })

    console.log(dataNew)

    await setitemdevice([...dataNew])
  }

  function fucSubTotal() {
    const subTotal_ = itemDevice.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue.total_price),
      0
    )

    return subTotal_
  }

  function formatBaht(number) {
    // ตรวจสอบประเภทข้อมูล
    if (typeof number !== 'number') {
      return 'Invalid input'
    }

    // กำหนดตัวเลือกการ format เงิน
    const options = {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }

    // แปลงตัวเลขเป็นสกุลเงินบาท
    const formattedBaht = new Intl.NumberFormat('th-TH', options).format(number)

    return formattedBaht
  }

  return (
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
            {/* <th>รายละเอียด</th> */}
            <th>ราคาต่อหน่วย</th>
            {tbHead.map(i => (
              <th key={i.id}>{i.date_use_title}</th>
            ))}

            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          {itemDevice.map((row, k) => (
            <tr key={row.id}>
              <td>
                <img alt='iPhone 11 Pro' src={row.tb_equipment.eq_photo} height={80} />
              </td>
              <td>
                <Typography color='text.primary'>{row.tb_equipment.eq_name}</Typography>
              </td>
              {/* <td>
                <Typography color='text.primary'>{row.tb_equipment.eq_detail}</Typography>
              </td> */}
              <td>
                <FormatNumber number={row.device_price_unit} />
              </td>
              {row.tb_date_use.map((i, k2) => (
                <td key={i.id} style={{ width: '15%' }}>
                  <CustomTextField
                    fullWidth
                    type='number'
                    value={i.num}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={async e => await setvalueNum(row.id, i.id, e.target.value)}
                  />
                </td>
              ))}

              <td style={{ width: '15%', textAlign: 'right' }}>
                <Typography color='text.primary'>
                  <FormatNumber number={row.total_price} />
                </Typography>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={tbHead.length + 3} style={{ textAlign: 'right' }}>
              รวมเงิน
            </td>
            <td style={{ textAlign: 'right' }}>
              <Typography color='text.primary'>
                <FormatNumber number={subTotal} />
              </Typography>
            </td>
          </tr>

          <tr>
            <td colSpan={tbHead.length + 3} style={{ textAlign: 'right' }}>
              ภาษีมูลค่าเพิ่ม 7%
            </td>
            <td style={{ textAlign: 'right' }}>
              <Typography color='text.primary'>
                <FormatNumber number={vatTotal} />
              </Typography>
            </td>
          </tr>
          <tr>
            <td colSpan={tbHead.length + 3} style={{ textAlign: 'right' }}>
              หัก ณ ที่จ่าย 3%
            </td>
            <td style={{ textAlign: 'right' }}>
              <Typography color='text.primary'>
                <FormatNumber number={taxTotal} />
              </Typography>
            </td>
          </tr>
          <tr>
            <td colSpan={tbHead.length + 3} style={{ textAlign: 'right' }}>
              จำนวนเงินทั้งสิ้น
            </td>
            <td style={{ textAlign: 'right' }}>
              <Typography color='text.primary'>
                <FormatNumber number={Total} />
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ListBooking
