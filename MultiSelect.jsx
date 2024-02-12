import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import LocationSuggestionApi from '../../../api/locationApi/LocationSuggestionApi';
import Playground from '../../FlagSelection';
import { useSelector } from 'react-redux';

const MultiSelect = ({ setLocationData }) => {

    const [inputValue, setInputValue] = useState("");
    const [filterLocation, setFilterLocation] = useState([]);

    useEffect(() => {

        if (inputValue.length > 0) {
            LocationSuggestionApi(inputValue, "city", Country.countryCode).then(res => {
                const data = res.data;

                //eslint-disable-next-line
                setFilterLocation(
                    data.map(item => ({
                        value: item.city,
                        label: item.city + " " + item.country,
                        latitude: item.cityLatitude,
                        longitude: item.cityLongitude
                    })))
            }).catch(err => {
                console.log(err);
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

    const selectedLanguage = useSelector(state => state.language);
    const content = useSelector(state => state.content);


    // for country flag

    const [ShowDropDown, setShowDropDown] = useState(false)
    const [Country, setCountry] = useState({ countryCode: "US", countryName: "United States" });
    const [flagSearch, setFlagSearch] = useState("");

    const handleFlagFilter = (e) => {
        setFlagSearch(e.target.value);
    }

    const handleDropDown = () => {
        setShowDropDown(!ShowDropDown)
    }


    const setLocationDatas = (newValue) => {
        // store the selected city as comma separated string
        setLocationData(newValue.map(item => item.value).join(','));
    }

    return (

        <div className='row' >

            {/* flag */}
            <div class="   pe-0 d-lg-block mx-3 col-2  ">
                <button type="button" onClick={handleDropDown} class="btn border-0 p-0 m-0  ms-2  " data-bs-auto-close="outside">
                    <img className='m-0 p-0 ' style={{ width: "35px", height: "37px", borderRadius: "100%" }} src={`https://flagsapi.com/${Country.countryCode}/flat/32.png`} alt="" />
                    <div className='font-10px p-0 m-0 ' style={{ color: (content[selectedLanguage].find(item => item.elementLabel === 'NavBarFontColor') || {}).mvalue || "#F7FFDD" }}>
                        {Country.countryCode}
                    </div>
                </button>
                {ShowDropDown &&
                    <div class={ShowDropDown ? "dropdown-menu show" : "dropdown-menu "} style={{ minWidth: "10px", marginRight: "100px", marginLeft: "-30px" }} >

                        <div className='d-flex justify-content-center '>
                            <input placeholder='Search Country...' value={flagSearch} onChange={handleFlagFilter} style={{ width: "130px", height: "20px", fontSize: "10px", padding: "2px" }}>

                            </input>
                        </div>
                        <div className=' table-responsive d-flex  font-5 ' style={{ height: "130px" }}>

                            <table className='table table-sm d-flex table-hover  '>

                                <tbody className='font-5' style={{ width: "5%" }} >
                                    <Playground setCountry={setCountry} setShowDropDown={setShowDropDown} flagSearch={flagSearch} setFlagSearch={setFlagSearch} />
                                </tbody>

                            </table>
                        </div>
                    </div>}
            </div>

            {/* location */}
            <div className='col ps-0 '>
                <Select
                    isMulti
                    name="location"
                    options={filterLocation}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    inputValue={inputValue}
                    onChange={(newValue) => setLocationDatas(newValue)}
                    onInputChange={(newValue) => setInputValue(newValue)}
                />
            </div>

        </div>


    )
}

export default MultiSelect