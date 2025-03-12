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
import { Button, Col, Form, Image, InputGroup, Nav } from "react-bootstrap";

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
        <Navbar.Brand href="#">
          <Col xs={6} md={4}>
            {theme.mode === "light" ? (
              <Image src={logo_white} alt="Logo" />
            ) : (
              <Image src={logo} alt="Logo" />
            )}
          </Col>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <InputGroup
              onMouseEnter={handleSearchClick}
              onMouseLeave={handleSearchClick}
              onKeyUp={(e) => handleInputSearch(e.target.value)}
            >
              <Form.Control placeholder="Search" aria-label="With textarea" />
            </InputGroup>
          </Form>
          <Nav.Link href="#action2">
            <CustomSelect
              theme={theme} // Correctly pass theme directly
              language={language} // Correctly pass language
              setLanguage={setLanguage} // Correctly pass setLanguage
            />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
