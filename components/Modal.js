import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modaAtoms'
import { CameraIcon } from '@heroicons/react/outline'
import { useRef } from 'react'
import { db, storage } from '../firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import {
  ref,
  uploadString,
  getDownloadUrl,
  getDownloadURL,
} from 'firebase/storage'

export default function MyModal() {
  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const captionRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  // const addImageToPost = (e) => {
  //   const file = filePickerRef.current.files[0]
  //   useSelectedFile(file)
  //   setOpen(false)
  // }

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)
    // create a post and add to firestore 'posts' collection
    // get the post id for the newly created posts
    // uplod the image to firebase storage withe the post id
    // get a downlod url from fb storage and update the original post with image url

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    console.log('New Doc Added with ID: ', docRef.id)

    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        })
      }
    )
    setOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex min-h-[800px] items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full  sm:max-w-sm sm:p-6 sm:align-middle">
                {selectedFile ? (
                  <img
                    className="w-full cursor-pointer object-contain"
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt="selectedFile"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto mb-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
                  >
                    <CameraIcon
                      className=" h-6 w-6 text-red-600"
                      area-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>
                  <div>
                    <input
                      type="file"
                      ref={filePickerRef}
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full border-none text-center focus:ring-0"
                      ref={captionRef}
                      placeholder="Please enter a caption"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
