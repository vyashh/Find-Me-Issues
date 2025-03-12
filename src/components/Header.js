import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { useContext, useState, useEffect, useRef } from "react";
import logo from "./../logo.png";
import logo_white from "./../logo-white.png";
import { useDebouncedCallback } from "use-debounce";
// Context
import { ThemeContext } from "../Context/themeContext";
import Darkmode from "./Buttons/Darkmode";
import CustomSelect from "./Buttons/Language";
import { Form, Image, InputGroup } from "react-bootstrap";

const Header = ({ language, setLanguage, setInputSearch }) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [input, setInput] = useState(""); // Mirrors inputSearch and setInputSearch

  const debouncedInput = useDebouncedCallback(
    (value) => {
      setInputSearch(value);
    },
    // delay in ms
    1000
  );

  const handleInputSearch = (inputValue) => {
    setInputExpanded(true); // Keep input expanded while typing
    setInput(inputValue);
    debouncedInput(inputValue);
  };

  useEffect(() => {
    setInputSearch(input);
  }, [input, setInputSearch]);

  const [inputExpanded, setInputExpanded] = useState(false); // Control input expansion state

  const handleSearchClick = () => {
    setInputExpanded((prev) => !prev); // Expand input when clicked
  };

  return (
    <Navbar id="header" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          {theme.mode === "light" ? (
            <Image src={logo_white} alt="Logo" />
          ) : (
            <Image src={logo} alt="Logo" />
          )}
        </Navbar.Brand>

        <div className="flex justify-around items-center gap-11 w-full">
          <label
            className={`${
              theme.mode === "light" ? "bg-slate-200" : "bg-slate-500"
            }  flex rounded-3xl p-2 h-11 w-full md:w-[40rem]`}
          >
            <CustomSelect
              theme={theme} // Correctly pass theme directly
              language={language} // Correctly pass language
              setLanguage={setLanguage} // Correctly pass setLanguage
            />
            {/* Project Search Bar */}
            <InputGroup
              onMouseEnter={handleSearchClick}
              onMouseLeave={handleSearchClick}
              onKeyUp={(e) => handleInputSearch(e.target.value)}
            >
              <InputGroup.Text>🔎</InputGroup.Text>
              <Form.Control placeholder="Search" aria-label="With textarea" />
            </InputGroup>
          </label>
          <div
            onClick={changeTheme}
            className={
              "cursor-pointer max-lg:hidden! hover:scale-105 transition-all ease-linear duration-200"
            }
            style={{ fontSize: "1.5rem" }}
            aria-hidden="true"
          >
            <Darkmode />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
