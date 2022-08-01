// image
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "assets/images/pages/search/icon-search-white.png";

import tw from "twin.macro";

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
  ${tw`flex justify-center pt-[150px]`};
  
  input {
    ${tw`w-[700px] h-[50px] rounded-[25px] border-0 bg-[#FAFAFA] px-[20px] text-[16px] font-normal outline-0`};
    box-shadow: 0px 2px 16px 2px rgba(145, 82, 255, 0.2);

    &::placeholder {
      color: #B7B7B7;
    }
  }

  button {
    ${tw`ml-[20px] w-[60px] h-[50px] bg-[#9152FF] rounded-[25px] border-0 flex justify-center items-center`}
    box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);

    img {
      ${tw`w-[24px] h-[24px]`}
    }
  }
`;

export default SearchForm;