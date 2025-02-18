import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../App";

function Header() {
  const location = useLocation();
  const {cart} = useContext(CartContext)

  return (
    <header>
      <div className="bg-blue-900">
        <div className="container mx-auto flex justify-end py-2 gap-3 text-white text-md">
          <Link to="/login">Sign in / Guest</Link>
          <Link to="/register">Create Account</Link>
        </div>
      </div>

      <div className="bg-blue-100 py-7">
        <div className="container mx-auto flex items-center justify-between">
          <div className="logo">
            <Link
              className="px-5 p-4 bg-blue-600 text-2xl rounded-md text-white font-bold hover:bg-blue-700"
              to="/"
            >
              C
            </Link>
          </div>

          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <NavLink
                  className={`${
                    location.pathname === "/" ? "bg-black text-white" : ""
                  } text-lg py-2 px-3 rounded-md hover:bg-gray-300`}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${
                    location.pathname.includes("about")
                      ? "bg-black text-white"
                      : ""
                  } text-lg py-2 px-3 rounded-md hover:bg-gray-300`}
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${
                    location.pathname.includes("products")
                      ? "bg-black text-white"
                      : ""
                  } text-lg py-2 px-3 rounded-md hover:bg-gray-300`}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${
                    location.pathname.includes("cart")
                      ? "bg-black text-white"
                      : ""
                  } text-lg py-2 px-3 rounded-md hover:bg-gray-300`}
                  to="/cart"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          </nav>

          <p>{cart.length}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
