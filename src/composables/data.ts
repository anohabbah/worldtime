import timezoneRaw from 'timezones.json'

export const timezones = timezoneRaw.flatMap((i) => {
  return i.utc.map(u => ({ name: u, offset: i.offset, isdst: i.isdst }))
})
