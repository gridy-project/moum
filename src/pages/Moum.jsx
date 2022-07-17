// module
import { React, useState } from "react";
import styled, { css } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQueryClient } from "react-query";

// components
import Header from "components/Common/Header";
import MoumSelectList from "components/Moum/List/MoumSelectList";
import MoumOptionGroup from "components/Moum/MoumOptionGroup";
import MoumTitleContent from "components/Moum/MoumTitleContent";
import MoumTitleCreateForm from "components/Moum/MoumTitleCreateForm";
import MoumHeaderCommon from "components/Moum/MoumHeaderCommon";

// state
import { moumSort, pageMoumSelectedFolderId, selectedCategories } from "state/moum";

// hook
import useCustomQuery from "hooks/useCustomQuery";

// asset
import { getCategoryAxios } from "utils/api/category";
import { getMoumFetch } from "utils/fetch/moum";
import MoumBoard from "components/Moum/MoumBoard";
import MoumSelectFloatingBox from "components/Moum/Popup/MoumSelectFloatingBox";

function Moum() {
  const [selectedFolderId, setSelectedFolderId] = useRecoilState(pageMoumSelectedFolderId);
  const categories = useRecoilValue(selectedCategories);
  const sortState = useRecoilValue(moumSort);

  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  const onSelectAll = (status) => {
    setSelectAll(status);
  }

  const categoriesQuery = useCustomQuery(["mine/categories", selectedFolderId], async () => await getCategoryAxios(selectedFolderId));
  const moumsQuery = useCustomQuery(["mine/moums", categories, search, sortState], async () => await getMoumFetch(categories, search, sortState));

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
          {moumsQuery.isSuccess && (selectedFolderId !== 0 && <MoumSelectList moums={moumsQuery.data} />)}
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
        {moumsQuery.isSuccess && <MoumBoard folderId={selectedFolderId} search={search} moums={moumsQuery.data} selectAll={selectAll}/>}
      </Content>
      <MoumSelectFloatingBox floatStatus={floatStatus} floatItemStatus={floatItemStatus} />
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

const MoumHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Moum;