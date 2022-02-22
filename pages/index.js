import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'

function index() {
  return (
    <div className="">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="
      -slate-200 h-screen"
      >
        {/* Header */}
        <Header />
        {/* Feed */}
        <Feed />
        {/* Modal */}
      </div>
    </div>
  )
}

export default index
