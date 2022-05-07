import React from 'react';
import { useState, useEffect } from 'react';

const SearchWeather = () => {
    const [search, setSearch] = useState('london');
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");

    let componentMounted = true;

    //fetch API
    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5ca9e143b8f6e1f543c36eb8fb073a98`);
            if (componentMounted) {
                setData(await response.json());
            }
            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [search]);

    //Render icon weather
    let emoji = null;

    if (typeof data.main != "undefined") {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-cloud"
        } else if (data.weather[0].main == "Thunderstorm") {
            emoji = "fa-bolt"
        } else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain"
        } else if (data.weather[0].main == "Rain") {
            emoji = "fa-cloud-shower-heavy"
        } else if (data.weather[0].main == "Snow") {
            emoji = "fa-snow-flake"
        } else {
            emoji = "fa-smog"
        }
    } else {
        return (
            <div>...Loading</div>
        )
    }

    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    // Time
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    //Search Country
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input)
    }

    return (
        <div >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-center border-0 text-white mt-5">
                            <img height={600} src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            required
                                        />
                                        <button type="submit" class="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 className="card-title">{data.name}</h2>
                                    <p className="card-text lead">{day}, {month} {date}, {year}
                                        <hr />
                                        {time}
                                    </p>

                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='mt-2 fw-bold mb-5'>{(data.main.temp - 273.15).toFixed(2)} &deg;C</h1>
                                    <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                                    <p className="lead">{(data.main.temp_min - 273.15).toFixed(2)}&deg;C &nbsp; | &nbsp; {(data.main.temp_max - 273.15).toFixed(2)}&deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchWeather;