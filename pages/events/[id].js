import Header from '../../components/header'
import { getEventByIndex, queryEvents } from '../../lib/api'
import { Card, Row, Col } from 'react-bootstrap'
import moment from 'moment'

function Event({ event }) {
  let formattedTime = moment(event.Time).format('MMMM Do YYYY, h:mm:ss a')
  let formattedLocation = Object.values(event.Location).join(', ')

  let seats = []
  if (event.AvailableSeats) {
    seats = event.AvailableSeats.map((seat) => {
      return (<Col sm="3" key={seat.id}>
        <Card bg="secondary" text="light" className="p-3">{seat.id}</Card>
      </Col>)
    })
  } else {
    seats.push(
      <div className="pl-3 text-muted">No seats available</div>
    )
  }

  return (
    <div>
      <Header title={event.Title} />
      
      <main className="container">
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>{event.Title}</Card.Title>
            <Row>
              <Col sm="3">
                <strong>Date</strong>
                <div>{formattedTime}</div>
              </Col>
              <Col>
                <strong>Location</strong>
                <div>{formattedLocation}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mt-2">
          <Card.Body>
            <Card.Title>Available Seats</Card.Title>
            <Row>
              {seats}
            </Row>
          </Card.Body>
        </Card>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const event = await getEventByIndex(params.id)

  return {
    props: {
      event,
    },
  }
}

export async function getStaticPaths() {
  const events = await queryEvents()

  return {
    paths: events.map((event, index) => {
      return {
        params: {
          id: index.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export default Event
