import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

// const posts = [
//   {
//     id: '1',
//     username: 'sara',
//     userImage:
//       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
//     image:
//       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
//     caption: 'Get Through at whatever the hell you are going through',
//   },
//   {
//     id: '2',
//     username: 'sara',
//     userImage:
//       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
//     image:
//       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
//     caption: 'Get Through at whatever the hell you are going through',
//   },
// ]

function Posts() {
  const [posts, setPosts] = useState([])
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPosts(data)
    })
    return () => unsubscribe()
  }, [db])

  useEffect(() => {}, [])
  // useEffect(
  //   () => {
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //       }))
  //       setPosts(data)
  //       console.log(data)
  //     })
  //     return () => unsubscribe()
  //   },
  //   //     onSnapshot(
  //   //       query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
  //   //       (snapshot) => {
  //   //         setPosts(snapshot.docs)
  //   //       }
  //   //     ),
  //   [db]
  // )

  // const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const data = querySnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //   }))
  //   setPosts(data)
  //   console.log(data)
  // })

  console.log(posts)

  return (
    <div>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          caption={post.caption}
          image={post.image}
          userImage={post.profileImg}
        />
      ))}
      Post
    </div>
  )
}

export default Posts
