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
import { moumSearch, moumSort, pageMoumSelectedFolderId, selectedCategories } from "state/moum";

// hook
import useCustomQuery from "hooks/useCustomQuery";

// asset
import { getCategoryAxios } from "utils/api/category";
import { getMoumFetch } from "utils/fetch/moum";
import MoumBoard from "components/Moum/MoumBoard";
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

  const categoriesQuery = useCustomQuery(["mine/categories", selectedFolderId], async () => await getCategoryAxios(selectedFolderId));
  const moumsQuery = useCustomQuery(["mine/moums", categories, search, sortState], async () => await getMoumFetch(categories, search, sortState));

  return (
    <CustomContainer>
      {moumsQuery.isSuccess && <MoumTitle moums={moumsQuery.data} isSuccess={moumsQuery.isSuccess} />}
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