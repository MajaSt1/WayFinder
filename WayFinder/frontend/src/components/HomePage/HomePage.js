import React, { useState, useEffect } from "react";
import OLMap from "../Map/Map";
import SearchBar from "../SearchBar/SearchBar";
import { geocode } from "../../services/mapServices";
import Sidebar from "../Sidebar/Sidebar";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate()
  const [marker1, setMarker1] = useState(null)
  const [marker2, setMarker2] = useState(null)
  const [marker2Name, setMarker2Name] = useState("")
  const [isSidebarNotCollapsed, setIsSidebarNotCollapsed] = useState(false)
  const [showSearchHistory, setShowSearchHistory] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarNotCollapsed(!isSidebarNotCollapsed)
  }

  const handleSearch = async (searchTerm, searchBarId) => {
    const data = await geocode(searchTerm)
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      const coordinates = [parseFloat(lon), parseFloat(lat)]
      console.log(
        `SearchBar${searchBarId}: `,
        searchTerm,
        "Coordinates: ",
        lat,
        lon
      )
      if (searchBarId === 1) {
        setMarker1(coordinates)
      } else {
        setMarker2(coordinates)
      }

      // save search term to local storage
      let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
      searchHistory.push({searchTerm, searchBarId, timestamp: new Date()})
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    } else {
      console.error(
        `No results found for SearchBar${searchBarId}: `,
        searchTerm
      )
    }
  }

  const updateMarker2Name = (name) => {
    setMarker2Name(name)
  }


    useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      alert("You need to login or register first to access the homepage.");
    }
  }, [navigate]);

  return (
      <div className="full-height-container">
        <Sidebar
          isNotCollapsed={isSidebarNotCollapsed}
          toggleSidebar={toggleSidebar}
          onSearchHistoryClick={() => {
            setShowSearchHistory(true)
            setIsSidebarNotCollapsed(false)
          }}
        />
        <div className="search-container">
        {showSearchHistory ? (
        <div className="search-history-container">
          <div className="search-history-close" onClick={() => setShowSearchHistory(!showSearchHistory)}>
            <p>Close search history &nbsp;<FontAwesomeIcon icon={faTimes} /></p>
          </div>
          <div className="search-history-list">
            {JSON.parse(localStorage.getItem("searchHistory")) &&
              JSON.parse(localStorage.getItem("searchHistory")).map((item, index) => (
                <div key={index} className="search-history-item" onClick={() => {
                  setShowSearchHistory(false)
                  updateMarker2Name(item.searchTerm)
                  handleSearch(item.searchTerm, 2)}}
                >
                  <span>
                    {item.searchTerm}&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowCircleRight} />
                  </span>
                </div>
            ))}
          </div>
        </div>
        ) : (
        <>
          <SearchBar
            placeholder="Search first location"
            onSearch={(searchTerm) => handleSearch(searchTerm, 1)}
          />
          <br />
          <SearchBar
            placeholder={marker2Name || "Search second location"}
            onSearch={(searchTerm) => handleSearch(searchTerm, 2)}
          />
        </>
        )}
        </div>
        <OLMap marker1={marker1} marker2={marker2} onMarker2NameUpdate={updateMarker2Name} />
      </div>
  )
}

export default HomePage