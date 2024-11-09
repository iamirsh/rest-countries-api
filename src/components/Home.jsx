import React, { useEffect, useState } from "react";
import { IoSearch, IoChevronDown } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import ShimmerEffect from "./ShimmerEffect";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const res = await response.json();
      setData(res);
    };
    fetchData();
  }, []);

  // if (!data.length) {
  //   return <ShimmerEffect />;
  // }

  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push("...", currentPage, "...");
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 2);
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="px-10">
      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center p-2 bg-slate-100 rounded-lg">
          <IoSearch className="mr-2" />
          <input
            type="text"
            className="outline-none bg-transparent"
            placeholder="Search for a country..."
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase());
              setCurrentPage(1);
            }}
          />
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Filter by Region
            <IoChevronDown
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(
              (region) => (
                <MenuItem key={region}>
                  <button className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100">
                    {region}
                  </button>
                </MenuItem>
              )
            )}
          </MenuItems>
        </Menu>
      </div>

      {!data.length ? (
        <ShimmerEffect />
      ) : (
        <>
          <div className="grid gap-10 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((country) => (
              <Link
                className="rounded-lg drop-shadow-md bg-white cursor-pointer"
                to={`${country.name.common}`}
                key={country.name.common}
              >
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col space-y-1">
                  <h2 className="font-bold text-lg truncate">
                    {country.name.common}
                  </h2>
                  <p className="text-sm">
                    <b>Population:</b> {country.population.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <b>Region:</b> {country.region}
                  </p>
                  <p className="text-sm">
                    <b>Capital:</b> {country.capital?.[0] || "N/A"}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center my-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
            >
              Previous
            </button>
            {generatePageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-3 py-1 text-gray-500">
                  {page}
                </span>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
