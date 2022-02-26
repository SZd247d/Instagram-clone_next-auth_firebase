import {
  DotsHorizontalIcon,
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

function Post({ id, username, caption, image, userImage }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      timestamp: serverTimestamp(),
      userImage: session.user.image,
      username: session.user.username,
    })
  }

  console.log(id)

  return (
    <div className="my-7 rounded-sm border bg-white">
      {/* Header */}
      <div className="flex items-center p-5 ">
        <img
          src={userImage}
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-cover p-1"
        />
        <p className="flex-1 font-bold">{username} </p>
        <DotsHorizontalIcon className="h-10" />
      </div>

      {/* Image */}
      <img src={image} alt="" className="w-full object-cover" />

      {/* Button */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            <HeartIcon className="Btn" />
            <ChatIcon className="Btn" />
            <PaperAirplaneIcon className="Btn" />
          </div>
          <BookmarkIcon className="Btn" />
        </div>
      )}

      {/* Caption */}

      <p className="truncate p-5 text-sm text-gray-600">
        <span className="mr-1 font-bold">{username}</span> {caption}
      </p>

      {/* Comments */}

      {/* Input Field */}
      {session && (
        <form className="flex items-center p-4 ">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="flex-1 border-none outline-none focus:ring-0"
            placeholder="Add a comment ..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
