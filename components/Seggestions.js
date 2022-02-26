import faker from '@faker-js/faker'
import { useEffect, useState } from 'react'

function Seggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setSuggestions(suggestions)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm ">
        <h3 className="text-sm font-bold text-gray-400">Seggestions for you</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>

      {suggestions.map(({ id, company, avatar, username }) => (
        <div className="mt-3 flex items-center justify-between" key={id}>
          <img
            src={avatar}
            className="h-10 w-10 rounded-full border p-[2px] "
          />

          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">{username}</h2>
            <h3 className="text-sm text-gray-400">Works at {company.name}</h3>
          </div>

          <button className="text-xs font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Seggestions
