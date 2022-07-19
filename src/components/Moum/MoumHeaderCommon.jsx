import useCustomQuery from "hooks/useCustomQuery";
import { instance } from "shared/axios";
import MoumCategoryGroup from "./MoumCategoryGroup";
import MoumContentProfile from "./MoumContentProfile";

function MoumHeaderCommon ({categories}) {
  const {data: user, isSuccess} = useCustomQuery("user", async () => {
    const response = await instance.get(`/user/myProfile`);
    return response.data;
  });

  return (
    isSuccess && (
      <>
        <MoumContentProfile isSuccess={isSuccess} user={user} />
        <MoumCategoryGroup categories={categories.data} />
      </>
    )
  )
}

export default MoumHeaderCommon;