// image
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "assets/images/pages/search/icon-search-white.png";
import { render } from "@testing-library/react";

function SearchForm () {
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    navigate("/search/" + keywordRef.current.value);
  }
  const keywordRef = useRef(null);
  return (
    <Form onSubmit={search}>
      <input type="text" ref={keywordRef} autoComplete="search" placeholder="전체 모음명, 조각명 검색으로 쉽게 찾아보세요." />
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
    font-size: 16px;
    font-weight: 400;
    outline: none;
    &::placeholder {
      color: #B7B7B7;
    }
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