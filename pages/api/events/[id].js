const events = require('../../../data/events')

export default function eventHandler({ query: { id } }, res) {
  const event = events[id]

  if (event) {
    res.status(200).json(event)
  } else {
    res.status(404).json({ message: `Event with id: ${id} was not found.` })
  }
}
