import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Home.css'


export const Home = () => {

    const [currentData, setCurrentData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [update,setUpdate]=useState(false)
    console.log("now data is", filteredData)
    const Navigate = useNavigate()


    const getData = () => {
        fetch("http://localhost:3004/posts")
            .then(res => res.json())
            .then(res => setCurrentData(res))
            .catch(err => console.log(err))
    }

    const getDataForCity = (city) => {
        setFilteredData(currentData.filter((el) => {
            if (el.location.city == city) return el
        }))
    }

    const getFilteredData = (key) => {

        
        switch (key) {
            case "RH":
                setFilteredData(filteredData.sort((a, b) => b.rating - a.rating))
                setUpdate(!update)
                return 
            case "RL":
                setFilteredData(filteredData.sort((a, b) => a.rating - b.rating))
                setUpdate(!update)
                return
            case "PA":
                setFilteredData(filteredData.filter(el => el.onlinePay === 1))
                return
            case "DH":
                setFilteredData(filteredData.sort((a, b) => b.discount - a.discount))
                setUpdate(!update)
                return
            case "DL":
                setFilteredData(filteredData.sort((a, b) => a.discount - b.discount))
                setUpdate(!update)
                return
            default:
                return
        }

    }

    useEffect(() => {
        getData();
    }, [])



    const State = () => {

        let state = ["Uttarakhand", "Himanchal Pradesh", "Rajasthan", "Jammu", "Bangalore"]
        let city = [["Rishikesh", "Raiwala", "Idpl"],["Shimla","Ponta","Dharamsala"],["Jaipur","Udaipur","Jaisalmer"],["Kamini","Setani","Dharam Bagh"],["Mallesvaram","Bhairsandra","Kormangala"]]
        const [selState, setSelState] = useState(null);
        const [selCity, setSelCity] = useState(null);
        const [ind,SetInd]=useState(null)


        const handleUserSelection = () => {
            getDataForCity(selCity);
        }

        const handleSelectedState=(e)=>{
            if(e.target.innerText.trim()==state[0]) SetInd(0)
            else if(e.target.innerText.trim()==state[1]) SetInd(1)
            else if(e.target.innerText.trim()==state[2]) SetInd(2)
            else if(e.target.innerText.trim()==state[3]) SetInd(3)
            else if(e.target.innerText.trim()==state[4]) SetInd(4)
        }

        return <>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <DropdownButton id="dropdown-item-button" title="Select Your City">
                        {state && state.map((el => (
                            <Dropdown.Item onClick={handleSelectedState} className='dropDownHover'>{el}</Dropdown.Item>
                        )))}
                    </DropdownButton>
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <DropdownButton id="dropdown-item-button" title="Nearby Location">
                        {ind!==null && ind>=0 && city[ind].map((el => (
                            <Dropdown.Item onClick={(e) => setSelCity(e.target.innerText.trim())} className='dropDownHover'>{el}</Dropdown.Item>
                        )))}
                    </DropdownButton>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button className='searchBtn' onClick={handleUserSelection}>Search</button>
            </div>
        </>
    }



    const DisplaySection = () => {
        const [filterDisplay, setFilterDisplay] = useState(false)

        useEffect(() => {

        }, [filteredData])

        return <>
            <div>
                {filteredData ? <div className='filter-container'>
                    <div>
                        <button className='applyFilter' onClick={() => setFilterDisplay(!filterDisplay)}>Apply filter</button>
                    </div>
                    {filterDisplay ?
                        <div className='filter-parent'>
                            <div>
                                <DropdownButton id="dropdown-item-button" title="Sort by Rating">

                                    <Dropdown.Item onClick={() => getFilteredData("RH")} className='dropDownHover'>high to low</Dropdown.Item>
                                    <Dropdown.Item onClick={() => getFilteredData("RL")} className='dropDownHover'>low to high</Dropdown.Item>

                                </DropdownButton>
                            </div>
                            <div>
                                <DropdownButton id="dropdown-item-button" title="Online Pay">
                                    <Dropdown.Item onClick={() => getFilteredData("PA")} className='dropDownHover'>available</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div>
                                <DropdownButton id="dropdown-item-button" title="Sort By Discount">
                                    <Dropdown.Item onClick={() => getFilteredData("DH")} className='dropDownHover'>high to low</Dropdown.Item>
                                    <Dropdown.Item onClick={() => getFilteredData("DL")} className='dropDownHover'>low to high</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div>
                                <DropdownButton id="dropdown-item-button" title="Sort By Radius">
                                    <Dropdown.Item onClick={() => getFilteredData("R1")} className='dropDownHover'>near 1km</Dropdown.Item>
                                    <Dropdown.Item onClick={() => getFilteredData("R5")} className='dropDownHover'>near 1-5km</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div> : null
                    }
                </div> : null}
                <div className='shopParent'>
                    {Array.isArray(filteredData) && filteredData.length < 1 ? <div className='noResult'>No Result Found</div> : <>
                        {filteredData && filteredData.map((el) => (
                            <div className='avalLocParent' id={el.id}>
                                <div onClick={() => Navigate(`/sel/${el.id}`)} className='s-p-left' style={{
                                    background: `url(${el.image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    cursor:"pointer"
                                }}>
                                </div>

                                <div className='pordInfoParent'>
                                    <span className='pordInfo p-i-1'>{el.shopName}</span>
                                    <span className='pordInfo'>{el.location.address}</span>
                                    <span className='pordInfo p-i-3'>{el.rating}</span>
                                </div>
                                <span style={{ position: "absolute", top: "0px" }} className='discount'>{`${el.discount} %`}</span>
                            </div>
                        ))} </>
                    }
                </div>
            </div>
        </>
    }

    const TopLogo = () => {
        return <>
            <div className='topLogoParent'>
                <div className='topLoogo'>
                    <div className='infoSection'>
                        <div className='info1'>24 Hours Flat tyre repair service</div>
                        <div className='info2'>For Bikes & Cars</div>
                    </div>
                    <div className='logoSection'>
                        <img src="https://www.readyassist.in/assets/services/flat-tyre/readyassist-flattyre2.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    }

    return <>
        <div className='homeWrapper'>
            <TopLogo />
            <State />
            <DisplaySection />
        </div>
    </>
}