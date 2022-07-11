import styled from 'styled-components';
import {Scrollbars} from "react-custom-scrollbars-2";

function PieceScrollVertical (props) {
  return <CustomScrollbar
    // autoHide
    hideTracksWhenNotNeeded
    renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
    renderTrackVertical={props => <div {...props} className="track-vertical"/>}
    renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
    renderView={props => <div {...props} className="view"/>}>
    {props.children}
  </CustomScrollbar>
}

const CustomScrollbar = styled(Scrollbars)`
  .title {
    color: #111111;
    line-height: 24px;
  }

  .content {
    margin-top: 20px;
    color: #777777;
    line-height: 24px;
  }

  .view {
    padding: 20px;
    box-sizing: border-box;
  }

  .thumb-vertical {
    width: 8px;
    background-color: #B7B7B7;
    border-radius: 4px;
  }

  .track-vertical {
    top: 5%;
    width: 8px !important;
    height: 90%;
    background-color: #ECECEC;
    right: 0;
    border-radius: 4px;
  }
`;


export default PieceScrollVertical;