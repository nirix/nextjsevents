import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { Row, Col, Form, Card, ListGroup } from 'react-bootstrap'
import { queryEvents } from '../lib/api'
import moment from 'moment'

export default function EventList() {
  const [query, setQuery] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [events, setEvents] = useState([])

  const fetchEvents = (query, startDate, endDate) => {
    queryEvents(query, startDate, endDate)
      .then(events => setEvents(events))
  }

  const onQueryChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    fetchEvents(query, startDate, endDate)
  }, [startDate, endDate])

  const onStartDateChange = useCallback((event) => {
    const startDate = event.target.value;
    setStartDate(startDate)
    fetchEvents(query, startDate, endDate)
  }, [query, endDate])

  const onEndDateChange = useCallback((event) => {
    const endDate = event.target.value;
    setEndDate(endDate)
    fetchEvents(query, startDate, endDate)
  }, [query, startDate])

  let listItems = ''
  if (events.length) {
    listItems = events.map((event, index) => {
      const formattedTime = moment(event.Time).format('MMMM Do YYYY, h:mm:ss a')
      const availableSeats = event.AvailableSeats ? `${event.AvailableSeats.length} seats` : 'No seats'
      const formattedLocation = Object.values(event.Location).join(', ')

      return (<ListGroup.Item key={index}>
        <Link href="/events/{id}" as={`/events/${event.index}`} replace>
          <a>{event.Title}</a>
        </Link>
        <div className="text-muted">{formattedTime}</div>
        <div className="text-muted">{availableSeats} in {formattedLocation}</div>
      </ListGroup.Item>)
    })
  } else {
    listItems = (
      <ListGroup.Item>No Events</ListGroup.Item>
    )
  }

  return (
    <>
      <Row>
        <Col md="3">
          <Form.Label>Search</Form.Label>
          <Form.Control onChange={onQueryChange}></Form.Control>
        </Col>
        <Col md="4">
          <Form.Label>Date (from -&gt; to)</Form.Label>
          <Row>
            <Col md="6">
              <Form.Control type="date" onChange={onStartDateChange} />
            </Col>
            <Col md="6">
              <Form.Control type="date" onChange={onEndDateChange} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Card className="mt-2 mb-2">
        <ListGroup variant="flush">
          {listItems}
        </ListGroup>
      </Card>
    </>
  )
}