// module
import { React, useEffect, useState } from "react";

// asset
import MoumSelectFloatingBox from "components/Moum/Popup/MoumSelectFloatingBox";
import { useParams } from "react-router-dom";
import MoumHeader from "components/Moum/MoumHeader";
import MoumContentProfile from "components/Moum/MoumContentProfile";
import MoumContentTabMenu from "components/Moum/MoumContentTabMenu";
import MoumMyContent from "components/Moum/MoumMyContent";
import MoumScrapContent from "components/Moum/MoumScrapContent";
import { useGetUserProfileMine } from "hooks/query/useQueryUser";
import useGetCategoriesMine from "hooks/query/useQueryCategory";

import { useCookies } from "react-cookie";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { globalPopup } from "state/common/popup";
import TutorialPopup from "components/Common/Popup/TutorialPopup";

function Moum ({isScrap}) {
  // Hook
  const {folderId: viewFolderId = 0} = useParams();

  // State
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  // Query
  const categoriesQuery = useGetCategoriesMine({folderId: viewFolderId});
  const {data: user, isSuccess: userQuerySuccess} = useGetUserProfileMine();

  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const cookies = useCookies()[0];

  useEffect(() => {
    if (!cookies.tutorial) {
      setPopup({
        state: true,
        component: <TutorialPopup close={resetPopup} />
      })
      console.log("쿠키 없음");
    }
  }, [cookies]);

  return (
    <div className="flex flex-col items-center">
      <MoumHeader />
      <div className="w-[1200px] pb-[70px]">
        {userQuerySuccess && <MoumContentProfile isSuccess={userQuerySuccess} user={user?.data} />}
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
      </div>
      <MoumSelectFloatingBox 
        floatStatus={floatStatus} 
        floatItemStatus={floatItemStatus} 
      />
    </div>
  )
}

export default Moum;