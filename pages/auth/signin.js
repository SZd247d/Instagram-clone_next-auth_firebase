import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header'

function SignIn({ providers }) {
  return (
    <>
      <Header />

      <div className="-mt-56 flex min-h-screen flex-col items-center justify-center py-20 px-20 text-center">
        <img className="w-80" src="http://links.papareact.com/ocw" alt="" />
        <p className="font-xs italic">
          This Me Zakaria Practicing Coding, By Clonning famous Apps
        </p>

        <div className="mt-50">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
