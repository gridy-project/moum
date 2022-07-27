import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PopupButtonGroup from "./PopupButtonGroup";
import checkIcon from "assets/images/pages/moum/popup/check.png";
import noImage from "assets/images/pages/moum/popup/no-image.png";
import pcIcon from "assets/images/pages/moum/popup/pc_icon.png"
import addImage from "assets/images/pages/moum/popup/add-image.png"
import { apiCommon } from "utils/api/common";
import useCustomMutate from "hooks/useCustomMutate";

import Swal from "sweetalert2";

function getCategoryImage (name) {
  switch (name) {
    case "건강":
      return "https://i.ibb.co/8s42mKX/image.jpg";
    case "경제":
      return "https://i.ibb.co/4pf40M4/image.jpg";
    case "공부":
      return "https://i.ibb.co/chhxXDr/image.jpg";
    case "기타":
      return "https://i.ibb.co/YbyMgyF/image.jpg";
    case "스포츠":
      return "https://i.ibb.co/zPdgngZ/image.jpg";
    case "영화":
      return "https://i.ibb.co/Y2GpqX1/image.jpg";
    case "디자인":
      return "https://i.ibb.co/FntgHR9/image.jpg";
    case "음악":
      return "https://i.ibb.co/56S9Jwd/image.jpg";
    case "쇼핑":
      return "https://i.ibb.co/XydFqx1/image.jpg";
    case "전시":
      return "https://i.ibb.co/WFQKLfS/image.jpg";
    case "공연":
      return "https://i.ibb.co/phn5rTT/image.jpg";
    case "여행":
      return "https://i.ibb.co/Kz7yYSr/image.jpg";
    case "취미":
      return "https://i.ibb.co/stB9S5X/image.jpg";
    case "비즈니스":
      return "https://i.ibb.co/WD28hfy/image.jpg";
    case "카페":
      return "https://i.ibb.co/BqVZ0vR/image.jpg";
    case "식당":
      return "https://i.ibb.co/tHfnkNN/image.jpg";
    default:
      return "https://i.ibb.co/51YGqmc/image.jpg";
  }
}

function PopupImageChange ({finish, close, getter, setter}) {
  const [imageType, setImageType] = useState(getter.select);
  const [customImageState, setCustomImageState] = useState(false);
  const ref = {
    file: useRef(null),
    image: useRef(null)
  }

  const {mutateAsync: upload} = useCustomMutate((data) => apiCommon.uploadImage(data));

  const popupFinish = async () => {
    if (imageType === 0) {
      finish(imageType);
    } else if (imageType === 1) {
      finish(imageType, getCategoryImage(getter.category))
      return;
    } else if (imageType === 2) {
      console.log(ref.file.current.files);
      if (ref.file.current.files.length > 0) {
        const formData = new FormData();
        formData.append("image", ref.file.current.files[0]);
        const {result, data} = await upload(formData);
        if (result) {
          finish(imageType, data);
        } else {
          Swal.fire({
            icon: "error",
            title: "파일 업로드 실패"
          });
        }
      } else {
        console.log(getter.imageItems)
        if (getter.imageItems.upload) {
          finish(imageType, getter.imageItems.upload);
        } else {
          alert("이미지를 등록해주세요");
        }
      }
    }
  }

  useEffect(() => {
    if (getter?.imageItems?.upload && ref.image) {
      // console.log(ref.image);
      ref.image.current.src = getter.imageItems.upload;
    }
  }, [getter.imageItems.upload, ref.image]);

  const changeFile = (fileEvent) => {
    if (fileEvent.target.files && fileEvent.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
          ref.image.current.src = e.target.result;
      }
      reader.readAsDataURL(fileEvent.target.files[0]);
      setCustomImageState(true);
    }
  }

  return (
    <Box>
      <form>
        <SelectBox>
          <Item onClick={() => {setImageType(0)}} isActive={imageType === 0}>
            <Name>불러온 이미지</Name> 
            {
              getter.imageItems ?
              <Image>
                <img src={getter.imageItems.og} alt="og" />
              </Image>
              :
              <NoImage>

              </NoImage>
            }
          </Item>
          <Item onClick={() => {setImageType(1)}} isActive={imageType === 1}>
            <Name>추천 이미지</Name>
            <Image>
              <img src={getCategoryImage(getter.category)} alt="" />
            </Image>
            {/* <NoImage></NoImage> */}
          </Item>
          <Item onClick={() => {setImageType(2)}} isActive={imageType === 2}>
            <Name>내 PC에서 불러오기</Name>
            {
              customImageState || getter.imageItems.upload ? 
              <Image>
                <img alt="uploaded" ref={ref.image} />
                <Label htmlFor="image">
                  <img src={addImage} alt="파일 선택" />
                  파일 선택
                </Label>
              </Image>
              :
              <NoImage isUpload>
                <Label htmlFor="image">
                  <img src={addImage} alt="파일 선택" />
                  파일 선택
                </Label>
              </NoImage>
            }
            <input id="image" type="file" onChange={changeFile} ref={ref.file} hidden/>
          </Item>
        </SelectBox>
        <Share isShared={getter.share}>
          조각 공개 설정
          <div className="switch" onClick={() => setter(current => ({...current, share: !current.share}))}>
            <div className="switch-ball"></div>
          </div>
        </Share>
        <PopupButtonGroup close={close} finish={popupFinish} />
      </form>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 130px);
  flex-direction: column;
  padding: 24px;
  form {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

const SelectBox = styled.ul`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const Item = styled.li`
  width: 185px;
  height: 190px;
  border: 2px solid #B7B7B7;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  position: relative;
  transition: border .3s, color .3s;
  cursor: pointer;
  &::before {
    content: '';
    right: 0;
    top: 0;
    transform: translate(30%, -30%);
    position: absolute;
    display: block;
    opacity: 0;
    width: 32px;
    height: 32px;
    background-color: #9152FF;
    background-image: url(${checkIcon});
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    border: 1px solid #FFFFFF;
    transition: opacity .3s;
  }

  ${props => props.isActive && css`
    border: 2px solid #9152FF;
    > div {
      color: #721EFC;
    }
    &::before {
      opacity: 1;
    }
  `}
`;

const Name = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555555;
  transition: color .3s;
`;

const Image = styled.div`
  width: 100%;
  height: 96px;
  background-color: #E6E6E6;
  border-radius: 11px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 96px;
  background-color: #E6E6E6;
  border-radius: 11px;
  background-image: url(${props => props.isUpload ? pcIcon : noImage});
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  position: relative;
  z-index: 1;
  padding: 0 12px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  color: #555555;
  border-radius: 17px;
  cursor: pointer;
  opacity: 0;
  transition: opacity .3s;
  
  img {
    width: auto;
    height: auto;
    margin-right: 6px;
    position: static;
  }

  &:hover {
    opacity: 1;
  }
`;

const Share = styled.div`
  margin-top: 50px;
  color: #303030;
  display: flex;
  align-items: center;

  .switch {
    margin-left: 12px;
    width: 52px;
    height: 26px;
    background-color: #E0E0E0;
    border-radius: 13px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: background-color .3s;

    .switch-ball {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #FFFFFF;
      position: absolute;
      left: calc(3px);
      transition: left .3s;
    }

    ${props => props.isShared && css`
      background-color: #9E67FF;
      .switch-ball {
        left: calc(100% - 23px);
      }
    `}
  }
`;

export default PopupImageChange;