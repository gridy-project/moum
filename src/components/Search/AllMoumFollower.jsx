import styled, { css } from "styled-components";
import { instance } from "shared/axios";
import FollowerCard from "components/Card/FollowerCard";
import useCustomQuery from "hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { SvgMoveLeft, SvgMoveRight } from "assets/code/Search/SvgMove";

function AllMoumFollower () {
  const [viewFollows, setViewFollows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCnt, setPageCnt] = useState(0);

  const {data: follows, isSuccess} = useCustomQuery(["search/followUserList", page],
  () => instance.get(`/followinguser/${page}/4`));

  const pagePrev = () => {
    if (page !== 0) {
      setPage(current => current - 1);
    }
  }

  const pageNext = () => {
    if (page !== pageCnt - 1) {
      setPage(current => current + 1)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const {data: {
        followingCnt,
        followDtos
      }, result} = follows;

      if (result) {
        setViewFollows(followDtos);
        setPageCnt(Math.ceil(followingCnt/4));
      }
    }
  }, [follows, isSuccess]);

  return (
    pageCnt > 0 && (
      <Follower>
        <div className="content-header">
          <em>내가 팔로우한 계정<span>{follows?.data?.followingCnt}개</span></em>
          <div className="btn-follow">
            <Button isActive={page !== 0} onClick={pagePrev}><SvgMoveLeft /></Button>
            <Button isActive={page !== pageCnt - 1} onClick={pageNext}><SvgMoveRight /></Button>
          </div>
        </div>
        <List>
          {viewFollows.map((user) => {
            return <FollowerCard key={user.id} user={user} />;
          })}
        </List>
      </Follower>
    )
  )
}


const Follower = styled.div`
  margin-top: 100px;
  .content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    em {
      display: block;
      font-size: 30px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;

      span {
        font-size: 16px;
        margin-left: 16px;
        margin-top: 3px;
        color: #949494;
      }
    }
  }
`;

const Button = styled.button`
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 10px 1px #DFDFDF;
  transition: background-color .3s, box-shadow .3s;
  cursor: pointer;

  svg {
    path {
      transition: stroke .3s;
      stroke: ${props => props.isActive ? "#9152FF" : "#C8C8C8"}
    }
  }

  ${props => props.isActive && css`
    box-shadow: 0px 0px 10px 1px #D2BAFF;
  `}

  & + & {
    margin-left: 20px;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;

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
`;


export default AllMoumFollower;