import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Article.png";
import countries from "../countries/countries.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import downArrow from "../../assets/downarrow.png";


function Header() {
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Function to toggle theme
  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  }

  // Categories for the dropdown
  const categories = [
    "business",
    "entertainment",
    "general",
    "science",
    "sports",
    "technology",
    "politics",
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-50 flex items-center justify-between px-10 py-2">
        <div className="flex gap-x-2 items-center">
          <span className="flex">
            <img
              className="size-[50px] rounded-full border-black border-2"
              src={logo}
              alt="ArticleOrg"
            ></img>
          </span>
          <h3 className="relative font-bold text-2xl">Article Origin</h3>
        </div>
        <nav>
          <ul
            className={`flex h-full items-center justify-end  
              active
                ? "gap-8"
                : "gap-14"
            `}
          >
            <li className="font-semibold">
              <Link to="/" onClick={() => setActive(!active)}>
                All-news
              </Link>
            </li>
            <li className="dropdown-li flex no-underline font-semibold items-center gap-2 ">
              <Link
                to="/top-headlines"
                onClick={() => setCountryDropdown(!countryDropdown)}
              >
                Top Headlines
              </Link>
            </li>

            {/* Country Dropdown */}
            {/* <button className="bg-white rounded-full px-4 py-1 font-semibold">
              Select Country
            </button> */}
            
            

            {/* <li className="dropdown-li">
              <Link
                className="no-underline font-semibold flex items-center gap-2"
                onClick={() => {
                  setCountryDropdown(!countryDropdown);
                  setCountryDropdown(false);
                }}
              >
                Country{" "}
                <FontAwesomeIcon
                  className={
                    countryDropdown
                      ? "down-arrow-icon down-arrow-icon-active"
                      : "down-arrow-icon"
                  }
                  icon={downArrow}
                />
              </Link>
              <ul
                className={
                  countryDropdown
                    ? "dropdown p-2 show-dropdown"
                    : "dropdown p-2"
                }
              >
                {countries.map((element, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setCountryDropdown(!countryDropdown);
                      }}
                    >
                      <Link
                        to={"/country/" + element?.iso_2_alpha}
                        className="flex gap-3"
                        type="btn"
                        onClick={() => {
                          setActive(!active);
                        }}
                      >
                        <img
                          src={element?.png}
                          srcset={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}
                          alt={element?.countryName}
                        />
                        <span>{element?.countryName}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li> */}

            <li>
              <Link
                to="#"
                className="no-underline font-semibold"
                onClick={toggleTheme}
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                ></input>
                <label htmlFor="checkbox" className="checkbox-label">
                  <i className="fas fa-moon"></i>
                  <i className="fas fa-sun"></i>
                  <span className="ball"></span>
                </label>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
