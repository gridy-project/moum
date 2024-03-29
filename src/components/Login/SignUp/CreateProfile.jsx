import React, { useState, useRef } from 'react';
// React Query
import { useMutation } from 'react-query';
// Axios
import { instance } from 'shared/axios';
// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { JoinIdState, JoinNicknameState, JoinPasswordState, JoinEmailState, JoinImgPathState } from 'state/login';
// css
import tw from "twin.macro";
import Swal from "sweetalert2";
import styled, { css }  from "styled-components";
import profile1 from "../../../assets/images/pages/login/profile1.png";
import profile2 from "../../../assets/images/pages/login/profile2.png";
import profile3 from "../../../assets/images/pages/login/profile3.png";
import profile4 from "../../../assets/images/pages/login/profile4.png";
import profile5 from "../../../assets/images/pages/login/profile5.png";
import profile6 from "../../../assets/images/pages/login/profile6.png";
import check2 from "../../../assets/images/pages/login/check2.png"
import { useNavigate } from 'react-router-dom';
import useMessageFloat from 'hooks/useMessageFloat';

const CreateProfile = () => {
  const navigate = useNavigate();
  const toast = useMessageFloat();
  const arr = [profile1, profile2, profile3, profile4, profile5, profile6]
  const [selected, setSelected] = useState(0);

  const nicknameRef = useRef();

  const profileZero = "https://i.postimg.cc/2jXgpBV5/profile1.png"
  const profileOne = "https://i.postimg.cc/TYPL11jF/profile2.png"
  const profileTwo = "https://i.postimg.cc/0N7rFwxM/profile3.png"
  const profileThree = "https://i.postimg.cc/XqYJr15d/profile4.png"
  const profileFour = "https://i.postimg.cc/154XPTsZ/profile5.png"
  const profileFive = "https://i.postimg.cc/d0cV2Vdq/profile6.png"

  const profiles = [profileZero, profileOne, profileTwo, profileThree, profileFour, profileFive]

  // 아이디 중복 확인
  const clickIdCheck = () => {
    if (nicknameRef.current.value.length > 10) {
      Swal.fire({
        icon: "error",
        title: "닉네임은 10자 이하로 입력해 주세요"
      })
      return false;
    } else {
      IdDupCheck(nicknameRef.current.value);
    }
  }

  const { mutate: IdDupCheck } = useMutation(
    async (nickname) => {
      const response = await instance.get(`/user/nameDupCheck/${nickname}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data === true){
          Swal.fire({
            icon: "success",
            title: "사용 가능한 닉네임입니다."
          }) 
        } else if (data === false){
            Swal.fire({
              icon: "error",
              title: "중복된 닉네임입니다."
            }) 
        }
      },
			onError: (err) => {
			}
    }
  ) 
// 회원가입 프로필 이미지 1장 업로드
  const imageRef = useRef(null);

  const joinIdState = useRecoilValue(JoinIdState)
  const [joinNicknameState, setJoinNinknameState] = useRecoilState(JoinNicknameState)
  const joinPwdState = useRecoilValue(JoinPasswordState)
  const joinEmailState = useRecoilValue(JoinEmailState)
  const setJoinImgPathState = useSetRecoilState(JoinImgPathState)
  
  // 이미지 보내기
  const [selectImg, setSelectImg] = useState(0);

 const choiceImage = (i) => {
  setSelectImg(profiles[i])
 }

   // 회원가입
  const clickSignUp = () => {

    const data = {
      username: joinIdState,
      nickname: joinNicknameState,
      password: joinPwdState,
      email : joinEmailState,
      imgPath: selectImg
    }
    signUp(data);
  }

  const { mutate: signUp } = useMutation(
    async (data) => {
      const response = await instance.post("/user/signup", data);
      return response;
    },
    {
      onSuccess: (data) => {
        if (data.result === true) {
          toast("회원가입이 완료되었습니다");
          navigate("/login");
        } else if (data.statusCode === 404){
          Swal.fire({
            icon: "error",
            title: data.message
          }) 
        } else if (data.statusCode === 501) {
          Swal.fire({
            icon: "error",
            title: data.message
          }) 
        } else if (data.statusCode === 502) {
          Swal.fire({
            icon: "error",
            title: data.message
          }) 
        }
      }
    }
  )

  return (
    <Container>
      <ProfileTitle>
        <h1>환영합니다!</h1>
        <h2>내 프로필을 바로 만들어봐요.</h2>
      </ProfileTitle>
      <NicknameBox>
        <p>닉네임 (계정명)</p>
        <InputBox>
          <input
            ref={nicknameRef}
            type="text" 
            placeholder="공백 포함 최대 10글자 입력 가능"
            maxLength="10"
            onChange={(e)=> {setJoinNinknameState(e.target.value)}}
            autoComplete="nickname"
          />
          <button onClick={clickIdCheck}>중복 확인</button>
        </InputBox>
      </NicknameBox>
      <SelectProfileBox>
        <p>프로필 사진 선택</p>
        <ImageBox>
          {arr.map((v,i) => {
            return <div
            key={i}
            onChange={(e)=> {setJoinImgPathState(e.target.value)}}           
            onClick={() => {
              setSelected(v);
              choiceImage(i);
            }}>
              <ProfileImg 
                src={v} 
                alt="" 
                isActive={selected === v} 
                ref={imageRef}           
              /> 
              <CheckImgCircle isActive={selected === v}>
                <CheckImg src={check2} isActive={selected === v} alt=""/>
              </CheckImgCircle> 
            </div> 
          })}
        </ImageBox>
      </SelectProfileBox>
      <StartBtn onClick={clickSignUp}>moum 시작하기</StartBtn>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
    w-[360px] h-[100%] flex flex-col justify-center
  `}

  @media screen and (max-width: 1600px) {
    ${tw`w-330`}
  }
`
const ProfileTitle = styled.div`
  ${tw`mb-[28px]`}
  h1, h2 {
    ${tw`text-24 text-[#303030] font-semibold`}

    @media screen and (max-width: 1600px) {
      ${tw`text-22`}
    }
  }

  @media screen and (max-width: 1600px) {
    ${tw`mb-36`}
  }
`;

const NicknameBox = styled.div`
  p {
    ${tw`font-medium mb-[15px] text-17 text-[#303030]`};

    @media screen and (max-width: 1600px) {
      ${tw`text-15`}
    }
  }
`;

const InputBox = styled.div`
 ${tw`
    mb-[28px]
  `}
  input {
    border: #B7B7B7;
    font-size: 16px;
    color:#949494;
    &:focus {
        outline: 1px solid #9152FF;
      }
    ${tw`
      w-[264px] h-[44px] border-solid border-[1px] rounded-[10px] mr-[8px] p-[14px] font-medium
    `}

    @media screen and (max-width: 1600px) {
      ${tw`h-40 w-244 text-14`}
    }
  }
  button {
    ${tw`
      w-[88px] h-[44px] border-solid border-none cursor-pointer rounded-[10px] bg-[#9E67FF] text-[#FFFFFF]
    `}

    @media screen and (max-width: 1600px) {
      ${tw`h-40 w-76 text-14`}
    }
  }
`
const SelectProfileBox = styled.div`
  p {
    font-size: 17px;
    color:#303030;
    ${tw`
      font-medium mb-[22px]
    `}

    @media screen and (max-width: 1600px) {
      ${tw`text-15`}
    }
  }
`
const ProfileImg = styled.img`
  ${tw`
    mb-[17px] w-[100px] h-[100px] cursor-pointer
  `}

  ${(props) =>
    props.isActive ? 
    css`   
      border: 3px solid #9152FF;
      border-radius: 100px;
    `:
    css`
      border : 3px solid #ECECEC;
      border-radius:100%;
    `
  }

  @media screen and (max-width: 1600px) {
    ${tw`h-88 w-88 text-14`}
  }
`;

const ImageBox = styled.div`
grid-template-columns: 130px 130px 130px;
grid-template-rows: 120px 120px;
${tw`relative grid`}


@media screen and (max-width: 1600px) {
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 105px 100px;
}
`
const CheckImgCircle = styled.div`
  background: #9152FF;
  ${tw`
    w-[32px] h-[31.7px] relative rounded-[100%] top-[-120px] left-[75px] flex justify-center items-center
  `}
  ${(props) =>
    props.isActive ? 
    css`   
      visibility: visible;
    `:
    css`
      visibility: hidden;
    `
  }

  @media screen and (max-width: 1600px) {
    ${tw`left-65 top-[-105px] h-28 w-28 text-14`}
  }
`

const CheckImg = styled.img`
  ${tw`
    w-[12.73px] h-[8.93px] relative
  `}
  ${(props) =>
    props.isActive ? 
    css`   
      visibility: visible;
    `:
    css`
      visibility: hidden;
    `
  }
`

const StartBtn = styled.button`
  background: #9E67FF;
  font-size: 17px;
  color:#fff;
  ${tw`
    w-[360px] h-[44px] mt-[20px] rounded-[50px] font-semibold border-none cursor-pointer
  `}
  @media screen and (max-width: 1600px) {
    ${tw`h-40 w-330`}
  }
`
export default CreateProfile;