import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import sv from 'date-fns/locale/sv'
import 'react-datepicker/dist/react-datepicker.css'
import { postDate, getDates } from './api'

registerLocale('sv', sv)

const DateController = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const setDate = (date: Date) => {
    setSelectedDate(date)
    postDate(date)
  }

  const getDate = async () => {
    const dateList = await Promise.resolve(getDates())
    const newDate = dateList[dateList.length - 1]

    console.log(newDate.date)

    const dateToUTC = new Date(newDate.date)

    setSelectedDate(dateToUTC)
  }

  useEffect(() => {
    getDate()
  }, [])

  return (
    <div className="app">
      <div className="container">
        <h2 className="title">Nästa speltillfälle är den:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={setDate}
          dateFormat="dd-MM-yyyy"
          locale="sv"
        />
      </div>
    </div>
  )
}

export default DateController
