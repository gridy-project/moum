import MoumCard from "components/Card/MoumCard";
import { useState } from "react";
import styled from "styled-components";

import reportSvg from "assets/common/OptionMenu/report.svg";
import scrapSvg from "assets/common/OptionMenu/scrap.svg";
import useCustomMutate from "hooks/useCustomMutate";
import { instance } from "shared/axios";
import { useNavigate, useParams } from "react-router-dom";

import Swal from 'sweetalert2';

function SearchMoumCard ({moum, useAuthor}) {
  const navigate = useNavigate();
  const params = useParams();

  const [state, setState] = useState(false);

  const {mutateAsync: scrap} = useCustomMutate((folderId) => instance.post(`/share/folder/${folderId}`, {}));
  const {mutateAsync: report} = useCustomMutate((folderId) => instance.post(`/reportfolder/${folderId}`, {}));

  const moumClick = () => {
    if (moum.userId) {
      navigate(`/user/${moum.userId}/${moum.id}`);
    } else {
      navigate(`/user/${params.userId}/${moum.id}`);
    }
  }

  const options = [
    {
      name: "모음 스크랩하기",
      image: scrapSvg,
      onClick: async () => {
        const {result} = await scrap(moum.id);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "스크랩 성공"
          });
        }
        setState(false);
      }
    },
    {
      name: "신고하기",
      image: reportSvg,
      onClick: async () => {
        const {result} = await report(moum.id);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "신고 성공"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "신고 실패"
          });
        }
        setState(false);
      }
    }
  ]
  return (
    <Container>
      <MoumCard 
        moum={moum}
        optionState={state}
        setOptionState={setState}
        options={options}
        onClick={moumClick}
        useAuthor={useAuthor}
      />
    </Container>
  )
}

const Container = styled.div``;

export default SearchMoumCard;