import { useState } from "react";
import { useRecoilState } from "recoil";
import { moumSearch, pageMoumSelectedFolderId } from "state/moum";
import styled from "styled-components";
import MoumSelectList from "./List/MoumSelectList";
import MoumBoard from "./MoumBoard";
import MoumHeaderCommon from "./MoumHeaderCommon";
import MoumOptionGroup from "./MoumOptionGroup";

function MoumContent ({categoriesQuery, moumsQuery, floatItemStatus, setFloatStatus, setFloatItemStatus}) {
  const [selectedFolderId] = useRecoilState(pageMoumSelectedFolderId);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useRecoilState(moumSearch);

  return (
    <Content>
      <MoumHeader>
        {categoriesQuery.isSuccess && <MoumHeaderCommon categories={categoriesQuery.data} />}
        {moumsQuery?.isSuccess && (selectedFolderId !== 0 && <MoumSelectList moums={moumsQuery?.data?.data} />)}
        <MoumOptionGroup
          search={search}
          setSearch={setSearch}
          isFolderView={selectedFolderId === 0}
          setSelectAll={setSelectAll}
          setFloatStatus={setFloatStatus}
          setFloatItemStatus={setFloatItemStatus}
          floatItemStatus={floatItemStatus}
        />
      </MoumHeader>
      {moumsQuery.isSuccess && <MoumBoard folderId={selectedFolderId} search={search} moums={moumsQuery?.data.data} selectAll={selectAll}/>}
    </Content>
  );
}

const Content = styled.div`
  width: 1200px;
  padding-bottom: 70px;
`;

const MoumHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default MoumContent;