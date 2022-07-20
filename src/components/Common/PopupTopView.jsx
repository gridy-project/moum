import styled from "styled-components";

function PopupTopView ({image, title}) {
  return (
    <View>
      {image &&
        <Circle>
          <img src={image} alt="title" />
        </Circle>
      }
      <Title>{title}</Title>      
    </View>
  )
}

const View = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  padding: 14px;
  border-radius: 50%;
  background-color: #E8E1FC;
`;

const Title = styled.div`
  color: #303030;
  font-size: 20px;
  font-weight: 600;

  ${Circle} + & {
    margin-left: 12px;
  }
`;

export default PopupTopView;