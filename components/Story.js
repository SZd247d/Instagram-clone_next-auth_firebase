function Story({ username, img }) {
  return (
    <div>
      <img src={img} alt="" className="h-12 rounded-full" />
      <p>{username}</p>
    </div>
  )
}

export default Story
