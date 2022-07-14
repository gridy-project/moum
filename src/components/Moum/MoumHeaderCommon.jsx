import { instance } from "../../api/axios";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import MoumCategoryGroup from "./MoumCategoryGroup";
import MoumContentProfile from "./MoumContentProfile";

function MoumHeaderCommon ({categories}) {
  const {data: user, isLoading} = useGetReactQuery("user", async () => {
    const response = await instance.get(`/user/myProfile`);
    return response.data;
  });

  return (
    isLoading ? <div>loading...</div> : (
      <>
        <MoumContentProfile isLoading={isLoading} user={user} />
        <MoumCategoryGroup categories={categories} />
      </>
    )
  )
}

export default MoumHeaderCommon;