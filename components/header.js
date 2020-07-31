import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from 'react-bootstrap'

export default function Header({ title }) {
  const pageTitle = title ? title : 'Events'
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Events</Navbar.Brand>
      </Navbar>
    </>
  )
}
