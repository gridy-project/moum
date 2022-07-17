// module
import { React } from "react";
import styled, { css } from "styled-components";

// components
import Header from "../components/common/Header";

// redux
import MoumSelect from "../components/Moum/MoumSelect";
import MoumOptionGroup from "../components/Moum/MoumOptionGroup";
import PieceList from "../components/Moum/PieceList";
import MoumTitleContent from "../components/Moum/MoumTitleContent";
import MoumTitleCreateForm from "../components/Moum/MoumTitleCreateForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { moumSort, pageMoumSelectedFolderId, selectedCategories } from "../state/moum";
import MoumList from "../components/Moum/MoumList";
import { useState } from "react";
import MoumHeaderCommon from "../components/Moum/MoumHeaderCommon";
import useGetReactQuery from "../hooks/useGetReactQuery";
import { selectedItems } from "state/mode";
import { useMutation, useQueryClient } from "react-query";
import { instance } from "api/axios";

import { axiosGetCategories, axiosGetCategoriesInFolder, axiosGetMoumMineAll, axiosGetMoumMineByOptions } from "../api/moum";
import iconMove from "assets/images/pages/moum/move_icon.png";
import iconDelete from "assets/images/pages/moum/delete_icon.png";

function Moum() {
  const queryClient = useQueryClient();
  const [selectedFolderId, setSelectedFolderId] = useRecoilState(pageMoumSelectedFolderId);
  const selectedItemList = useRecoilValue(selectedItems);
  const categories = useRecoilValue(selectedCategories);
  const sortState = useRecoilValue(moumSort);

  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  const onSelectAll = (status) => {
    setSelectAll(status);
  }

  const categoriesQuery = useGetReactQuery(["mine/categories", selectedFolderId], async () => {
    if (selectedFolderId === 0) {
      const response = await axiosGetCategories();
      return response.data;
    } else {
      const response = await axiosGetCategoriesInFolder(selectedFolderId);
      return response.data;
    }
  });

  const moumsQuery = useGetReactQuery(["mine/moums", categories, search, sortState], async () => {
    if (search === "" && (categories[0]?.category === "전체" || categories.length === 0) && sortState === "최신 조각순") {
      const response = await axiosGetMoumMineAll();
      return response.data;
    } else if (search === "") {
      const response = await axiosGetMoumMineByOptions(
        { keyword: "all", categories, sort: sortState === "사용자 지정순" ? true : false }
      );
      return response.data;
    } else {
      const response = await axiosGetMoumMineByOptions(
        { keyword: search, categories, sort: sortState === "사용자 지정순" ? true : false }
      );
      return response.data;
    }
  });

  const {mutate: remove} = useMutation(async ({folderId, data}) => {
    const response = await instance.delete(`/boards/${folderId}`, {data});
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/pieces");
      alert("삭제 성공");
    },
    onError: err => {
      console.log(err);
    }
  });

  const removeFolders = (e) => {
    if (selectedItemList.length === 0) {
      alert("조각을 선택해주세요");
    } else {
      remove({folderId: selectedFolderId, data: selectedItemList.map((v) => ({id: v}))});
    }
  }

  return (
    <CustomContainer>
      <Title>
        <Header selected={1} />
        <MoumTitleContent />
        {moumsQuery.isSuccess && <MoumTitleCreateForm moums={moumsQuery.data} />}
      </Title>
      <Content>
        <MoumHeader>
          {categoriesQuery.isSuccess && <MoumHeaderCommon categories={categoriesQuery.data} />}
          {moumsQuery.isSuccess && (selectedFolderId !== 0 && <MoumSelect moums={moumsQuery.data} />)}
          {selectedFolderId !== 0 && <button onClick={() => {setSelectedFolderId(0)}}>폴더 선택으로 이동</button>}
          <MoumOptionGroup
            search={search}
            setSearch={setSearch}
            isFolderView={selectedFolderId === 0}
            onSelectAll={onSelectAll}
            setFloatStatus={setFloatStatus}
            setFloatItemStatus={setFloatItemStatus}
            floatItemStatus={floatItemStatus}
          />
        </MoumHeader>
        <PieceBoard>
          {moumsQuery.isSuccess && 
            (
              selectedFolderId === 0 ? 
              <MoumList
                moums={moumsQuery.data}
              />
              :
              <PieceList
                selectAll={selectAll}
                search={search}
              />
            )
          }
        </PieceBoard>
      </Content>
      <FloatingBox
        isActive={floatStatus}
      >
        <FloatItem isActive={floatItemStatus} onClick={() => {alert("폴더 이동 미구현")}}>
          <img src={iconMove} alt="move" />
        </FloatItem>
        <FloatItem isActive={floatItemStatus}>
          <img src={iconDelete} alt="remove" onClick={removeFolders}/>
        </FloatItem>
      </FloatingBox>
    </CustomContainer>
  )
}

const CustomContainer = styled.div`
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  padding-top: 200px;
  width: 100%;
  height: 500px;
  background-color: #E5D6FF;
  border-radius: 0 0 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Content = styled.div`
  width: 1200px;
  padding-bottom: 70px;
`;

const PieceBoard = styled.div`
  margin-top: 0px;
`;

const MoumHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FloatingBox = styled.div`
  position: fixed;
  bottom: -100px;
  display: flex;
  gap: 16px;
  transition: bottom .3s;
  ${props => props.isActive && css`
    bottom: 50px;
  `}
`;

const FloatItem = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E0D6FF;
  box-shadow: 0px 0px 20px 1px #E8E1FC;
  transition: background-color .3s, box-shadow .3s;
  ${props => props.isActive && css`
    background-color: #9E67FF;
    box-shadow: 0px 0px 20px 1px #D2BAFF;
    cursor: pointer;
  `}
`;

export default Moum;