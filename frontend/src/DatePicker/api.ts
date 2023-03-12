export type DateType = {
  _id: string
  date: Date
}

export const getDates = (): Promise<DateType[]> => {
  return fetch('http://127.0.0.1:5000/calendar', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token h!!sf3423432rr4ff',
    },
  })
    .then((result) => {
      return result
        .json()
        .then((value) => {
          return value
        })
        .catch(() => console.log('Incorrect JSON'))
    })
    .catch(() => console.log('Server is down'))
}

export const postDate = (date: Date) => {
  return fetch('http://127.0.0.1:5000/calendar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token h!!sf3423432rr4ff',
    },
    body: JSON.stringify({
      date: date,
    }),
  }).catch(() => {
    return new Error('Ivalid argument')
  })
}
