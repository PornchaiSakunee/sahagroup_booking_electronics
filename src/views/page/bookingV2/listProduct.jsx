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

const ListProducts = ({ product, res }) => {
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
  const [Total, setTotal] = useState(0)

  useEffect(() => {
    async function sumAll() {
      const sumSubtotal = await fucSubTotal()

      await setSubTotal(sumSubtotal)
      await setvatTotal(sumSubtotal * 1.07 - sumSubtotal)
      await setTotal(sumSubtotal * 1.07)
    }

    sumAll()
  }, [product])

  async function setvalueNum(id, val) {
    const deviceIndex = product.findIndex(device => device.id === id)

    if (deviceIndex !== -1) {
      // const ItemNew = formData[deviceIndex].device_price_unit = val
      product[deviceIndex] = {
        ...product[deviceIndex],
        device_num: val,
        device_total_price: parseInt(product[deviceIndex].device_price_unit) * val
      }

      await setproduct([...product])
    }
  }

  function fucSubTotal() {
    const subTotal_ = product.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue.device_total_price),
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
            <th>รายละเอียด</th>
            <th>ราคาต่อหน่วย</th>
            <th>จำนวน</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          {product.map((row, k) => (
            <tr key={row.id}>
              <td>
                <img alt='iPhone 11 Pro' src={'/images/fair/' + row.device_photo} height={80} />
              </td>
              <td style={{ width: '20%' }}>{row.device_name}</td>
              <td style={{ width: '20%' }}>{row.device_dsc}</td>
              <td style={{ width: '15%', textAlign: 'right' }}>
                <FormatNumber number={row.device_price_unit} />
              </td>
              <td style={{ width: '15%' }}>
                <CustomTextField fullWidth type='number' onChange={e => setvalueNum(row.id, e.target.value)} />
              </td>
              <td style={{ width: '15%', textAlign: 'right' }}>
                <Typography color='text.primary'>
                  <FormatNumber number={row.device_total_price} />
                </Typography>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} style={{ textAlign: 'right' }}>
              sub total
            </td>
            <td style={{ textAlign: 'right' }}>
              <Typography color='text.primary'>
                <FormatNumber number={subTotal} />
              </Typography>
            </td>
          </tr>
          <tr>
            <td colSpan={5} style={{ textAlign: 'right' }}>
              Vat 7%
            </td>
            <td style={{ textAlign: 'right' }}>
              <Typography color='text.primary'>
                <FormatNumber number={vatTotal} />
              </Typography>
            </td>
          </tr>
          <tr>
            <td colSpan={5} style={{ textAlign: 'right' }}>
              Total
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

export default ListProducts
