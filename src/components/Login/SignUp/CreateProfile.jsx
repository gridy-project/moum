import React, { useState, useRef } from 'react';
// React Query
import { useMutation } from 'react-query';
// Axios
import { instance } from 'shared/axios';
// Recoil
import { useRecoilState } from "recoil";
import { JoinIdState, JoinNicknameState, JoinPasswordState, JoinEmailState, JoinImgPathState } from 'state/login';
// css
import styled, { css }  from "styled-components";
import profile1 from "../../../assets/images/pages/login/profile1.png";
import profile2 from "../../../assets/images/pages/login/profile2.png";
import profile3 from "../../../assets/images/pages/login/profile3.png";
import profile4 from "../../../assets/images/pages/login/profile4.png";
import profile5 from "../../../assets/images/pages/login/profile5.png";
import profile6 from "../../../assets/images/pages/login/profile6.png";
import check2 from "../../../assets/images/pages/login/check2.png"

const CreateProfile = () => {
  const arr = [profile1, profile2, profile3, profile4, profile5, profile6]
  const [selected, setSelected] = useState(0);
  const nicknameRef = useRef();

  const profileZero = "https://i.postimg.cc/2jXgpBV5/profile1.png"
  const profileOne = "https://i.postimg.cc/TYPL11jF/profile2.png"
  const profileTwo = "https://i.postimg.cc/0N7rFwxM/profile3.png"
  const profileThree = "https://i.postimg.cc/XqYJr15d/profile4.png"
  const profileFour = "https://i.postimg.cc/154XPTsZ/profile5.png"
  const profileFive = "https://i.postimg.cc/d0cV2Vdq/profile6.png"

  const profiles = [profileZero, profileOne, profileTwo, profileThree, profileFour, profileFive
  ]
  // 아이디 중복 확인
  const clickIdCheck = () => {
    IdDupCheck(nicknameRef.current.value);
  }

  const { mutate: IdDupCheck } = useMutation(
    async (nickname) => {
      const response = await instance.get(`/user/nameDupCheck/${nickname}`);
      console.log(response)
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        if (data === true){
          window.alert("사용 가능한 닉네임입니다.")
        } else if (data === false){
          window.alert("중복된 닉네임입니다.")
        }
      },
			onError: (err) => {
				// console.log(err)
			}
    }
  ) 
// 회원가입 프로필 이미지 1장 업로드
  const imageRef = useRef(null);
  const [joinIdState, setJoinIdState] = useRecoilState(JoinIdState)
  const [joinNicknameState, setJoinNinknameState] = useRecoilState(JoinNicknameState)
  const [joinPwdState, setJoinPwdState] = useRecoilState(JoinPasswordState)
  const [joinEmailState, setJoinEmailState] = useRecoilState(JoinEmailState)
  const [joinImgPathState, setJoinImgPathState] = useRecoilState(JoinImgPathState)
  
  // 이미지 보내기
  const [selectImg, setSelectImg] = useState(0);

 const choiceImage = (v, i) => {
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
    console.log(data)
    signUp(data);
  }

  const { mutate: signUp } = useMutation(
    async (data) => {
      const response = await instance.post("/user/signup", data);
      console.log(response)
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        window.location.replace("/newlogin")
      },
			onError: (err) => {
				console.log(err)     
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
              choiceImage(v,i);
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
  margin-top:-60px;
  width: 360px;
  height: 565px;
`
const ProfileTitle = styled.div`
margin-bottom:42px;
h1, h2 {
  font-weight: 600;
  font-size: 24px;
  color:#303030;
}
h1 {
  margin-bottom:15px;
}
`;

const NicknameBox = styled.div`
p {
  font-weight: 500;
  font-size: 17px;
  margin-bottom:18px;
  color:#303030;
}
`;

const InputBox = styled.div`
margin-bottom:40px;
input {
  width: 264px;
  height: 44px;
  border: 1px solid #B7B7B7;
  border-radius: 10px;
  margin-right:8px;
  padding: 14px;
  font-weight: 500;
  font-size: 16px;
  color:#949494;
  &:focus {
		  outline: 1px solid #9152FF;
	  }
}
button {
  width: 88px;
  height: 44px;
  background: #9E67FF;
  border-radius: 10px;
  color:#fff;
  border:none;
  cursor: pointer;
}
`
const SelectProfileBox = styled.div`
p {
  font-weight: 500;
  font-size: 17px;
  color:#303030;
  margin-bottom:27px;
}
`
const ProfileImg = styled.img`
  margin-bottom:17px;
    width: 100px; 
  height: 100px;
  cursor: pointer;
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
`;

const ImageBox = styled.div`
display:grid;
grid-template-columns: 130px 130px 130px;
grid-template-rows: 120px 120px;
position:relative;
`
const CheckImgCircle = styled.div`
  width: 32px;
  height: 31.7px;
  background: #9152FF;
  border-radius:100%;
  position:relative;
  top:-120px;
  left:75px;
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

const CheckImg = styled.img`
  width:12.73px;
  height: 8.93px;
  position:relative;
  top:7.5px;
  left:10.34px;
  /* background-color:#000; */
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
  margin-top:24px;
  width: 360px;
  height: 44px;
  background: #9E67FF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 17px;
  border:none;
  color:#fff;
  cursor: pointer;
`
export default CreateProfile;