import { signIn, signOut, useSession } from 'next-auth/react'

function Miniprofile() {
  const { data: session } = useSession()

  console.log(session)

  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        src={session?.user?.image}
        alt=""
        className="mr-2 h-16 w-16 rounded-full border object-cover p-[2px]"
      />

      <div className="mx-4 flex-1">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">keep programming</h3>
      </div>

      <button onClick={signOut} className="text-semibold text-sm text-blue-400">
        Sign out
      </button>
    </div>
  )
}

export default Miniprofile
