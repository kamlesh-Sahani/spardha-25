"use client";
import React, { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trash2,
  Edit,
  Filter,
  Columns,
  X,
  Eye,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react"
import PasskeyForm from "@/components/PassKeyForm"
import CustomListbox from "@/components/CustomListbox"

function ReportPage() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    event: true,
    college: true,
    amount: true,
    upiId: true,
    status: true,
  })
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [filterField, setFilterField] = useState("")
  const [filterCondition, setFilterCondition] = useState("equals")
  const [editModal, setEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [updatedData, setUpdatedData] = useState({})
  const [filterValue, setFilterValue] = useState("")
  const [authToken, setAuthToken] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedField, setSelectedField] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isFindDropdownOpen, setIsFindDropdownOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [selectedCollege, setSelectedCollege] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [firstSelectData, setFirstSelectData] = useState([])
  const [secondSelectData, setSecondSelectData] = useState([])


  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const fetchFirstSelectData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/data")
        setFirstSelectData(response.data)
      } catch (error) {
        console.error("Error fetching first select data:", error)
      }
    }
    fetchFirstSelectData()
  }, [])

  useEffect(() => {
    const fetchSecondSelectData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/collegedata")
        setSecondSelectData(response.data)
      } catch (error) {
        console.error("Error fetching second select data:", error)
      }
    }
    fetchSecondSelectData()
  }, [])

  const rowsPerPage = 10


  const handleViewDetails = (team) => {
    setSelectedPlayers(team)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPlayers(null)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/userdata/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      setData((prevData) => prevData.filter((item) => item._id !== id))
      setFilteredData((prevData) => prevData.filter((item) => item._id !== id))
    } catch (err) {
      console.error("Error deleting data:", err)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setUpdatedData(item)
    setEditModal(true)
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:7000/userdata/${editingItem._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
  
      if (response.status === 200) {
        console.log("Update successful:", response.data);
  
        // Update state without reloading
        setData((prevData) =>
          prevData.map((item) => (item._id === editingItem._id ? response.data : item))
        );
        setFilteredData((prevData) =>
          prevData.map((item) => (item._id === editingItem._id ? response.data : item))
        );
  
        setEditModal(false);
      } else {
        
      }
    } catch (err) {
      console.error("Error updating data:", err);
      alert("An error occurred while updating the record. Please try again.");
    }
  };
  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }))
  }

  const handleFilter = (field, condition, value) => {
    const filtered = data.filter((item) => {
      const itemValue = item[field]
      if (itemValue === undefined || itemValue === null) return false
      const stringValue = itemValue.toString().toLowerCase()
      const filterValue = value.toLowerCase()

      switch (condition) {
        case "equals":
          return stringValue === filterValue
        case "contains":
          return stringValue.includes(filterValue)
        case "startsWith":
          return stringValue.startsWith(filterValue)
        case "endsWith":
          return stringValue.endsWith(filterValue)
        default:
          return true
      }
    })
    setFilteredData(filtered)
    setTotalPages(Math.ceil(filtered.length / rowsPerPage))
    setCurrentPage(1)
  }

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value)
    handleFilter(e.target.value, filterCondition, filterValue)
  }

  const handleFilterConditionChange = (e) => {
    setFilterCondition(e.target.value)
    handleFilter(filterField, e.target.value, filterValue)
  }

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value)
    handleFilter(filterField, filterCondition, e.target.value)
  }

  const handleDropdownToggle = (dropdown) => {
    setIsColumnDropdownOpen(dropdown === "column" ? !isColumnDropdownOpen : false)
    setIsFilterDropdownOpen(dropdown === "filter" ? !isFilterDropdownOpen : false)
    setIsFindDropdownOpen(dropdown === "find" ? !isFindDropdownOpen : false)
  }

  const handleOpenImageModal = (imagePath) => {
    setSelectedImage(`http://localhost:7000${imagePath}`)
  }

  const handleFindData = () => {
    const filtered = data.filter((item) => {
      if (selectedEvent && item.event !== selectedEvent) return false
      if (selectedCollege && item.college !== selectedCollege) return false
      if (selectedStatus && item.status !== selectedStatus) return false
      return true
    })
    setFilteredData(filtered)
    setTotalPages(Math.ceil(filtered.length / rowsPerPage))
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSelectedEvent("")
    setSelectedCollege("")
    setSelectedStatus("")
    setFilteredData(data)
    setTotalPages(Math.ceil(data.length / rowsPerPage))
    setCurrentPage(1)
  }

  useEffect(() => {
    handleFindData()
  }, [selectedEvent, selectedCollege, selectedStatus])

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Event Report</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => handleDropdownToggle("column")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
        >
          <Columns className="inline-block mr-2" size={18} />
          Columns
        </button>
        <AnimatePresence>
          {isColumnDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700">
                  <span className="font-semibold text-gray-800 dark:text-white">Columns</span>
                  <button
                    onClick={() => setIsColumnDropdownOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                {Object.entries(visibleColumns).map(([column, isVisible]) => (
                  <label
                    key={column}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => handleColumnToggle(column)}
                      className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
                    />
                    <span className="ml-2 capitalize">{column}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative inline-block text-left">
          <button
            onClick={() => handleDropdownToggle("filter")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
          >
            <Filter className="inline-block mr-2" size={18} />
            Filter
            <ChevronDown className="ml-2" size={18} />
          </button>
          <AnimatePresence>
            {isFilterDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
              >
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center border-b dark:border-gray-700 pb-2 mb-2">
                    <span className="font-semibold text-gray-800 dark:text-white">Filter</span>
                    <button
                      onClick={() => setIsFilterDropdownOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <select
                    value={filterField}
                    onChange={handleFilterFieldChange}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select Field</option>
                    {Object.keys(visibleColumns).map((column) => (
                      <option key={column} value={column}>
                        {column}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterCondition}
                    onChange={handleFilterConditionChange}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="startsWith">Starts With</option>
                    <option value="endsWith">Ends With</option>
                  </select>
                  <input
                    type="text"
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    placeholder="Filter value"
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative inline-block text-left">
          <div className="flex gap-x-2 items-center">
            <button
              onClick={() => handleDropdownToggle("find")}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
            >
              Find
              <ChevronDown className="ml-2" size={18} />
            </button>
            <button
              onClick={handleResetFilters}
              className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Reset
            </button>
          </div>
          <AnimatePresence>
            {isFindDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
              >
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center border-b dark:border-gray-700 pb-2 mb-2">
                    <span className="font-semibold text-gray-800 dark:text-white">Find Options</span>
                    <button
                      onClick={() => setIsFindDropdownOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="space-y-4 z-50">
                    <CustomListbox
                      options={firstSelectData.map((item) => ({ value: item.EventName, label: item.EventName }))}
                      value={selectedEvent}
                      onChange={(value) => {
                        setSelectedEvent(value)
                        handleFindData()
                      }}
                      placeholder="Select Event"
                    />
                    <CustomListbox
                      options={secondSelectData.map((item) => ({ value: item.collegename, label: item.collegename }))}
                      value={selectedCollege}
                      onChange={(value) => {
                        setSelectedCollege(value)
                        handleFindData()
                      }}
                      placeholder="Select College"
                    />
                    <CustomListbox
                      options={[
                        { value: "Pending", label: "Pending" },
                        { value: "Reviewed", label: "Reviewed" },
                        { value: "Approved", label: "Approved" },
                      ]}
                      value={selectedStatus}
                      onChange={(value) => {
                        setSelectedStatus(value)
                        handleFindData()
                      }}
                      placeholder="Select Status"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
              {Object.entries(visibleColumns).map(
                ([column, isVisible]) =>
                  isVisible && (
                    <th key={column} className="py-3 px-6 text-left">
                      {column}
                    </th>
                  ),
              )}
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {visibleColumns.date && (
                  <td className="py-3 px-6 text-left font-medium whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                )}
                {visibleColumns.event && (
                  <td className="py-3 px-6 text-left font-medium whitespace-nowrap">{item.event}</td>
                )}
                {visibleColumns.college && (
                  <td className="py-3 px-6 text-left font-medium whitespace-nowrap">{item.college}</td>
                )}
                {visibleColumns.amount && (
                  <td className="py-3 px-6 text-left font-medium whitespace-nowrap">{item.amount || "N/A"}</td>
                )}
                {visibleColumns.upiId && (
                  <td className="py-3 px-6 text-left font-medium whitespace-nowrap">{item.upiId}</td>
                )}
                {visibleColumns.status && (
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-2 py-1 rounded-full font-medium text-xs ${
                        item.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : item.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : item.status === "Reviewed"
                              ? "bg-indigo-200 text-indigo-800"
                              : "bg-slate-200 text-slate-900"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                )}
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Next
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedPlayers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-3xl w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Team Details</h2>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Captain Details</h3>
                <table className="w-full border-collapse mb-4">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Image</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Name</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">ID</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Mobile</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">
                        <img
                          src={`http://localhost:7000${selectedPlayers.idCardPicPath || "/default-image.jpg"}`}
                          alt="Captain"
                          className="w-12 h-12 rounded-full object-cover cursor-pointer"
                          onClick={() => handleOpenImageModal(selectedPlayers.idCardPicPath)}
                        />
                      </td>
                      <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                        {selectedPlayers.captain.name}
                      </td>
                      <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                        {selectedPlayers.captain.id}
                      </td>
                      <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                        {selectedPlayers.captain.mobile}
                      </td>
                      <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                        {selectedPlayers.captain.gender}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Player Details</h3>
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Image</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Name</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">ID</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Mobile</th>
                      <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-200">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPlayers.players.map((player, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <img
                            src={`http://localhost:7000${player.playerIdCardPicPath || "/default-image.jpg"}`}
                            alt={`Player ${index + 1}`}
                            className="w-12 h-12 rounded-full object-cover cursor-pointer"
                            onClick={() => handleOpenImageModal(player.playerIdCardPicPath)}
                          />
                        </td>
                        <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">{player.name}</td>
                        <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">{player.id}</td>
                        <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">{player.mobile}</td>
                        <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">{player.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Full size"
              className="max-w-[80%] max-h-[80%] object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editModal && editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-3xl w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit Item</h2>
              <form
              className="max-h-[300px] overflow-y-scroll"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="event" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Event
                    </label>
                    <input
                      type="text"
                      id="event"
                      value={updatedData.event}
                      onChange={(e) => setUpdatedData({ ...updatedData, event: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      College
                    </label>
                    <input
                      type="text"
                      id="college"
                      value={updatedData.college}
                      onChange={(e) => setUpdatedData({ ...updatedData, college: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={updatedData.amount}
                      onChange={(e) => setUpdatedData({ ...updatedData, amount: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      value={updatedData.upiId}
                      onChange={(e) => setUpdatedData({ ...updatedData, upiId: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      id="status"
                      value={updatedData.status}
                      onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Captain Details</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={updatedData.captain?.name || ""}
                        onChange={(e) =>
                          setUpdatedData({ ...updatedData, captain: { ...updatedData.captain, name: e.target.value } })
                        }
                        placeholder="Captain Name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <input
                        type="text"
                        value={updatedData.captain?.id || ""}
                        onChange={(e) =>
                          setUpdatedData({ ...updatedData, captain: { ...updatedData.captain, id: e.target.value } })
                        }
                        placeholder="Captain ID"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <input
                        type="text"
                        value={updatedData.captain?.mobile || ""}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            captain: { ...updatedData.captain, mobile: e.target.value },
                          })
                        }
                        placeholder="Captain Mobile"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-700 dark:text-gray-300">
                      Players Details
                    </h3>
                    {updatedData.players &&
                      updatedData.players.map((player, index) => (
                        <div key={index} className="space-y-2 mb-4">
                          <label htmlFor="players">{`Player ${index+1}`}</label>
                          <input
                            type="text"
                            value={player.name || ""}
                            onChange={(e) => {
                              const newPlayers = [...updatedData.players]
                              newPlayers[index] = { ...newPlayers[index], name: e.target.value }
                              setUpdatedData({ ...updatedData, players: newPlayers })
                            }}
                            placeholder={`Player ${index + 1} Name`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          <input
                            type="text"
                            value={player.id || ""}
                            onChange={(e) => {
                              const newPlayers = [...updatedData.players]
                              newPlayers[index] = { ...newPlayers[index], id: e.target.value }
                              setUpdatedData({ ...updatedData, players: newPlayers })
                            }}
                            placeholder={`Player ${index + 1} ID`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          <input
                            type="text"
                            value={player.mobile || ""}
                            onChange={(e) => {
                              const newPlayers = [...updatedData.players]
                              newPlayers[index] = { ...newPlayers[index], mobile: e.target.value }
                              setUpdatedData({ ...updatedData, players: newPlayers })
                            }}
                            placeholder={`Player ${index + 1} Mobile`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReportPage

