import { useEffect, useRef, useState } from "react";
import langugagesData from "../../data/languages.json";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

const CustomSelect = ({ theme, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelect = (lang) => {
    setLanguage(lang);
  };
  useEffect(() => {
    setIsOpen(false);
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Handle click events outside of dropdown Menu
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={selectRef}>
      {/* Custom Select Button */}
      <DropdownButton
        variant="success"
        onClick={() => setIsOpen(!isOpen)}
        title="Language"
      >
        {isOpen && (
          <>
            {langugagesData.languages.map((lang, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(lang)}>
                {lang}
              </Dropdown.Item>
            ))}
          </>
        )}
      </DropdownButton>

      {/* Dropdown Menu */}
    </div>
  );
};

export default CustomSelect;
