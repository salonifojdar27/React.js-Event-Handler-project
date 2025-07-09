
import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [posts, setposts] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")

  const getDatafromserver = async () => {
    setloading(true)
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setloading(false)
      setposts(res.data)

    } catch (error) {
      console.log(error.message)
      seterror(error.message)
      setloading(false)
    }

  }
  useEffect(() => {
    getDatafromserver()
  }, [])
  return loading ? "Loading" : error ? "Network Error" : (
    <div className='container'>
      <h1>posts are here...</h1>
      <hr />
      {posts.map((el) => (
        <div className='details'>
          <p>{el.id}</p>
          <p>{el.title}</p>
          <p>{el.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App
