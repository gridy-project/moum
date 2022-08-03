import styled from "styled-components";
import MoumAddCard from "components/Moum/Card/MoumAddCard";
import SortableList from 'react-easy-sort'
import arrayMove from 'array-move';
import { useEffect, useState } from "react";
import MoumFolderCard from "components/Moum/Card/MoumFolderCard";
import { useRecoilValue } from "recoil";
import { atomMoumSearch, atomMoumSort, atomSelectedCategories } from "state/moum";
import { changeMoumOrder } from "utils/api/moum";
import useCustomMutate from "hooks/useCustomMutate";
import { useInView } from "react-intersection-observer";
import { useGetMoumMineInfinite, useOrderMoum } from "hooks/query/useQueryMoum";
import { useQueryClient } from "react-query";
import useMessageFloat from "hooks/useMessageFloat";

function MoumList () {
  const queryClient = useQueryClient();
  const toast = useMessageFloat();
  const [moums, setMoums] = useState([]);
  const sortState = useRecoilValue(atomMoumSort);
  const search = useRecoilValue(atomMoumSearch);
  const categories = useRecoilValue(atomSelectedCategories);
  const {ref, inView} = useInView();

  const { data, fetchNextPage } = useGetMoumMineInfinite({categories, search, sortState});

  const {mutateAsync: order} = useOrderMoum();

  const onSortEnd = async (oldIndex, newIndex) => {
    const oldId = moums[oldIndex].id;
    setMoums((array) => arrayMove(array, oldIndex, newIndex));
    const {result} = await order({folderId: oldId, afterOrder: moums[newIndex].folderOrder});
    if (result) {
      queryClient.invalidateQueries("mine/moums");
      toast("모음 순서가 변경 되었습니다");
    }
  }

  useEffect(() => {
    if (data) {
      setMoums((current) => {
        let arr = [];
        for (let i = 0; i < data.pages.length; i++) {
          arr = [...arr, ...data.pages[i].moums];
        }

        return arr;
      })
    }
  }, [data]);


  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <List>
      {sortState === "최신 조각순" && (
        <div className="list">
          <MoumAddCard />
          {moums?.map((item, i) => (
            <MoumFolderCard key={item.id} moum={item} />
          ))}
        </div>
      )}
      {sortState === "사용자 지정순" && (
        <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
          <MoumAddCard />
          {moums?.map((item, i) => (
            <MoumFolderCard key={item.id} moum={item} sortable />
          ))}
        </SortableList>
      )}
      <div className="ref" ref={ref}></div>
    </List>
  )
}

const List = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .list {
    width: 100%;
  }

  .list > div {
    width: calc(92% / 4);
    float: left;
  }

  .list > div + div {
    margin-left: calc(8% / 3);
  }

  .list > div:nth-of-type(4n + 1) {
    margin-left: 0;
  }

  .list > div:nth-of-type(n + 5) {
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

  > div.ref {
    width: 100%;
    height: 0px;
  }
`;

export default MoumList;