import { CartContext } from "../App"
import React, { useContext } from 'react'

function Cart() {
  const { cart, setCart } = useContext(CartContext)

  function handleRemoveFromCart(product) {
    let copied = [...cart]
    copied = copied.filter(item => {
      return item.id !== product.id
    })

    setCart(copied)
  }

  function handleChangeCount(current, product) {
    let copied = [...cart]
    copied = copied.map(item => {
      if (item.id === product.id) {
        item.count = current
      }

      return item
    })

    setCart(copied)
  }

  return (
    <div>
      {
        cart.length > 0 && cart.map((item, index) => {
          return <div key={index} className="w-full border p-3 rounded-md mt-10 flex gap-10">
            <img src={item?.product?.attributes?.image} className="w-[300px]" alt="" />
            <div>
              <h3>{item?.product?.attributes?.title}</h3>
              <h3>{item?.count}</h3>
              <span style={{ backgroundColor: item?.color }} className={`inline-block w-[30px] h-[30px] rounded-full`}></span>
              <br />

              <select className="w-[300px] border p-2 rounded-md" value={item?.count} onChange={(e) => {handleChangeCount(e.target.value, item)}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>

              <br />

              <button className="bg-red-500 py-2 px-4 rounded-md text-white cursor-pointer" onClick={() => { handleRemoveFromCart(item) }}>Delete</button>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Cart