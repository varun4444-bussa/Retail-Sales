import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  RefreshCcw,
  LayoutDashboard,
  Layers,
  FileText,
  Briefcase,
  ChevronRight,
  Copy,
} from "lucide-react";
import { api } from "./utils/api";

// Sidebar Component
const Sidebar = () => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">Vault</h2>
            <p className="text-xs text-gray-500">Anurag Yadav</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <nav className="p-4 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span className="text-sm">Nexus</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">Intake</span>
        </a>

        <div>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            <span className="text-sm flex-1 text-left">Services</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                servicesOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {servicesOpen && (
            <div className="ml-7 mt-1 space-y-1">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Pre-active
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Active
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Blocked
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Closed
              </a>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setInvoicesOpen(!invoicesOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm flex-1 text-left">Invoices</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                invoicesOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {invoicesOpen && (
            <div className="ml-7 mt-1 space-y-1">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Proforma Invoices
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                Final Invoices
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

// Dropdown Component
const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (multiple) {
      const newValue = value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option];
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const displayText = multiple
    ? value.length > 0
      ? `${label} (${value.length})`
      : label
    : value || label;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-50 transition-colors text-sm"
      >
        <span className="text-gray-700">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[200px] max-h-[300px] overflow-y-auto">
            {options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  checked={multiple ? value.includes(option) : value === option}
                  onChange={() => handleSelect(option)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Age Range Dropdown
const AgeRangeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempMin, setTempMin] = useState(value.min || "");
  const [tempMax, setTempMax] = useState(value.max || "");

  const applyRange = () => {
    onChange({ min: tempMin, max: tempMax });
    setIsOpen(false);
  };

  const displayText =
    value.min || value.max
      ? `Age: ${value.min || "0"}-${value.max || "100"}`
      : "Age Range";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-50 transition-colors text-sm"
      >
        <span className="text-gray-700">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 p-4 min-w-[250px]">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Min Age
                </label>
                <input
                  type="number"
                  value={tempMin}
                  onChange={(e) => setTempMin(e.target.value)}
                  placeholder="18"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Max Age
                </label>
                <input
                  type="number"
                  value={tempMax}
                  onChange={(e) => setTempMax(e.target.value)}
                  placeholder="80"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <button
                onClick={applyRange}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Date Range Dropdown
const DateRangeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState(value.start || "");
  const [tempEnd, setTempEnd] = useState(value.end || "");

  const applyRange = () => {
    onChange({ start: tempStart, end: tempEnd });
    setIsOpen(false);
  };

  const displayText = value.start || value.end ? "Date Range ✓" : "Date";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-50 transition-colors text-sm"
      >
        <span className="text-gray-700">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 p-4 min-w-[250px]">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={tempStart}
                  onChange={(e) => setTempStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={tempEnd}
                  onChange={(e) => setTempEnd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <button
                onClick={applyRange}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SalesManagementSystem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date-desc");

  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    ageRange: { min: "", max: "" },
    category: [],
    tags: [],
    paymentMethod: [],
    dateRange: { start: "", end: "" },
  });

  const itemsPerPage = 10;

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Clear any existing data first
        setData([]);

        // Fetch data from backend API
        const response = await api.getSamples();

        // Debug: Log the raw response to inspect structure
        console.log("=== API Response Debug ===");
        console.log("Response:", response);
        console.log("Type:", typeof response);
        console.log("Is Array:", Array.isArray(response));
        console.log(
          "Response keys:",
          response && typeof response === "object"
            ? Object.keys(response)
            : "N/A"
        );
        if (Array.isArray(response) && response.length > 0) {
          console.log("First item structure:", response[0]);
          console.log("First item keys:", Object.keys(response[0]));
        }

        // Handle different response structures
        let samples = [];
        if (Array.isArray(response)) {
          // Direct array response (when getAll=true)
          samples = response;
          console.log("Using direct array, length:", samples.length);
        } else if (response && Array.isArray(response.data)) {
          // Paginated response structure
          samples = response.data;
          console.log("Using response.data, length:", samples.length);
        } else if (response && typeof response === "object") {
          // Try to extract data from response object
          samples = response.data || response.samples || response.results || [];
          console.log("Extracted from object, length:", samples.length);
        }

        // Validate and set the fetched data
        if (Array.isArray(samples) && samples.length > 0) {
          console.log("Setting data with", samples.length, "items");
          console.log("Sample item:", samples[0]);
          setData(samples);
        } else {
          console.warn("No valid data found. Samples:", samples);
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data from server");
        setData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debug: Log data state changes
  useEffect(() => {
    console.log("=== Data State Update ===");
    console.log("Data length:", data.length);
    console.log("Data type:", Array.isArray(data));
    if (data.length > 0) {
      console.log("First data item:", data[0]);
      console.log("Data item keys:", Object.keys(data[0]));
    }
  }, [data]);

  // Generate filter options dynamically from data
  const filterOptions = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        region: [],
        gender: [],
        category: [],
        tags: [],
        paymentMethod: [],
      };
    }

    return {
      region: [
        ...new Set(
          data
            .map((item) => item.Customer_Region || item.customer_region)
            .filter(Boolean)
        ),
      ].sort(),
      gender: [
        ...new Set(data.map((item) => item.Gender).filter(Boolean)),
      ].sort(),
      category: [
        ...new Set(
          data
            .map((item) => item.Product_Category || item.product_category)
            .filter(Boolean)
        ),
      ].sort(),
      tags: [...new Set(data.map((item) => item.Tags).filter(Boolean))].sort(),
      paymentMethod: [
        ...new Set(
          data
            .map((item) => item.Payment_Method || item.payment_method)
            .filter(Boolean)
        ),
      ].sort(),
    };
  }, [data]);

  const resetFilters = () => {
    setFilters({
      region: [],
      gender: [],
      ageRange: { min: "", max: "" },
      category: [],
      tags: [],
      paymentMethod: [],
      dateRange: { start: "", end: "" },
    });
    setSearchTerm("");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const filteredAndSortedData = useMemo(() => {
    // Ensure data is an array
    if (!Array.isArray(data) || data.length === 0) {
      console.log("filteredAndSortedData: No data available");
      return [];
    }

    console.log("filteredAndSortedData: Processing", data.length, "items");
    let result = [...data];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter((item) => {
        const name = (
          item.Customer_Name ||
          item.customer_name ||
          ""
        ).toLowerCase();
        const phone = (item.Phone_Number || item.phone_number || "").toString();
        return name.includes(search) || phone.includes(search);
      });
    }

    if (filters.region.length > 0) {
      result = result.filter((item) =>
        filters.region.includes(item.Customer_Region || item.customer_region)
      );
    }
    if (filters.gender.length > 0) {
      result = result.filter((item) => filters.gender.includes(item.Gender));
    }
    if (filters.category.length > 0) {
      result = result.filter((item) =>
        filters.category.includes(
          item.Product_Category || item.product_category
        )
      );
    }
    if (filters.tags.length > 0) {
      result = result.filter((item) => filters.tags.includes(item.Tags));
    }
    if (filters.paymentMethod.length > 0) {
      result = result.filter((item) =>
        filters.paymentMethod.includes(
          item.Payment_Method || item.payment_method
        )
      );
    }

    if (filters.ageRange.min) {
      result = result.filter(
        (item) => item.Age >= parseInt(filters.ageRange.min)
      );
    }
    if (filters.ageRange.max) {
      result = result.filter(
        (item) => item.Age <= parseInt(filters.ageRange.max)
      );
    }

    if (filters.dateRange.start) {
      result = result.filter((item) => item.Date >= filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      result = result.filter((item) => item.Date <= filters.dateRange.end);
    }

    switch (sortBy) {
      case "none":
        // Reset to original state (no sorting)
        return [...result];
      case "date-desc":
        result.sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA;
        });
        break;
      case "date-asc":
        result.sort((a, b) => {
          const dateA = a.Date ? new Date(a.Date) : new Date(0);
          const dateB = b.Date ? new Date(b.Date) : new Date(0);
          return dateA - dateB;
        });
        break;
      case "quantity-desc":
        result.sort(
          (a, b) => (Number(b.Quantity) || 0) - (Number(a.Quantity) || 0)
        );
        break;
      case "quantity-asc":
        result.sort(
          (a, b) => (Number(a.Qantity) || 0) - (Number(b.Quantity) || 0)
        );
        break;
      case "name-asc":
        result.sort((a, b) => {
          const nameA = (a.Customer_Name || a.customer_name || "").toLowerCase();
          const nameB = (b.Customer_Name || b.customer_name || "").toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
      case "name-desc":
        result.sort((a, b) => {
          const nameA = (a.customerName || a.customer_name || "").toLowerCase();
          const nameB = (b.customerName || b.customer_name || "").toLowerCase();
          return nameB.localeCompare(nameA);
        });
        break;
      default:
        break;
    }

    console.log(
      "filteredAndSortedData: After filtering/sorting, result length:",
      result.length
    );
    return result;
  }, [data, searchTerm, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalStats = useMemo(() => {
    const totalUnits = filteredAndSortedData.reduce(
      (sum, item) => sum + (Number(item.Quantity) || 0),
      0
    );
    const totalAmount = filteredAndSortedData.reduce(
      (sum, item) => sum + (Number(item.Total_Amount) || 0),
      0
    );
    const totalDiscount = filteredAndSortedData.reduce((sum, item) => {
      const total = Number(item.Total_Amount) || 0;
      const final = Number(item.Final_Amount) || 0;
      return sum + (total - final);
    }, 0);
    const discountPercentage =
      totalAmount > 0 ? ((totalDiscount / totalAmount) * 100).toFixed(0) : 0;
    return { totalUnits, totalAmount, totalDiscount, discountPercentage };
  }, [filteredAndSortedData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show message if no data
  if (!loading && !error && data.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <div className="ml-64">
          <div className="max-w-[1600px] mx-auto p-6">
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No data available</p>
              <p className="text-gray-500 text-sm">
                The database appears to be empty. Please add some transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="ml-64">
        <div className="max-w-[1600px] mx-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sales Management System
              </h1>
              {!loading && (
                <p className="text-sm text-gray-500 mt-1">
                  {data.length > 0
                    ? `Showing ${filteredAndSortedData.length} of ${data.length} transactions`
                    : "No transactions found"}
                </p>
              )}
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Name, Phone no."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 ">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={resetFilters}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors bg-gray-100"
                    title="Reset all filters"
                  >
                    <RefreshCcw className="w-3 h-3 text-gray-600" />
                  </button>

                  <FilterDropdown
                    label="Customer Region"
                    options={filterOptions.region}
                    value={filters.region}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, region: val }));
                      setCurrentPage(1);
                    }}
                    multiple
                  />

                  <FilterDropdown
                    label="Gender"
                    options={filterOptions.gender}
                    value={filters.gender}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, gender: val }));
                      setCurrentPage(1);
                    }}
                    multiple
                  />

                  <AgeRangeDropdown
                    value={filters.ageRange}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, ageRange: val }));
                      setCurrentPage(1);
                    }}
                  />

                  <FilterDropdown
                    label="Product Category"
                    options={filterOptions.category}
                    value={filters.category}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, category: val }));
                      setCurrentPage(1);
                    }}
                    multiple
                  />

                  <FilterDropdown
                    label="Tags"
                    options={filterOptions.tags}
                    value={filters.tags}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, tags: val }));
                      setCurrentPage(1);
                    }}
                    multiple
                  />

                  <FilterDropdown
                    label="Payment Method"
                    options={filterOptions.paymentMethod}
                    value={filters.paymentMethod}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, paymentMethod: val }));
                      setCurrentPage(1);
                    }}
                    multiple
                  />

                  <DateRangeDropdown
                    value={filters.dateRange}
                    onChange={(val) => {
                      setFilters((prev) => ({ ...prev, dateRange: val }));
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2 py-2  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sn bg-gray-100"
                  >
                     <option value="date-desc">
                      Sort by: None
                    </option>
                    <option value="date-desc">
                      Sort by: Date (Newest First)
                    </option>
                    <option value="date-asc">
                      Sort by: Date (Oldest First)
                    </option>
                    <option value="quantity-desc">
                      Sort by: Quantity (High to Low)
                    </option>
                    <option value="quantity-asc">
                      Sort by: Quantity (Low to High)
                    </option>
                    <option value="name-asc">
                      Sort by: Customer Name (A-Z)
                    </option>
                    <option value="name-desc">
                      Sort by: Customer Name (Z-A)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200 ">
              <div className="flex gap-3">
                {/* Card 1 – Total units sold */}
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-sm text-gray-600">
                      Total units sold
                    </span>
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                      i
                    </span>
                  </div>
                  <div className="text-l font-bold text-gray-900">
                    {totalStats.totalUnits}
                  </div>
                </div>

                {/* Card 2 – Total Amount */}
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                      i
                    </span>
                  </div>
                  <div className="text-l font-bold text-gray-900">
                    ₹{totalStats.totalAmount.toLocaleString("en-IN")} (
                    {filteredAndSortedData.length} SRs)
                  </div>
                </div>

                {/* Card 3 – Total Discount */}
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Total Discount
                    </span>
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                      i
                    </span>
                  </div>
                  <div className="text-l font-bold text-gray-900">
                    ₹{totalStats.totalDiscount.toLocaleString("en-IN")} (
                    {totalStats.discountPercentage} SRs)
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              

              <table className="w-full table-auto">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Customer ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Customer name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Product Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Product Id
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Employee Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Price Per Unit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Discount Percentage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Customer Region
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Final_Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Delivery Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Store ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Store Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Salesperson ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, idx) => {
                      // Ensure item is an object
                      if (!item || typeof item !== "object") {
                        console.warn("Invalid item at index", idx, ":", item);
                        return null;
                      }

                      return (
                        <tr
                          key={item.transactionId || item._id || `row-${idx}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.Transaction_ID || item.transaction_id || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Date || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Customer_ID || item.customer_id || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {item.Customer_Name || item.customer_name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2 group">
                              <span className="group-hover:underline cursor-pointer">
                                {item.Phone_Number || item.phone_number || "-"}
                              </span>

                              {/* Copy icon - hidden until hover */}
                              {(item.phoneNumber || item.phone_number) && (
                                <button
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      item.phoneNumber || item.phone_number
                                    )
                                  }
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                                  title="Copy"
                                >
                                  <Copy className="w-4 h-4 cursor-pointer" />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Gender || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Age || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Product_Category ||
                              item.product_category ||
                              "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Product_ID || item.product_id || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {item.Quantity || 0}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            ₹
                            {(
                              item.Total_Amount ||
                              item.total_amount ||
                              0
                            ).toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Employee_Name || item.employee_name || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Customer_Type || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Brand || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Tags || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Price_per_Unit || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Discount_Percentage ||
                              item.customer_region ||
                              "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Total_Amoun || item.Customer_Region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Total_Amount || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Final_Amount || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Payment_Method || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Delivery_Type || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Store_ID || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Store_Location || item.customer_region || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {item.Salesperson_ID || item.customer_region || "-"}
                          </td>
                        </tr>
                      );
                    })
                  ) : data.length > 0 ? (
                    <tr>
                      <td
                        colSpan="13"
                        className="px-4 py-12 text-center text-gray-500"
                      >
                        <div className="text-lg mb-2">
                          No results match your filters
                        </div>
                        <div className="text-sm">
                          Data exists ({data.length} items) but filters exclude
                          all results
                        </div>
                        <button
                          onClick={resetFilters}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Reset Filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td
                        colSpan="13"
                        className="px-4 py-12 text-center text-gray-500"
                      >
                        <div className="text-lg mb-2">No data available</div>
                        <div className="text-sm">
                          No transactions found in the database
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {(() => {
                let startPage = Math.max(1, currentPage - 1);
                let endPage = Math.min(totalPages, startPage + 2);

                // Adjust startPage if we are at the end
                startPage = Math.max(1, endPage - 2);

                const pages = [];
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i ? "bg-black text-white" : ""
                      }`}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-3 py-1 border rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesManagementSystem;
