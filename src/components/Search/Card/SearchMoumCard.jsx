import MoumCard from "components/Card/MoumCard";
import { useState } from "react";
import styled from "styled-components";

import reportSvg from "assets/common/OptionMenu/report.svg";
import scrapSvg from "assets/common/OptionMenu/scrap.svg";
import useCustomMutate from "hooks/useCustomMutate";
import { instance } from "shared/axios";

function SearchMoumCard ({moum}) {
  const [state, setState] = useState(false);

  const {mutateAsync: scrap} = useCustomMutate((folderId) => instance.post(`/share/folder/${folderId}`, {}));
  const {mutateAsync: report} = useCustomMutate((folderId) => instance.post(`/report/${folderId}`, {}));

  const options = [
    {
      name: "모음 스크랩하기",
      image: scrapSvg,
      onClick: async () => {
        const {result} = await scrap(moum.id);
        if (result) {
          alert("스크랩 성공");
        } else {
          alert("스크랩 실패");
        }
      }
    },
    {
      name: "신고하기",
      image: reportSvg,
      onClick: async () => {
        const {result, data} = await report(moum.id);
        if (result) {
          alert("신고 성공");
          console.log(data);
        } else {
          alert("신고 실패");
          console.log(data);
        }
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
        useAuthor
      />
    </Container>
  )
}

const Container = styled.div``;

export default SearchMoumCard;