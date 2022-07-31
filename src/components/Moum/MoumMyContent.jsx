import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atomMoumSearch } from "state/moum";
import styled from "styled-components";
import tw from "twin.macro";
import MoumSelectList from "./List/MoumSelectList";
import MoumBoard from "./MoumBoard";
import MoumCategoryGroup from "./MoumCategoryGroup";
import MoumOptionGroup from "./MoumOptionGroup";

function MoumMyContent ({
  categoriesQuery,
  floatItemStatus,
  setFloatStatus,
  setFloatItemStatus,
  isScrap
}) {
  const {folderId: viewFolderId = 0} = useParams();
  const [search, setSearch] = useRecoilState(atomMoumSearch);

  return (
    <Content>
      <MoumHeader>
        {viewFolderId !== 0 && <MoumSelectList />}
        {categoriesQuery?.isSuccess && <MoumCategoryGroup categories={categoriesQuery.data.data} noFolder={viewFolderId === 0} /> }
        <MoumOptionGroup
          search={search}
          setSearch={setSearch}
          isFolderView={viewFolderId === 0}
          setFloatStatus={setFloatStatus}
          setFloatItemStatus={setFloatItemStatus}
          floatItemStatus={floatItemStatus}
        />
      </MoumHeader>
      <MoumBoard 
        folderId={viewFolderId} 
        search={search} 
      />
    </Content>
  );
}

const Content = styled.div`
  ${tw`w-[1200px] pb-[70px]`};
`;

const MoumHeader = styled.div`
  ${tw`flex flex-col w-full`};
`;

export default MoumMyContent;