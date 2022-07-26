// module
import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

// state
import { atomMoumSearch, atomMoumSort, atomSelectedCategories } from "state/moum";

// hook
import useCustomQuery from "hooks/useCustomQuery";

// asset
import { getCategoryAxios } from "utils/api/category";
import { getMoumMineFetch } from "utils/fetch/moum";
import MoumSelectFloatingBox from "components/Moum/Popup/MoumSelectFloatingBox";
import { useParams } from "react-router-dom";
import { atomScrollState } from "state/common/scroll";
import MoumHeader from "components/Moum/MoumHeader";
import { instance } from "shared/axios";
import MoumContentProfile from "components/Moum/MoumContentProfile";
import MoumContentTabMenu from "components/Moum/MoumContentTabMenu";
import MoumMyContent from "components/Moum/MoumMyContent";
import MoumScrapContent from "components/Moum/MoumScrapContent";

function Moum ({isScrap}) {
  // Hook
  const {folderId: viewFolderId = 0} = useParams();
  
  // Recoil
  const [scrollState, setScrollState] = useRecoilState(atomScrollState);

  // State
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  // Query
  const categoriesQuery = useCustomQuery(["mine/categories", viewFolderId], () => getCategoryAxios(viewFolderId));
  const {data: user, isSuccess: userQuerySuccess} = useCustomQuery("user", async () => {
    const response = await instance.get(`/user/myProfile`);
    return response.data;
  });

  // Ref
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollState) {
      // scrollRef.current.scrollIntoView({ 
      //   // behavior: 'smooth', 
      //   block: 'end', 
      //   inline: 'nearest' }
      // );
      setScrollState(false);
    }
  }, [scrollState, setScrollState]);

  return (
    <CustomContainer ref={scrollRef}>
      <MoumHeader />
      <MoumContent>
        {userQuerySuccess && <MoumContentProfile isSuccess={userQuerySuccess} user={user} />}
        <MoumContentTabMenu />
        {
          isScrap ?
          <MoumScrapContent />
          :
          <MoumMyContent
            categoriesQuery={categoriesQuery}
            floatItemStatus={floatItemStatus}
            setFloatStatus={setFloatStatus}
            setFloatItemStatus={setFloatItemStatus}
            isScrap={isScrap}
          />
        }
      </MoumContent>
      <MoumSelectFloatingBox 
        floatStatus={floatStatus} 
        floatItemStatus={floatItemStatus} 
      />
    </CustomContainer>
  )
}

const CustomContainer = styled.div`
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoumContent = styled.div`
  width: 1200px;
  padding-bottom: 70px;
`;

export default Moum;