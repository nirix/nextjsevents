import Header from '../components/header'
import EventList from '../components/event-list'

function Home() {
  return (
    <div>
      <Header />

      <main className="container">
        <h1 className="title">
          Events
        </h1>

        <EventList />
      </main>
    </div>
  )
}

export default Home
