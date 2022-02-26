import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modaAtoms'

function Header() {
  const [open, setOpen] = useRecoilState(modalState)
  const { data: session } = useSession()
  const router = useRouter()

  console.log(open)

  return (
    <div className="sticky top-0 z-50 flex border-b bg-white shadow-sm">
      <div className="mx-5 flex w-full max-w-6xl justify-between  bg-white lg:mx-auto ">
        {/* left */}
        <div
          onClick={() => router.push('/')}
          className="relative hidden  w-24 cursor-pointer  lg:inline-flex"
        >
          <Image
            src="http://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => router.push('/')}
          className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden"
        >
          <Image
            src="http://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3">
            <div className="absolute inset-y-0 flex items-center  pl-3">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full rounded-md border-gray-300 bg-slate-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-4 ">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className="h-6  cursor-pointer md:hidden " />

          {session ? (
            <>
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-2 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-sm text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user?.image}
                className="h-10 w-10  cursor-pointer rounded-full object-cover"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
