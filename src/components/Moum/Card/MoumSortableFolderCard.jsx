// module
import styled, { css } from "styled-components";
import { useState } from "react";
import { useMutation } from "react-query";

// image
import more from "assets/images/pages/moum/menu-white.png";
import moum from "assets/images/pages/moum/moum-background.png";
import iconPrivate from "assets/images/pages/moum/icon-private.png";
import iconPieceCount from "assets/images/pages/moum/icon-piece-count.png";
import iconScrapCount from "assets/images/pages/moum/icon-scrap-count.png";
import { instance } from "../../../api/axios";
import queryClient from "../../../shared/query";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { pageMoumSelectedFolderId } from "../../../state/moum";
import { globalPopup, popupState } from "../../../state/popup";
import { useRef } from "react";
import { useEffect } from "react";
import { SortableItem } from 'react-easy-sort'

function MoumModifyPopup ({moum}) {
  const setPopupState = useSetRecoilState(popupState);
  const resetGlobalPopup = useResetRecoilState(globalPopup);

  const onClose = (e) => {
    setPopupState(false);
    resetGlobalPopup();
  }

  const ref = {
    name: useRef(null),
    share: useRef(null)
  }

  const {mutate: modify} = useMutation(async ({id, data}) => {
    const response = await instance.put(`/folder/${id}`, data);
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/moums");
    },
    onError: err => {
      console.log(err);
    }
  });

  useEffect(() => {
    console.log(moum);
    ref.name.current.value = moum.name;
    ref.share.current.value = moum.status;
  }, []);

  const onModify = (e) => {
    modify({id: moum.id, data: {
      name: ref.name.current.value,
      status: ref.share.current.value
    }});
    setPopupState(false);
    resetGlobalPopup();
  }

  return (
    <Box>
      <ModifyForm onSubmit={onModify}>
        <label htmlFor="name">폴더명</label>
        <input type="text" id="name" placeholder="폴더 이름" ref={ref.name} />
        <label htmlFor="share" className="label-share">공유 설정</label>
        <select ref={ref.share} id="share">
          <option value="NONE">공유 설정</option>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        <button>수정하기</button>
      </ModifyForm>
      <button onClick={onClose}>팝업 닫기</button>
    </Box>
  )
}


const Box = styled.div`
  width: 500px;
  height: 500px;
  background-color: #FFFFFF;
  font-size: 24px;
  padding: 40px;
  label {
    display: block;
    margin-bottom: 10px;
  }

  .label-share {
    margin-top: 20px;
  }

  input {
    font-size: 20px;
  }

  select, option {
    font-size: 20px;
  }
`;

const ModifyForm = styled.form`
  button {
    display: block;
    width: 100px;
    height: 50px;
    margin: 20px 0;
    border: none;
    background-color: #29af61;
    color: #FFFFFF;
  }
`;

function MoumSortableFolderCard({moum}) {
  const setPopupState = useSetRecoilState(popupState);
  const setGlobalPopup = useSetRecoilState(globalPopup);
  const setSelectedFolderId = useSetRecoilState(pageMoumSelectedFolderId);
  const [buttonState, setButtonState] = useState(false);
  
  const runFolder = (e) => {
    setSelectedFolderId(moum.id);
  }

  const {mutate: remove} = useMutation(async (data) => {
    console.log(data);
    const response = await instance.delete(`/folders`, {data});
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("moum");
      alert("폴더 생성 성공");
    },
    onError: err => {
      console.log(err);
    }
  });

  const removeFolder = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setButtonState(false);
    remove([{ id: moum.id }]);
  }

  const modifyFolder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setButtonState(false);
    setPopupState(true);
    setGlobalPopup(<MoumModifyPopup moum={moum} />);
  }

  function comma(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  return (
    <SortableItem>
      <Container onClick={runFolder}>
        <div className="card-content">
          <div className="card-header">
            {moum.status === "PRIVATE" && <img src={iconPrivate} alt="private" />}
            <div className="menu" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setButtonState((current) => !current);
            }}><img src={more} alt="" /></div>
          </div>
          <div className={`card-title ${moum.status === "PUBLIC" && `no-image`}`}>{moum.name}</div>
        </div>
        <div className="card-info">
          <div className="piece-count">
            <Icon><img src={iconPieceCount} alt="전체 조각 개수" /></Icon>
            <Text>전체 조각</Text>
            <Count>{comma(moum.boardCnt)}개</Count>
          </div>
          <div className="scrap-count">
            <Icon><img src={iconScrapCount} alt="스크랩 횟수" /></Icon>
            <Text>스크랩</Text>
            <Count>{comma(moum.sharedCount)}회</Count>
          </div>
        </div>
        <CardOption isActive={buttonState}>
          <div onClick={modifyFolder}>수정하기</div>
          <div onClick={removeFolder}>삭제하기</div>
        </CardOption>
      </Container>
    </SortableItem>
  );
}

const Container = styled.div`
  width: 282px;
  height: 314px;
  background-image: url(${moum});
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;

  .menu {
    position: absolute;
    right: 25px;
    top: 50px;
  }

  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    flex-shrink: 0;

    > img {
      margin-top: 10px;
    }

    .category {
      width: 70px;
      height: 25px;
      font-size: 12px;
      background-color: #D9D9D9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12.ㄴ5px;
    }
  }



  .card-title {
    padding: 20px 20px 0;
    font-size: 20px;
    line-height: 1.2;
    color: #FFFFFF;
  }

  .card-title.no-image {
    padding: 62px 20px 0;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #FFFFFF;
  }

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #ABABAB;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-info {
    color: #FFFFFF;
    position: absolute;
    bottom: 25px;
    left: 25px;

    .piece-count, .scrap-count {
      display: flex;
    }

    .scrap-count {
      margin-top: 10px;
    }
  }
`;

const Icon = styled.div`
  width: 20px;
`;
const Text = styled.div`
  width: 60px;
  font-size: 14px;
  margin-left: 5px;
`;
const Count = styled.div`
  font-size: 14px;
  margin-left: 10px;
  letter-spacing: 1px;
`;

const CardOption = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  right: -50px;
  top: 80px;
  border: 1px solid #ddd;
  z-index: 1;
  display: none;

  ${props => props.isActive && css`
    display: block;
  `};

  div {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  div:hover {
    background-color: #ddd;
  }

  div + div {
    border-top: 1px solid #ddd;
  }
`;

export default MoumSortableFolderCard;