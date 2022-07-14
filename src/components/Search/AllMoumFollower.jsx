import styled from "styled-components";
import { instance } from "../../api/axios";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import FollowerCard from "../card/FollowerCard";

function AllMoumFollower () {
  const {data: followUserList, isLoading: followUserListLoading} = useGetReactQuery("search/followUserList", async () => {
    const response = await instance.get("/followinguser/0/4");
    return response.data;
  });

  return (
    <Follower>
      <div className="content-header">
        <em>내가 팔로우한 계정</em>
        <div className="btn-follow">
          <button>left</button>
          <button>right</button>
        </div>
      </div>
      <FollowerList>
        {
          followUserListLoading ? <div>isLoading</div> : 
          followUserList?.content?.map((moum) => {
            return <FollowerCard />
          })
        }
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
        <FollowerCard />
      </FollowerList>
    </Follower>
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
    }
  }
`;

const FollowerList = styled.div`
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