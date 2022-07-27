// module
import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "react-query";

// image
import { instance } from "shared/axios";
import queryClient from "shared/query";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import folderSvg from "assets/common/OptionMenu/folder.svg";
import deleteSvg from "assets/common/OptionMenu/delete.svg";
import publicSvg from "assets/common/OptionMenu/public.svg";
import privateSvg from "assets/common/OptionMenu/private.svg";
import MoumUpdatePopup from "components/Card/Popup/MoumUpdatePopup";
import MoumCard from "components/Card/MoumCard";
import { SortableItem } from "react-easy-sort";
import { globalPopup } from "state/common/popup";
import { useNavigate, useParams } from "react-router-dom";

function MoumFolderCard ({moum, sortable}) {
  const navigate = useNavigate();
  const {folderId: viewFolderId = 0} = useParams();
  
  const runFolder = () => {
    navigate(`/moum/${moum.id}`);
  }

  const [buttonState, setButtonState] = useState(false);
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const {mutate: remove} = useMutation((data) => instance.delete(`/folders`, {data}), 
    {
      onSuccess: data => queryClient.invalidateQueries("mine/moums")
    }
  );

  const removeFolder = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setButtonState(false);
    remove([{ id: moum.id }]);
  }

  const modifyFolder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setButtonState(false);
    setPopup({
      state: true,
      component: <MoumUpdatePopup moum={moum} close={resetPopup} />
    });
  }

  const {mutate: sharedChange} = useMutation(async ({id, status}) => {
    const response = await instance.put(`/folder/${id}`, {
      name: moum.name,
      status: status
    });
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/moums");
    },
    onError: err => {
      console.log(err);
    }
  });

  const changeShareStateFolder = (e) => {
    if (moum.status === "PUBLIC") {
      sharedChange({id: moum.id, status: "PRIVATE"});
    } else {
      sharedChange({id: moum.id, status: "PUBLIC"});
    }
  }

  const options = [
    {
      name: "이름 변경",
      image: folderSvg,
      onClick: modifyFolder
    }, 
    {
      name: "삭제",
      image: deleteSvg,
      onClick: removeFolder
    },
    {
      name: moum.status === "PRIVATE" ? "공개로 전환" : "비공개로 전환",
      image: moum.status === "PRIVATE" ? publicSvg : privateSvg,
      onClick: changeShareStateFolder
    }
  ];

  return (
    sortable ? 
    <SortableItem>
      <Container>
        <MoumCard 
          moum={moum}
          optionState={buttonState}
          setOptionState={setButtonState}
          options={options}
          onClick={runFolder}
        />
      </Container>
    </SortableItem>
    :
    <Container>
      <MoumCard 
        moum={moum}
        optionState={buttonState}
        setOptionState={setButtonState}
        options={options}
        onClick={runFolder}
      />
    </Container>
  );
}

const Container = styled.div``;

export default MoumFolderCard;