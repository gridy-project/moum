// image
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "assets/images/pages/search/icon-search-white.png";

function SearchForm () {
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    navigate("/search/" + keywordRef.current.value);
  }
  const keywordRef = useRef(null);
  return (
    <Form onSubmit={search}>
      <input type="text" ref={keywordRef}/>
      <button>
        <img src={searchIcon} alt="search" />
      </button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding-top: 60px;

  input {
    width: 700px;
    height: 50px;
    box-shadow: 0px 2px 16px 2px rgba(145, 82, 255, 0.2);
    border-radius: 25px;
    border: none;
    background-color: #FAFAFA;
    padding: 0 20px;
    font-size: 18px;
    outline: none;
  }

  button {
    margin-left: 20px;
    width: 60px;
    height: 50px;
    background-color: #9152FF;
    box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
    border-radius: 25px;
    border: none;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export default SearchForm;