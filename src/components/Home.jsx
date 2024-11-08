import React, { useEffect, useState } from "react";
import { IoSearch, IoChevronDown } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(""); // Initialize with an empty string
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set items per page

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const res = await response.json();
      setData(res);
    };
    fetchData();
  }, []);

   // Filtered data based on search query
  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages based on filtered data length
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper to generate page numbers for compact pagination
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      // If total pages are 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first three, last page, and current neighbors
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
        {/* Search */}
        <div className="flex items-center p-2 bg-slate-100 rounded-lg">
          <IoSearch className="mr-2" />
          <input
            type="text"
            className="outline-none bg-transparent"
            placeholder="Search for a country..."
            onChange={(e) => {
              setQuery(e.target.value.toLowerCase());
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        {/* Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Filter by Region
              <IoChevronDown
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  All
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Africa
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Americas
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Asia
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Europe
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Oceania
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      {/* Cards */}
      <div className="grid gap-10 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((country) => (
            <Link
              className="rounded-lg drop-shadow-md bg-white cursor-pointer"
              to={`/country?name=${country.name.common}`}
              key={country.name.common}
            >
              <img
                src={country.flags.png}
                width={100}
                height={100}
                className="w-full rounded-t-lg"
                alt={`${country.name.common} flag`}
              />
              <div className="p-2">
                <h2 className="mb-2 font-bold text-lg">
                  {country.name.common}
                </h2>
                <p className="text-sm">
                  <b>Population:</b> {country.population}
                </p>
                <p className="text-sm">
                  <b>Region:</b> {country.region}
                </p>
                <p className="text-sm">
                  <b>Capital:</b> {country.capital?.[0]}
                </p>
              </div>
            </Link>
          ))}
      </div>
      {/* Pagination Controls */}
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
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
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
    </div>
  );
};

export default Home;
