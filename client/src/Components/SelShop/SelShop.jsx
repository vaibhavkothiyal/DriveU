import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import './SelShop.css'
import { Info } from "../../App"
import { v4 as uuid } from 'uuid'

export const SelShop = () => {
    const { id } = useParams()
    const [shopIs, setShopIs] = useState(null);
    const { userCart, addItems } = useContext(Info)
    const [price,setPrice]=useState(0);

    const getShop = () => {
        fetch(`http://localhost:3004/posts/${id}`)
            .then(res => res.json())
            .then(res => setShopIs(res))
            .catch(err => console.log(err))
    }
    const addToCart = (el) => {
        addItems(el)
    }

    useEffect(() => {
        getShop()
    }, [])

    const selectedService=(e)=>{
        setPrice(e.target.value)
    }

    return <>
        <div>
            {shopIs ? <div className='selItemIs'>

                <div>
                    <div className='selShopParent' style={{
                        background: `url(${shopIs.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}>
                    </div>
                    <div className="selShopName">{shopIs.shopName}</div>
                    <div className="selShopAdd">{shopIs.location.address}</div>
                </div>
                <div>
                    <div style={{fontSize:"25px",color:"#253333",fontWeight:"600"}}>Services Provided</div>
                    {shopIs.service.map((el) => (
                        <div>
                            <u><div>{el.name}</div></u>
                            <div>Two wheeler <input onChange={selectedService} type="radio" name="type" value={el.tw}/> {el.tw}</div>
                            <div>Four wheeler <input onChange={selectedService} type="radio" name="type" value={el.fw} id="" /> {el.fw}</div>
                            <button onClick={() => addToCart({id:uuid(),shopName:shopIs.shopName, image:shopIs.image,service:el.name,cost:price})}>Add to cart</button>
                        </div>
                    ))}
                </div>
            </div> : null}

        </div>
    </>
}