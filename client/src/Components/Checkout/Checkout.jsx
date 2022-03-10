import { Info } from "../../App"
import { useContext, useEffect, useState } from "react"
import './Checkout.css'
import { useNavigate } from 'react-router-dom'
export const Checkout = () => {
    const { userCart, totalAmu } = useContext(Info)
    const [payProcess, setPayProcesss] = useState(false)
    const [success, setSucces] = useState(false)
    const Navigate = useNavigate()

    const completePayment = () => {
        setPayProcesss(true);
        setTimeout(() => {
            setPayProcesss(false)
            setSucces(true)
            redirectHome();
        }, 1000)
    }
    const redirectHome = () => {
        setTimeout(() => {
            Navigate('/')
        }, 2000)
    }

    useEffect(() => {
        console.log(userCart)
    }, [])

    return <>
        <div className="payNow">
            <div className="payNowChild">
                <div>Service Provider-: {userCart[0].shopName}</div>
                <div>Total amount to be paid-: {totalAmu}</div>
                <div><button className="payNowBtn" onClick={completePayment}>Pay Now</button></div>
            </div>
        </div>

        <div className="success">
            <div className="successInfo">
                {payProcess ? <div>
                    processing ....
                </div> : null}
                {success ? <div>Payment Successfull</div> : null}
            </div>
        </div>
    </>
}
