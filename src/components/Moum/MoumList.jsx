import styled from "styled-components";
import { instance } from "../../api/axios";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import MoumCard from "../card/MoumCard";
import MoumAddCard from "./MoumAddCard";

function MoumList () {
  const {data: moumList, isLoading} = useGetReactQuery("moum", async () => {
    const response = await instance.post("/folders/0/all");
    return response.data;
  });

  return (
    <List>
      {isLoading ? "isLoading...." :
        <>
          <MoumAddCard />
          {moumList.map((moum) => {
            return <MoumCard key={moum.id} moum={moum} />
          })}
        </>
      }
    </List>
  )
}

const List = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > div {
    width: calc(92% / 4);
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

  .no-piece {
    width: 100%;
    height: 500px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #999999;
    border-radius: 10px;
  }
`;

export default MoumList;