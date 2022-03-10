import { useEffect, useRef, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { Info } from '../../App';
import './Cart.css'

export const Cart = () => {
    const { userCart, removeItm,totalIs} = useContext(Info)
    const [total,setTotal]=useState(0);
    const [discount,setDiscount]=useState(0);

    console.log("data in cart", userCart)
    const Navigate=useNavigate()
    console.log(userCart)

    const applyDiscount=()=>{
        setDiscount((total*20)/100)
    }
    const handleCheckout=()=>{
        totalIs(total-discount)
        setTimeout(Navigate("/checkout"),1000)
    }

    useEffect(() => {
        setTotal(userCart.reduce((acc,curr)=>{
            return acc=acc+parseInt(curr.cost)
        },0))
    }, [userCart])
    return <>
        <div style={{marginTop:"50px"}}>
            {Array.isArray(userCart) && userCart.length < 1 ? <div> Cart Is Empty</div> :
                <div>
                    <div className='cartDetailParent'>
                        <div>
                            {userCart && userCart.map((el) => (
                                <div style={{marginBottom:"10px"}}>
                                    <div style={{
                                        background: `url(${el.image})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        width: "100px",
                                        height: "100px",
                                    }}>
                                    </div>
                                    <div>{el.shopName}</div>
                                    <div>{el.service}{": "} {el.cost}</div>
                                    <button className='remove' onClick={() => removeItm(el.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div onClick={applyDiscount} className='coupon'> click to apply coupon</div>
                            <div>total Amount: {} {total}</div>
                            <div>discount applied: {} {discount}</div>
                            <div>final price: {total-discount}</div>
                            <button className='checkoutBtn' onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                </div>
            }

        </div>
    </>
}