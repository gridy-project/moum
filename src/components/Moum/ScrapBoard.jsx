import useCustomQuery from "hooks/useCustomQuery";
import { useEffect } from "react";
import { instance } from "shared/axios";
import styled from "styled-components";
import MoumScrapCard from "./Card/MoumScrapCard";

function ScrapBoard () {
  const {isSuccess, data: moums} = useCustomQuery(
    "mine/scrap", 
    () => instance.get(`/shares/0/all`)
  );

  useEffect(() => {
    console.log(moums);
  }, [moums]);

  return (
    <Board>
      <List>
        {isSuccess && moums.data.map((moum) => 
          <MoumScrapCard key={moum.id} moum={moum} />
        )}
      </List>
    </Board>
  );
}

const Board = styled.div`
  padding-top: 40px;
`;

const List = styled.div`
  width: 100%;

  > div {
    width: calc(92% / 4);
    float: left;
  }

  > div + div {
    margin-left: calc(8% / 3);
  }

  > div:nth-of-type(4n + 1) {
    margin-left: 0;
  }

  > div:nth-of-type(n + 5) {
    margin-top: calc(8% / 3);
  }
`;

export default ScrapBoard;