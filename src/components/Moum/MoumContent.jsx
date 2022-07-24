import useCustomQuery from "hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { instance } from "shared/axios";
import { moumSearch } from "state/moum";
import styled, { css } from "styled-components";
import MoumSelectList from "./List/MoumSelectList";
import MoumBoard from "./MoumBoard";
import MoumCategoryGroup from "./MoumCategoryGroup";
import MoumContentProfile from "./MoumContentProfile";
import MoumOptionGroup from "./MoumOptionGroup";

function MoumContent ({categoriesQuery, moumsQuery, floatItemStatus, setFloatStatus, setFloatItemStatus}) {
  const {folderId: viewFolderId = 0} = useParams();
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useRecoilState(moumSearch);

  const {data: user, isSuccess: userQuerySuccess} = useCustomQuery("user", async () => {
    const response = await instance.get(`/user/myProfile`);
    return response.data;
  });

  return (
    <Content>
      <MoumHeader>
        {userQuerySuccess && <MoumContentProfile isSuccess={userQuerySuccess} user={user} />}
        {moumsQuery?.isSuccess && (viewFolderId !== 0 && <MoumSelectList />)}
        {categoriesQuery?.isSuccess && <MoumCategoryGroup categories={categoriesQuery.data.data} noFolder={viewFolderId === 0} /> }
        {viewFolderId === 0 && (
          <TabMenu>
            <Item isActive={true}><span>나의 모음</span></Item>
            <Item><span>스크랩 모음</span></Item>
          </TabMenu>
        )}
        <MoumOptionGroup
          search={search}
          setSearch={setSearch}
          isFolderView={viewFolderId === 0}
          setSelectAll={setSelectAll}
          setFloatStatus={setFloatStatus}
          setFloatItemStatus={setFloatItemStatus}
          floatItemStatus={floatItemStatus}
        />
      </MoumHeader>
      {moumsQuery.isSuccess && <MoumBoard folderId={viewFolderId} search={search} moums={moumsQuery?.data.data} selectAll={selectAll}/>}
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

const TabMenu = styled.div`
  margin-top: 40px;
  display: flex;
`;

const Item = styled.div`
  width: 120px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .3s, color .3s;

  ${props => !props.isActive && css`
    &:hover {
      background-color: #E8E1FC;
      span {
        color: #9152FF;
      }
    }
  `}

  span {
    display: inline-flex;
    height: 100%;
    align-items: center;
    font-size: 22px;
    color: #8B8B8B;


    ${props => props.isActive && css`
      border-bottom: 2px solid #303030;
      color: #303030;
    `}
  }
`;

export default MoumContent;