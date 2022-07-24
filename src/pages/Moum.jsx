// module
import { React, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

// state
import { moumSearch, moumSort, pageMoumSelectedFolderId, selectedCategories } from "state/moum";

// hook
import useCustomQuery from "hooks/useCustomQuery";

// asset
import { getCategoryAxios } from "utils/api/category";
import { getMoumMineFetch } from "utils/fetch/moum";
import MoumSelectFloatingBox from "components/Moum/Popup/MoumSelectFloatingBox";
import MoumTitle from "components/Moum/MoumTitle";
import MoumContent from "components/Moum/MoumContent";
import { useLocation, useParams } from "react-router-dom";
import { atomScrollState } from "state/common/scroll";

function Moum () {
  // Hook
  const {folderId: viewFolderId = 0} = useParams();
  
  // Recoil
  const search = useRecoilValue(moumSearch);
  const sortState = useRecoilValue(moumSort);
  const categories = useRecoilValue(selectedCategories);
  const [scrollState, setScrollState] = useRecoilState(atomScrollState);

  // State
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  // Query
  const categoriesQuery = useCustomQuery(["mine/categories", viewFolderId], () => getCategoryAxios(viewFolderId));
  const moumsQuery = useCustomQuery(["mine/moums", categories, search, sortState], () => getMoumMineFetch(categories, search, sortState));

  // Ref
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ 
        // behavior: 'smooth', 
        block: 'end', 
        inline: 'nearest' }
      );
      setScrollState(false);
    }
  }, [scrollState, setScrollState]);

  return (
    <CustomContainer ref={scrollRef}>
      {
      moumsQuery.isSuccess && (
      <>
        <MoumTitle moums={moumsQuery?.data?.data} />
        <MoumContent
          moumsQuery={moumsQuery}
          categoriesQuery={categoriesQuery}
          floatItemStatus={floatItemStatus}
          setFloatStatus={setFloatStatus}
          setFloatItemStatus={setFloatItemStatus}
        />
        <MoumSelectFloatingBox 
          floatStatus={floatStatus} 
          floatItemStatus={floatItemStatus} 
        />
      </>
      )
      }
    </CustomContainer>
  )
}

const CustomContainer = styled.div`
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Moum;