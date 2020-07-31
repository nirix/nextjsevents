import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'
import Event from '../pages/events/[id]'

test('renders event list', () => {
  const { getByText } = render(<Index />)
  const dateFilter = getByText(
    /Date/
  )
  expect(dateFilter).toBeInTheDocument()
})

test('renders event page', () => {
  const event =   {
    Title: "Test Event",
    Time: "2020-04-01T02:30:00.000Z",
    Image: "http://example.com/image.png",
    Location: {
      City: "Melbourne",
      State: "Victoria",
      Country: "Australia",
    },
    AvailableSeats: [
      {
        id: "A12"
      }
    ]
  }

  const { getByText } = render(<Event event={event} />)
  const locationText = getByText(
    /Melbourne, Victoria, Australia/
  )
  expect(locationText).toBeInTheDocument()
})
