// module
import { React, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

// asset
import MoumSelectFloatingBox from "components/Moum/Popup/MoumSelectFloatingBox";
import { useParams } from "react-router-dom";
import { atomScrollState } from "state/common/scroll";
import MoumHeader from "components/Moum/MoumHeader";
import MoumContentProfile from "components/Moum/MoumContentProfile";
import MoumContentTabMenu from "components/Moum/MoumContentTabMenu";
import MoumMyContent from "components/Moum/MoumMyContent";
import MoumScrapContent from "components/Moum/MoumScrapContent";
import { useGetUserProfileMine } from "hooks/query/useQueryUser";
import useGetCategoriesMine from "hooks/query/useQueryCategory";

function Moum ({isScrap}) {
  // Hook
  const {folderId: viewFolderId = 0} = useParams();
  
  // Recoil
  const [scrollState, setScrollState] = useRecoilState(atomScrollState);

  // State
  const [floatStatus, setFloatStatus] = useState(false);
  const [floatItemStatus, setFloatItemStatus] = useState(false);

  // Query
  const categoriesQuery = useGetCategoriesMine({folderId: viewFolderId});
  const {data: user, isSuccess: userQuerySuccess} = useGetUserProfileMine();

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
    <div className="flex flex-col items-center" ref={scrollRef}>
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