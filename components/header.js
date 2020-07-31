import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from 'react-bootstrap'

export default function Header() {
  return (
    <>
      <Head>
        <title>Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Events</Navbar.Brand>
      </Navbar>
    </>
  )
}
