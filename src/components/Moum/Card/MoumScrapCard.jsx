// module
import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "react-query";

// image
import { instance } from "shared/axios";
import queryClient from "shared/query";

import deleteSvg from "assets/common/OptionMenu/delete.svg";
import MoumCard from "components/Card/MoumCard";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import useMessageFloat from "hooks/useMessageFloat";

function MoumScrapCard ({moum}) {
  const toast = useMessageFloat();
  const navigate = useNavigate();
  const {folderId: viewFolderId = 0} = useParams();
  
  const runFolder = () => {
    navigate(`/scrap/${moum.userId}/${moum.id}`);
  }

  const [buttonState, setButtonState] = useState(false);

  const {mutateAsync: cancel} = useMutation((folderId) => instance.delete(`/share/delete/${folderId}`), 
    {
      onSuccess: data => queryClient.invalidateQueries("mine/scrap")
    }
  );

  const cancelScrap = async (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setButtonState(false);
    const {result} = await cancel(moum.id);
    if (result) {
      toast("스크랩이 취소되었습니다");
    } else {
      Swal.fire({
        icon: "error",
        title: "스크랩 취소 실패"
      });
    }
  }

  const options = [
    {
      name: "스크랩 취소",
      image: deleteSvg,
      onClick: cancelScrap
    }
  ];

  return (
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

export default MoumScrapCard;