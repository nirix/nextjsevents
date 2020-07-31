const events = require('../../../data/events')

function locationRexExpBuilder(location) {
  let parts = Object.values(location).map((part) => {
    return `(${part})?`
  })

  return new RegExp(parts.join('( |, )?'))
}

export default (req, res) => {
  res.statusCode = 200

  let filteredEvents = events.map((event, index) => {
    // Add the index to the event so that once we've filtered them down we retain
    // their original index as opposed to their new, filtered index.
    event.index = index
    return event
  });

  // Query by title
  if (req.query.q) {
    filteredEvents = filteredEvents.filter((event) => {
      // Match lowercase as the user may enter a string in any case.
      return event.Title.toLowerCase().includes(req.query.q.toLowerCase())
    })
  }

  // Location filter by city, state and country
  if (req.query['location.city']) {
    filteredEvents = filteredEvents.filter((event) => {
      return event.Location.City.toLowerCase() == req.query['location.city'].toLowerCase()
    })
  }
  if (req.query['location.state']) {
    filteredEvents = filteredEvents.filter((event) => {
      return event.Location.State.toLowerCase() == req.query['location.state'].toLowerCase()
    })
  }
  if (req.query['location.country']) {
    filteredEvents = filteredEvents.filter((event) => {
      return event.Location.Country.toLowerCase() == req.query['location.country'].toLowerCase()
    })
  }

  res.json(filteredEvents)
}