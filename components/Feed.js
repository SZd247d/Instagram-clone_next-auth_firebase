import { useSession } from 'next-auth/react'
import React from 'react'
import Miniprofile from './Miniprofile'
import Posts from './Posts'
import Seggestions from './Seggestions'
import Stories from './Stories'

function Feed() {
  const { data: session } = useSession()

  return (
    <main
      className={`mx-auto grid min-h-screen grid-cols-1  md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${
        !session && '!grid-col-1 !max-w-3xl'
      } `}
    >
      <section className="col-span-2 grid-cols-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div>
            <Miniprofile />
            <Seggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
