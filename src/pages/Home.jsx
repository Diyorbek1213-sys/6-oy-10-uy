import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // useEffect(() => {

  // }, [])

  function handleSendParams() {
    
  }

  return (
    <div>
      <button onClick={handleSendParams}>Params</button>
    </div>
  )
}

export default Home