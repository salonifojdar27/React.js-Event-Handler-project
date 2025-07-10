
import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [posts, setposts] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const [page, setpage] = useState(1)

  const getDatafromserver = async () => {
    setloading(true)
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
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
  }, [page])
  return loading ? "Loading" : error ? "Network Error" : (
    <div className='container'>
      <h1>Posts are here...</h1>
      <hr />
      {posts.map((el) => (
        <div className='details'>
          <h4>{el.id}</h4>
          <h3>{el.title}</h3>
          <p>{el.body}</p>
        </div>
      ))}
      <div className='buttons'>
        <button disabled={page == 1} onClick={() => setpage(page - 1)}>Preview</button>
        <h2>{page}</h2>
        <button onClick={() => setpage(page + 1)} disabled={page == posts.length}>Next</button>
      </div>
    </div>
  )
}

export default App
