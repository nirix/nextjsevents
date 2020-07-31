const API_URL = 'http://localhost:3000'

export async function getEventByIndex(index) {
  const res = await fetch(`${API_URL}/api/events/${index}`)
  const event = await res.json()

  return event
}

export async function queryEvents(query, startDate, endDate) {
  const searchEndpoint = (query, startDate, endDate) => {
    const url = `${API_URL}/api/events?`
    let bits = []

    if (query) {
      bits.push(`q=${query}`)
    }

    // Start and End date
    if (startDate) {
      bits.push(`startDate=${startDate}`)
    }
    if (endDate) {
      bits.push(`endDate=${endDate}`)
    }

    return `${url}${bits.join('&')}`
  }

  const res = await fetch(searchEndpoint(query, startDate, endDate))
  const events = await res.json()

  return events
}