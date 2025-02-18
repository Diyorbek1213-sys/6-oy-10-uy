import { useContext, useEffect, useState } from "react"
import { data, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from "../App"
import { http } from "../axios"


function Details() {
  const [product, setProduct] = useState({})
  const [selectedColor, setSelectedColor] = useState('')
  const [count, setCount] = useState(1)
  const params = useParams()
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    http.get(`/products/${params.id}`)
      .then(response => {
        setProduct(response.data.data)
        setSelectedColor(response?.data?.data?.attributes?.colors[0])
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  function handleAddToCart() {
    let isExist = cart.find(value => {
      return value.product.id == product.id && value.color == selectedColor
    })

    let cartObject = {
      id: Date.now(),
      count: count,
      color: selectedColor,
      product: product,
    }
    
    let copied = [...cart]
    if (isExist) {
      copied = copied.map((value) => {
        if (value.product.id === product.id && value.color === selectedColor) {
          value.count = Number(value.count)
          value.count += Number(count)
        }
          return value
      })
      setCart(copied)
    } else {
      setCart([...cart, cartObject])
    }

    setCart([...cart, cartObject])
    toast.success('Item added to cart', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }

  return (
    <div className="container mt-[200px] mx-auto flex gap-7 mt-10">
      <img className="w-1/2 h-[500px] object-fit rounded-md" src={product?.attributes?.image} alt="" />
      <div className="w-1/2">
        <h3><b className="text-[25px]">{product?.attributes?.title}</b></h3>
        <h3 className="text-[gray]">{product?.attributes?.company}</h3>
        <h3 className="text-[18px] mt-[5px]">${product?.attributes?.price}</h3>
        <h3 className="mt-[20px]">{product?.attributes?.description}</h3>

        <div className="flex gap-3 mt-5">
          {
            product?.attributes?.colors.length > 0 && product?.attributes?.colors.map((color, index) => {
              return <span key={index} style={{ backgroundColor: color, border: color == selectedColor ? "2px solid black" : "none" }} onClick={() => { setSelectedColor(color) }} className={`inline-block w-[30px] h-[30px] cursor-pointer rounded-full`}></span>
            })
          }
        </div>
        <div>
          <label htmlFor="count">
            <select className="border mt-[25px] p-2 w-[400px] rounded-md" value={count} onChange={(e) => setCount(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </label>
        </div>
        <button onClick={handleAddToCart} className="mt-10 py-4 px-7 bg-purple-700 text-white rounded-md cursor-pointer">Add To Bag</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Details