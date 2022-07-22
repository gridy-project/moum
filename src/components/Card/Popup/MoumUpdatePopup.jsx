import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { instance } from "shared/axios";
import { globalPopup, popupState } from "state/common/popup";

function MoumUpdatePopup ({moum}) {
  const queryClient = useQueryClient();
  const setGlobalPopup = useSetRecoilState(globalPopup);
  const resetGlobalPopup = useResetRecoilState(globalPopup);

  const onClose = (e) => {
    resetGlobalPopup();
  }

  const ref = {
    name: useRef(null),
    share: useRef(null)
  }

  const {mutate: modify} = useMutation(async ({id, data}) => {
    const response = await instance.put(`/folder/${id}`, data);
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/moums");
    },
    onError: err => {
      console.log(err);
    }
  });

  useEffect(() => {
    ref.name.current.value = moum.name;
    ref.share.current.value = moum.status;
  }, []);

  const onModify = (e) => {
    modify({id: moum.id, data: {
      name: ref.name.current.value,
      status: ref.share.current.value
    }});
    resetGlobalPopup();
  }

  return (
    <div>
      <button onClick={onClose}>팝업 닫기</button>
      <form onSubmit={onModify}>
        <input type="text" placeholder="폴더 이름" ref={ref.name} />
        <select ref={ref.share}>
          <option value="NONE">공유 설정</option>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        <button>수정하기</button>
      </form>
    </div>
  )
}

export default MoumUpdatePopup;