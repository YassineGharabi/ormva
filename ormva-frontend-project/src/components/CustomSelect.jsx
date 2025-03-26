import { useState, useRef } from "react";

const SelectWithSearch = ({ options , setSelectedEmployes , selectedEmployes }) => {
  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter options based on search
  const filteredOptions = options.filter(
    (opt) =>
      opt.nom_complet.toLowerCase().includes(search.toLowerCase()) &&
      !selectedOptions.includes(opt.id) // Match by 'id' now instead of 'value'
  );

  // Select an option
  const handleSelect = (id) => {
    setSelectedOptions([...selectedOptions, id]);
    setSelectedEmployes([ ...selectedEmployes , id ]);
    setSearch(""); // Reset search
  };

  // Remove selected option
  const handleRemove = (id) => {
    setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
    setSelectedEmployes(selectedEmployes.filter(optionId => optionId !== id));
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Attach event listener to close dropdown when clicking outside
  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-80" ref={dropdownRef}>
      {/* Input Field */}
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        placeholder="Search and select..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-[#171717] border rounded-lg shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id} // Use 'id' as the key
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#212121] rounded-lg dark:text-white"
                onClick={() => handleSelect(option.id)}
              >
                {option.nom_complet} {/* Display 'nom_complet' */}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}

      {/* Selected Items */}
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((id) => (
            <span
              key={id}
              className="px-3 py-1 bg-gray-300 rounded-full text-sm cursor-pointer dark:bg-white dark:text-black"
              onClick={() => handleRemove(id)}
            >
              {options.find((opt) => opt.id === id)?.nom_complet} ×
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectWithSearch;
