import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import { http } from "../axios"
import Card from "../components/Card"
import grid from '../assets/images/grid.svg'
import list from '../assets/images/list.svg'


function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const formRef = useRef()
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState({
    search: "",
    company: "all",
    category: "all",
    order: "a-z",
    price: 100000,
    shipping: false
  })

  useEffect(() => {
    setLoading(true)

    let url = '/products'

    if (searchParams.get('search') || searchParams.get('category') || searchParams.get('company') || searchParams.get('order') || searchParams.get('price') || searchParams.get('shipping')) {
      setFilter(prev => {
        return {
          search: searchParams.get('search') ? searchParams.get('search') : '',
          company: searchParams.get('company') ? searchParams.get('company') : 'all',
          category: searchParams.get('category') ? searchParams.get('category') : 'all',
          order: searchParams.get('order') ? searchParams.get('order') : 'a-z',
          price: searchParams.get('price') ? searchParams.get('price') : 100000,
          shipping: searchParams.get('shipping') ? true : false,
        }
      })

      url = `/products?search=${filter.search}&category=${filter.category}&company=${filter.company}&order=${filter.order}&price=${filter.price}&shipping=${filter.shipping & 'on'}`
    }

    if (searchParams.get('page')) {
      setCurrentPage(searchParams.get('page'))
    }

    http.get(url)
      .then(response => {
        if (response.status === 200) {
          setProducts(response?.data?.data)
          setTotalPage(response?.data?.meta?.pagination.pageCount)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchParams])

  useEffect(() => {
    http.get(`/products?page=${currentPage}`)
    .then(response => {
      if (response.status === 200) setProducts(response?.data?.data)
    })
  .catch(error => console.log(error))
  .finally(() => setLoading(false))
  }, [currentPage])

  function handleFilter(event) {
    event.preventDefault()

    let url = `/products?search=${filter.search}&category=${filter.category}&company=${filter.company}&order=${filter.order}&price=${filter.price}${filter.shipping ? '&shipping=on' : ''}`;


    setSearchParams({ ...filter, shipping: filter.shipping ? 'on' : '' }, false)

    http.get(url)
      .then(response => {
        if (response.status === 200) {
          setProducts(response?.data?.data)
          setTotalPage(response?.data?.meta?.pagination.pageCount)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleReset() {
    formRef.current.reset()
    setFilter({
      search: "",
      company: "all",
      category: "all",
      order: "a-z",
      price: 100000,
      shipping: false
    })
    setSearchParams({})
  }

  function handlePaginate(event, target) {
    setCurrentPage(target)
    setSearchParams({page: target})
  }

  return (
    <div>
      <form ref={formRef} className="grid grid-cols-4 gap-4 mt-10 bg-blue-100 p-5 rounded-lg">
        <div className="flex flex-col gap-2">
          <label>Search Products</label>
          <input value={filter.search} onChange={(e) => { setFilter({ ...filter, search: e.target.value }) }} className="border rounded-md p-2 bg-white" type="text" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Select Category</label>
          <select value={filter.category} onChange={(e) => { setFilter({ ...filter, category: e.target.value }) }} className="border rounded-md p-2 bg-white">
            <option>all</option>
            <option>Table</option>
            <option>Chairs</option>
            <option>Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Select Company</label>
          <select value={filter.company} onChange={(e) => { setFilter({ ...filter, company: e.target.value }) }} className="border rounded-md p-2 bg-white">
            <option>all</option>
            <option>Modenza</option>
            <option>Luxora</option>
          </select>
        </div>


        <div className="flex flex-col gap-2">
          <label>Sort by</label>
          <select value={filter.order} onChange={(e) => { setFilter({ ...filter, order: e.target.value }) }} className="border rounded-md p-2 bg-white">
            <option>a-z</option>
            <option>z-a</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Search Products: <b>{`$${filter.price}`}</b></label>
          <input value={filter.price} onChange={(e) => { setFilter({ ...filter, price: e.target.value }) }} className="border rounded-md p-2 bg-white" type="range" min={1} max={100000} />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <label>Free Shipping</label>
          <input onChange={(e) => { setFilter({ ...filter, shipping: e.target.checked }) }} className="border rounded-md p-2 bg-white" type="checkbox" />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button onClick={handleFilter} className="bg-blue-500 w-full p-1 cursor-pointer rounded-lg text-white">SEARCH</button>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button onClick={handleReset} type="reset" className="bg-purple-500 w-full p-1 cursor-pointer rounded-lg text-white">RESET</button>
        </div>
      </form>

      <div className="mt-[30px] border-b border-gray-200 pb-[20px] flex justify-between">
        <h3><b>Products: {products.length}</b></h3>
        <div className="flex gap-2 mb-5">
          <button onClick={() => setView('grid')} className={`${view === 'grid' ? "bg-blue-500 text-white" : "bg-gray-200"} cursor-pointer transition-all hover:bg-gray-400 rounded-[3px] p-[5px]`}>
            <img src={grid} alt="grid_view" />
          </button>

          <button onClick={() => setView('list')} className={`${view === 'list' ? "bg-blue-500 text-white" : "bg-gray-200"} cursor-pointer transition-all hover:bg-gray-400 rounded-[3px] p-[5px]`}>
            <img src={list} alt="list_view" />
          </button>
        </div>
      </div>

      <div className={view === 'grid' && `flex flex-wrap justify-between gap-y-7 mt-10 mb-[50px]`}>
        {
          loading && <p>Loading...</p>
        }

        {
          !loading && products.length > 0 && products.map((product, index) => {
            return <Card key={index} product={product} view={view} />
          })
        }

        {
          !loading && products.length === 0 && <p>Sorry, no products matched your search...</p>
        }
      </div>
      <div className="flex justify-end my-10">
        <Pagination onChange={handlePaginate} page={currentPage} count={totalPage} variant="outlined" />
      </div>
    </div>
  )
}
export default Products