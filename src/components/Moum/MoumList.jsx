import styled from "styled-components";
import MoumAddCard from "./MoumAddCard";
import SortableList from 'react-easy-sort'
import arrayMove from 'array-move';
import { useEffect, useState } from "react";
import MoumSortableFolderCard from "./Card/MoumSortableFolderCard";

function MoumList ({moums}) {
  const [sortableMoumList, setSortableMoumList] = useState([]);

  const onSortEnd = (oldIndex, newIndex) => {
    setSortableMoumList((array) => arrayMove(array, oldIndex, newIndex))
  }

  useEffect(() => {
    if (moums) {
      setSortableMoumList([...moums?.folderList]);
    }
  }, [moums]);

  return (
    <List>
      <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
        <MoumAddCard />
        {sortableMoumList?.map((item, i) => (
          <MoumSortableFolderCard key={item.id} moum={item} />
        ))}
      </SortableList>
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
`;

export default MoumList;