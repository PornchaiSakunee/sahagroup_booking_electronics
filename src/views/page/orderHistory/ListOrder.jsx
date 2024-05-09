'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import { parseISO, format } from 'date-fns'

// Component Imports
import Grid from '@mui/material/Grid'

import pdfMake from 'pdfmake/build/pdfmake'

import pdfFonts from '@assets/fonts/custom-fonts'

import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

import CustomAutocomplete from '@core/components/mui/Autocomplete'

// Util Imports
import { getInitials } from '@/utils/getInitials'

import { getFormHistory, cancelForm, delForm } from '@/utils/apiCall'
import FormatNumber from '@components/FormatNumber'

// import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

import OrderDetail from '@components/dialogs/order-detail'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'tabler-send-2' },
  Paid: { color: 'success', icon: 'tabler-check' },
  Draft: { color: 'primary', icon: 'tabler-mail' },
  'Partial Payment': { color: 'warning', icon: 'tabler-chart-pie-2' },
  'Past Due': { color: 'error', icon: 'tabler-alert-circle' },
  Downloaded: { color: 'info', icon: 'tabler-arrow-down' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const ListOrder = () => {
  const router = useRouter()

  const buttonProps = {
    className: 'cursor-pointer bs-full',
    children: (
      <IconButton>
        <Link href={'/order-view/'} className='flex'>
          <i className='tabler-eye text-[22px] text-textSecondary' />
        </Link>
      </IconButton>
    )

    // onClick: () => setDataUpdate(null)
  }

  // States
  const [status, setStatus] = useState('N')

  const [rowSelection, setRowSelection] = useState({})

  const [DataListOrder, setDataListOrder] = useState([])

  const [DataListOrderTable, setDataListOrderTable] = useState([])

  const [globalFilter, setGlobalFilter] = useState('')

  const [FilterData, setFilterData] = useState({ fair: null })

  const [DataFair, setDataFair] = useState([])

  const [DataHistory, setDataHistory] = useState([])

  const [open, setOpen] = useState(false)

  const [OnCancel, setOnCancel] = useState(null)

  const [DataDialogView, setDataDialogView] = useState(null)

  // Hooks
  const { lang: locale } = useParams()

  useEffect(() => {
    if (DataHistory.length > 0) {
      const filterData_ = DataListOrder.filter(i => i.f_delete === status)

      setDataListOrderTable(filterData_)
    }
  }, [status])

  useEffect(() => {
    if (OnCancel != null) {
      // { id: id_form_q, typRes: 'DELETE' }
      let mapNewData = []

      if (OnCancel.typRes === 'DELETE') {
        mapNewData = DataListOrder.filter(i => i.id !== OnCancel.id)
      } else {
        mapNewData = DataListOrder.map(i => {
          if (i.id === OnCancel.id) {
            return { ...i, f_delete: 'Y' }
          } else {
            return i
          }
        })
      }

      setDataListOrder(mapNewData)
      const filterData_ = mapNewData.filter(i => i.f_delete === status)

      // console.log('mapNewData', DataListOrder, mapNewData)

      setDataListOrderTable(filterData_)
    }
  }, [OnCancel])

  useEffect(() => {
    if (DataDialogView != null) {
      setOpen(true)
    }

    // console.log('fff', DataDialogView)
  }, [DataDialogView])

  const columns = useMemo(
    () => [
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <Checkbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler()
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       {...{
      //         checked: row.getIsSelected(),
      //         disabled: !row.getCanSelect(),
      //         indeterminate: row.getIsSomeSelected(),
      //         onChange: row.getToggleSelectedHandler()
      //       }}
      //     />
      //   )
      // },
      columnHelper.accessor('id', {
        header: 'เลขที่ใบจอง',
        cell: ({ row }) => <Typography>{`${row.original.id}`}</Typography>
      }),

      columnHelper.accessor('f_delete', {
        header: 'สถานะ',
        cell: ({ row }) => (
          <Tooltip
            title={
              <div>
                <Typography variant='body2' component='span' className='text-inherit'>
                  {row.original.f_delete === 'N' ? 'ปกติ' : 'ถูกยกเลิก'}
                </Typography>
              </div>
            }
          >
            <CustomAvatar skin='light' color={row.original.f_delete === 'N' ? 'success' : 'error'} size={28}>
              <i
                className={classnames('bs-4 is-4', row.original.f_delete === 'N' ? 'tabler-check' : 'tabler-square-x')}
              />
            </CustomAvatar>
          </Tooltip>
        )
      }),
      columnHelper.accessor('f_name', {
        header: 'ชื่อแบบฟอร์ม',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {/* {getAvatar({ avatar: row.original.avatar, name: row.original.name })} */}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.f_name}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('f_total', {
        header: 'ยอดรวม',
        cell: ({ row }) => (
          <Typography>
            <FormatNumber number={parseFloat(row.original.f_total)} />
          </Typography>
        )
      }),
      columnHelper.accessor('createdAt', {
        header: 'วันที่จอง',
        cell: ({ row }) => <Typography>{format(parseISO(row.original.createdAt), 'dd-MM-yyyy HH:mm:ss')}</Typography>
      }),
      columnHelper.accessor('tb_form_request_booth', {
        header: 'บูท',
        cell: ({ row }) => (
          <div className='flex items-center gap-3 '>
            {row.original.tb_form_request_booth.map((i, k) => (
              <Typography key={k}>{i.tb_booth.boothname}</Typography>
            ))}
          </div>
        )
      }),
      columnHelper.accessor('f_action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton
              onClick={() =>
                cancelOrder(
                  row.original.fair_id,
                  row.original.sahagroupfair_trans_id,
                  row.original.id,
                  row.original.f_delete
                )
              }
            >
              {/* <i className='tabler-trash text-[22px] text-textSecondary' />  */}

              {row.original.f_delete === 'Y' ? (
                <i className='tabler-trash text-[22px] text-textSecondary' />
              ) : (
                <i className='tabler-square-x text-[22px] text-textSecondary' />
              )}
            </IconButton>
            {/* <OpenDialogOnElementClick
              element={IconButton}
              elementProps={buttonProps}
              dialog={OrderDetail}
              exOpen={false}

      
            /> */}
            <IconButton onClick={() => setDataDialogView({ ...row.original })}>
              <i className='tabler-eye text-[22px] text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => printPDF(row.original)}>
              <i className='tabler-download text-[22px] text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: DataListOrderTable,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  // const getAvatar = params => {
  //   const { avatar, name } = params

  //   if (avatar) {
  //     return <CustomAvatar src={avatar} skin='light' size={34} />
  //   } else {
  //     return (
  //       <CustomAvatar skin='light' size={34}>
  //         {getInitials(name)}
  //       </CustomAvatar>
  //     )
  //   }
  // }

  const cancelOrder = async (fair_id, id_tran, id_form_q, f_delete) => {
    const ms =
      f_delete === 'Y' ? 'ยืนยันการลบรายจอง ระบบจะลบรายการจองแบบถาวร ยืนยันที่จะลบหรือไม่' : 'ยืนยันการยกเลิกรายการจอง'

    if (confirm(ms)) {
      // console.log(fair_id, id_tran, id_form_q)

      if (f_delete === 'Y') {
        const res = await delForm(fair_id, id_tran, id_form_q)

        if (res.status) {
          setOnCancel({ id: id_form_q, typRes: 'DELETE' })
        }

        alert(res.msg)
      } else {
        const res = await cancelForm(fair_id, id_tran, id_form_q)

        if (res.status) {
          setOnCancel({ id: id_form_q, typRes: 'CANCEL' })
        }

        alert(res.msg)
      }
    }
  }

  const SetItemOrder = async (dataHis, fair_id) => {
    // console.log(data) tb_form
    const data_ = dataHis.filter(i => i.etag === fair_id)

    let dataOrderfair = []

    for (let index1 = 0; index1 < data_.length; index1++) {
      const dataF = data_[index1]

      for (let index = 0; index < dataF.tb_form.length; index++) {
        const Iorder = dataF.tb_form[index]

        const mapDat = Iorder.tb_form_request.map(i => ({
          ...i,
          f_name: Iorder.f_name,
          fair_id: dataF.etag,
          f_action: null
        }))

        dataOrderfair = [...dataOrderfair, ...mapDat]
      }
    }

    // console.log('dataOrderfair', dataOrderfair)

    const filterData_ = dataOrderfair.filter(i => i.f_delete === status)

    console.log('gggg', filterData_)
    await setDataListOrderTable(filterData_)
    await setDataListOrder(dataOrderfair)
  }

  useEffect(() => {
    async function getDataHistory() {
      const dataHis = await getFormHistory()

      const dataFair_ = dataHis.map(i => ({ id: i.etag, fairName: i.fairName }))

      if (dataFair_.length > 0) {
        // console.log('ffsssf', dataHis[0].tb_form)
        await setFilterData({ ...FilterData, fair: dataFair_[0] })
        await SetItemOrder(dataHis, dataFair_[0].id)
      }

      await setDataFair(dataFair_)

      await setDataHistory(dataHis)
    }

    getDataHistory()
  }, [])

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

  async function convertUrlToBase64(imageUrl) {
    try {
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
      }

      const blob = await response.blob()
      const reader = new FileReader()

      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error converting image:', error)

      return null // Handle the error or return a default value
    }
  }

  async function printPDF(dataOrder) {
    console.log('gen pdf', dataOrder)

    // pdfMake.createPdf(docDefinition).open()
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    pdfMake.fonts = {
      // download default Roboto font from cdnjs.com
      // Roboto: {
      //   normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      //   bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      //   italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      //   bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      // }

      // Kanit Font
      Kanit: {
        // 3. set Kanit font
        normal: 'Kanit-Regular.ttf',
        bold: 'Kanit-Medium.ttf',
        italics: 'Kanit-Italic.ttf',
        bolditalics: 'Kanit-MediumItalic.ttf'
      }
    }

    // const ItemDevice = await dataOrder.tb_form_request_equipment.map(async (i, k) => {
    //   const base64Image = await convertUrlToBase64(i.tb_equipment_fair.tb_equipment.eq_photo)

    //   // console.log(base64Image)

    //   return [
    //     {
    //       image: base64Image,
    //       width: 100,
    //       height: 100
    //     },
    //     { text: i.tb_equipment_fair.tb_equipment.eq_name },
    //     { text: formatBaht(parseFloat(i.freq_total_price) / parseFloat(i.freq_quantity)), alignment: 'right' },
    //     { text: i.freq_quantity, alignment: 'center' },
    //     { text: formatBaht(parseFloat(i.freq_total_price)), alignment: 'right' }
    //   ]
    // })

    // dataOrder.tb_date_use.map((i, k) => (
    let dataWidth = ['*', 100, 50, '*']
    let colTexSpan = []
    let dataHeadTable = [
      { text: 'รูป', alignment: 'center', style: 'tbheader' },
      { text: 'ชื่ออุปกรณ์', alignment: 'center', style: 'tbheader' },
      { text: 'ราค่าต่อหน่อย', alignment: 'center', style: 'tbheader' }
    ]

    for (let index = 0; index < dataOrder.tb_date_use.length; index++) {
      const iDatUse = dataOrder.tb_date_use[index]

      colTexSpan.push({})
      dataHeadTable.push({
        text: iDatUse.date_use_title + '\n' + iDatUse.date_use_startdate,
        alignment: 'center',

        style: 'tbheader'
      })
      dataWidth.push('*')
    }

    dataHeadTable.push({ text: 'จำนวน', alignment: 'center', style: 'tbheader' })

    let ItemDevice = []

    for (let index = 0; index < dataOrder.tb_form_request_equipment.length; index++) {
      const i = dataOrder.tb_form_request_equipment[index]
      const base64Image = await convertUrlToBase64(i.tb_equipment_fair.tb_equipment.eq_photo)

      const dataInDateUse = dataOrder.tb_date_use.map(i2 => {
        if (i2.id === i.tb_date_use.id) {
          return { text: i.freq_quantity, alignment: 'center', style: 'tbbody' }
        } else {
          return { text: '' }
        }
      })

      ItemDevice.push([
        {
          image: base64Image,
          width: 50,
          height: 50
        },
        { text: i.tb_equipment_fair.tb_equipment.eq_name, style: 'tbbody' },
        {
          text: formatBaht(parseFloat(i.freq_total_price) / parseFloat(i.freq_quantity)),
          alignment: 'right',
          style: 'tbbody'
        },
        ...dataInDateUse,
        { text: formatBaht(parseFloat(i.freq_total_price)), alignment: 'right', style: 'tbbody' }
      ])
    }

    console.log('ItemDevice', ItemDevice)

    const docDefinition = {
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 12
        },
        tbheader: {
          fontSize: 8
        },
        tbbody: {
          fontSize: 8
        },
        anotherStyle: {
          alignment: 'center',
          fontSize: 18
        },
        tableExample: {
          fontSize: 10,
          margin: [0, 2, 0, 0]
        },
        textDate: {
          fontSize: 9,
          margin: [0, 3, 0, 0]
        },
        subtitle: {
          fontSize: 10,
          bold: true
        }
      },
      content: [
        {
          text: 'บริษัท สหพัฒนาอินเตอร์โฮลดิ้ง จำกัด (มหาชน)',
          style: 'subheader',
          alignment: 'center'
        },
        {
          text: 'ใบแจ้งยอด ',
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          text: [
            {
              text: `บริษัท : `,
              style: 'subtitle'
            },
            {
              text: dataOrder.address_open.user.customer.cus_company,
              fontSize: 10
            }
          ]
        },
        {
          text: [
            {
              text: `ที่อยู่ : `,
              style: 'subtitle'
            },
            {
              text: dataOrder.address_open.full_address,
              fontSize: 10
            }
          ]
        },

        {
          text: [
            {
              text: `บูธ  : `,
              style: 'subtitle'
            },
            {
              text: dataOrder.tb_form_request_booth.map((i, k) => i.tb_booth.boothname).toString(),
              fontSize: 10
            }
          ]
        },

        // {
        //   text: [
        //     {
        //       text: `ค่าใช้จ่าย : `,
        //       style: 'subtitle'
        //     },
        //     {
        //       text: cost,
        //       fontSize: 10
        //     }
        //   ]
        // },

        {
          style: 'tableExample',
          table: {
            dontBreakRows: true,
            widths: dataWidth,
            body: [
              // [
              //   {
              //     text: 'ผู้เข้าฝึกอบรม',
              //     alignment: 'center',
              //     colSpan: 4,
              //     bold: true
              //   },
              //   {},
              //   {},
              //   {}
              // ],
              [...dataHeadTable],

              ...ItemDevice,
              [
                {
                  text: 'รวมเงิน',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_sub_total)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ],

              [
                {
                  text: 'ภาษีมูลค่าเพิ่ม 7%',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_sub_vat)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ],
              [
                {
                  text: 'หัก ณ ที่จ่าย 3%',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_sub_withholding_tax)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ],
              [
                {
                  text: 'จำนวนเงินทั้งสิ้น',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_total)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ]
            ]
          }
        }
      ],
      defaultStyle: {
        // 4. default style 'KANIT' font to test
        font: 'Kanit'
      },

      footer: function (currentPage, pageCount) {
        return {
          text: currentPage + '/' + pageCount, // Page number information
          alignment: 'right', // Center aligned footer content
          fontSize: 8,
          margin: [0, 0, 20, 0] // Optional: Add margin to the footer
        }
      }
    }

    console.log(docDefinition)

    await pdfMake.createPdf(docDefinition).download('Invoid.pdf')
  }

  function handleChangeDistricts(val) {
    console.log(val)
  }

  return (
    <div>
      <OrderDetail open={open} setOpen={setOpen} data={DataDialogView} />

      <Card>
        <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Typography className='hidden sm:block'>Show</Typography>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='is-[70px]'
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='25'>25</MenuItem>
                <MenuItem value='50'>50</MenuItem>
              </CustomTextField>
            </div>
            <Grid item xs={12}>
              <CustomAutocomplete
                fullWidth
                className='is-[350px]'
                value={FilterData.fair}
                onChange={(event, value) => handleChangeDistricts(value)}
                id='select-furnishing-details'
                options={DataFair}
                defaultValue={FilterData.fair}
                getOptionLabel={option => option.fairName || ''}
                renderInput={params => <CustomTextField {...params} label='' />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} size='small' {...getTagProps({ index })} key={index} />
                  ))
                }
              />
            </Grid>

            {/* <Button
            variant='contained'
            component={Link}
            startIcon={<i className='tabler-plus' />}
            href='#'
            className='is-full sm:is-auto'
          >
            จองอุปกรณ์
          </Button> */}
          </div>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Invoice'
              className='is-[250px]'
            />

            <CustomTextField
              select
              id='select-status'
              value={status}
              onChange={e => setStatus(e.target.value)}
              className='is-[160px]'
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value='N'>รายการปกติ</MenuItem>
              <MenuItem value='Y'>รายการยกเลิก</MenuItem>
            </CustomTextField>
          </div>
        </CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
    </div>
  )
}

export default ListOrder
