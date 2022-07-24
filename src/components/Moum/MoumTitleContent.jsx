import styled from "styled-components";

function MoumTitleContent () {
  return (
    <Box>
      <em>간편한 정보 아카이빙, moum</em>
      <p>링크, 글, 이미지 조각을 모아두고 쉽게 찾을 수 있어요.</p>
    </Box>
  )
}

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  em {
    font-size: 36px;
    color: #FFFFFF;
    font-weight: 600;
  }

  p {
    padding-top: 20px;
    font-size: 20px;
    color: #FFFFFF;
    font-weight: 400;
  }
`;

export default MoumTitleContent;