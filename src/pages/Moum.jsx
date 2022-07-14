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
import { useRecoilValue } from "recoil";
import { pageMoumSelectedFolderId } from "../atoms/moum";
import MoumList from "../components/Moum/MoumList";
import { useState } from "react";
import MoumHeaderCommon from "../components/Moum/MoumHeaderCommon";
import iconMove from "../components/Moum/images/move_icon.png";
import iconDelete from "../components/Moum/images/delete_icon.png";
import useGetReactQuery from "../hooks/useGetReactQuery";
import { axiosGetMoumMineAll, axiosGetMoumMineByOptions } from "../api/moum";

function Moum() {
  const selectedFolderId = useRecoilValue(pageMoumSelectedFolderId);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const onSelectAll = (status) => {
    setSelectAll(status);
  }

  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  const moumsQuery = useGetReactQuery(["moums", search], async () => {
    if (search === "") {
      const response = await axiosGetMoumMineAll();
      return response.data;
    } else {
      const response = await axiosGetMoumMineByOptions({ keyword: search });
      return response.data;
    }
  });

  return (
    <CustomContainer>
      <Title>
        <Header selected={1} />
        <MoumTitleContent />
        <MoumTitleCreateForm />
      </Title>
      <Content>
        <MoumHeader>
          {moumsQuery.isSuccess && <MoumHeaderCommon categories={moumsQuery.data.categoryList} />}
          {moumsQuery.isSuccess && (selectedFolderId !== 0 && <MoumSelect moums={moumsQuery.data.folderList} />)}
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
              />
            )
          }
        </PieceBoard>
      </Content>
      <FloatingBox
        isActive={floatStatus}
      >
        <FloatItem isActive={floatItemStatus}>
          <img src={iconMove} alt="move" />
        </FloatItem>
        <FloatItem isActive={floatItemStatus}>
          <img src={iconDelete} alt="remove" />
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
  `}
`;

export default Moum;