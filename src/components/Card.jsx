import { useNavigate } from "react-router-dom"

function Card(props) {
    const { product, view } = props
    const navigate = useNavigate()

    function handleRedirect() {
        navigate(`/products/${product.id}`)
    }

    return (
        <div
            onClick={handleRedirect}
            className={`cursor-pointer transition-all hover:shadow-xl p-4 pb-5 rounded-lg shadow-md 
                ${view === 'grid' ? "w-[30%] text-center" : "w-full flex items-center gap-10"}`}
        >
            <img
                className={`${view === 'grid' ? "w-full h-[250px]" : "w-[200px] h-[200px]"} rounded-lg object-cover`}
                src={product?.attributes?.image}
                alt=""
            />
            <div className={`${view === 'list' ? "flex flex-col" : ""}`}>
                <h4 className="text-xl mt-2">{product?.attributes?.title}</h4>
                {
                    console.log(product?.attributes?.title)
                }
                <p className="text-xl mt-2"><b>${product?.attributes?.price}</b></p>
            </div>
        </div>
    )
}

export default Card
