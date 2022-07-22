// module
import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

// state
import { moumSearch, moumSort, pageMoumSelectedFolderId, selectedCategories } from "state/moum";

// hook
import useCustomQuery from "hooks/useCustomQuery";

// asset
import { getCategoryAxios } from "utils/api/category";
import { getMoumFetch } from "utils/fetch/moum";
import MoumSelectFloatingBox from "components/Moum/Popup/MoumSelectFloatingBox";
import MoumTitle from "components/Moum/MoumTitle";
import MoumContent from "components/Moum/MoumContent";

function Moum () {
  const selectedFolderId = useRecoilValue(pageMoumSelectedFolderId);
  const categories = useRecoilValue(selectedCategories);
  const sortState = useRecoilValue(moumSort);
  const search = useRecoilValue(moumSearch);
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  const categoriesQuery = useCustomQuery(["mine/categories", selectedFolderId], () => getCategoryAxios(selectedFolderId));
  const moumsQuery = useCustomQuery(["mine/moums", categories, search, sortState], () => getMoumFetch(categories, search, sortState));

  useEffect(() => {
    console.log(moumsQuery);
  }, []);

  return (
    <CustomContainer>
      {moumsQuery.isSuccess && <MoumTitle moums={moumsQuery?.data?.data} />}
      <MoumContent
        categoriesQuery={categoriesQuery}
        moumsQuery={moumsQuery}
        floatItemStatus={floatItemStatus}
        setFloatStatus={setFloatStatus}
        setFloatItemStatus={setFloatItemStatus}
      />
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

export default Moum;