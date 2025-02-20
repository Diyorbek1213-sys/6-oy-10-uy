import { CartContext } from "../App"
import React, { useContext } from 'react'
import { Link } from "react-router-dom";

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
        cart.length > 0 && <div>
          <h2 className="mt-30 text-[35px] text-[gray]">Shopping Cart</h2>
          <hr className="border-[gray] mt-[15px]" />
        </div>
      }
      {
        cart.length > 0 && cart.map((item, index) => {
          return (
            <div className="border-b border-[gray] pb-[15px]" key={index}>
              <div className="w-full mt-[25px] p-3 rounded-md flex gap-10">
                <img src={item?.product?.attributes?.image} className="w-[150px] h-[150px] rounded-md" alt="" />
                <div className="flex gap-15">
                  <div>
                    <h3>{item?.product?.attributes?.title}</h3>
                    <h3 className="text-[gray]">{item?.product?.attributes?.company}</h3>
                    {/* <h3>{item?.count}</h3> */}
                    <h3 className="flex items-center gap-2 mt-[15px]">Color: <span style={{ backgroundColor: item?.color }} className={`inline-block w-[20px] h-[20px] rounded-full`}></span></h3>
                  </div>
                  <br />

                  <div>
                    <p>Amount</p>
                    <select className="w-[60px] border rounded-md mt-[5px]" value={item?.count} onChange={(e) => { handleChangeCount(e.target.value, item) }}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>

                    <br />

                    <button className="text-[blue] cursor-pointer mt-[5px]" onClick={() => { handleRemoveFromCart(item) }}>remove</button>
                  </div>

                  <p className="ml-[100px]">${item?.product?.attributes?.price}</p>
                </div>
              </div>
            </div>
          )
        })
      }

      {
        cart.length === 0 && <div>
          <h1 className="text-[35px] mt-[70px] text-[gray]">Your Cart Is Empty</h1>
          <Link to='/products' className="text-[35px] text-[blue] cursor-pointer hover:underline">Go Buy</Link>
          <hr className="border-[gray] mt-[20px]" />
        </div>
      }
    </div>
  )
}

export default Cart