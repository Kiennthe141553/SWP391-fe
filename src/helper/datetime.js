import momentTz from 'moment-timezone'

export const getDubaiDateTimeMoment = (
  dateTime,
  outputFormat = 'DD/MM/YYYY HH:mm:ss',
  inputFormat = 'DD/MM/YYYY'
) => {
  if (!dateTime) {
    return null
  }

  let m = ''

  if (typeof dateTime === 'number') {
    m = momentTz(dateTime).tz('Asia/Ho_Chi_Minh')
  }

  if (typeof dateTime === 'string') {
    m = momentTz(dateTime, inputFormat).tz('Asia/Ho_Chi_Minh')
  }

  return m && typeof m === 'object' ? m : null
}

export const getDateTime = (
  dateTime,
  outputFormat = 'DD/MM/YYYY HH:mm:ss',
  inputFormat = 'DD/MM/YYYY'
) => {
  const m = getDubaiDateTimeMoment(
    dateTime,
    outputFormat,
    inputFormat
  )

  return m && typeof m === 'object' ? m.format(outputFormat) : ''
}