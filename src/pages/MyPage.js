import styled from "styled-components";
import Header from "../components/common/Header"
import { CameraFilled } from '@ant-design/icons'


function MyPage() {
  return (
    <div>
      <Header />
      <Wrap>
        <TitleWrap>
          <Title>마이페이지</Title>
          <TitleDesc>나의 정보를 수정할 수 있습니다.</TitleDesc>
        </TitleWrap>
        <ContentBox>
          <Content>
            <ImageArea>
              <Image></Image>
              <CameraBtn>
                <CameraFilled style={{
                  color: "#8B95A1",
                  width: "21.27px",
                  height: "19.95px"
                }} />
              </CameraBtn>
            </ImageArea>
            <TextArea>
              <NicknameArticle>
                <Nickname>닉네임</Nickname>
                <NicknameBtn>닉네임 변경하기</NicknameBtn>
              </NicknameArticle>
              <DescArticle>
                <Desc>설명</Desc>
                <DescInput
                  placeholder="나의 계정/모음/채널에 대해 설명해 주세요. 이 설명은 검색결과 및 계정 정보 안내 등에 표시됩니다."
                />
              </DescArticle>
              <EmailArticle>
                <EmailTitle>계정 이메일</EmailTitle>
                <Email>hanghae@gamil.com</Email>
              </EmailArticle>
              <PwdArticle>
                <PwdTitle>비밀번호</PwdTitle>
                <PwdArea>
                  <Pwd>**********</Pwd>
                  <PwdBtn>비밀번호 변경하기</PwdBtn>
                </PwdArea>
              </PwdArticle>
              <DeleteAccountArticle>
                <DeleteAccount>계정 탈퇴하기</DeleteAccount>
              </DeleteAccountArticle>
            </TextArea>
          </Content>
        </ContentBox>
      </Wrap>
    </div>
  )
}

const Wrap = styled.div`
width: 1222px;
margin: 0 auto 100px auto;
`;

// Title
const TitleWrap = styled.div`
width:100%;
margin-bottom:50px;
/* background-color:#999; */
`;
const Title = styled.p`
font-size:30px;
line-height:24px;
font-weight:500;

padding: 8px 0px 19px 15px;
`;
const TitleDesc = styled.p`
font-size:20px;
line-height:24px;
font-weight:400;

padding: 0px 0px 3px 15px;
`;

// Content
const ContentBox = styled.div`
border: 2px solid #D6D6D6;
border-radius:30px;
background: #E6E6E6;
position:relative;

`;
const Content = styled.div`
width: 993px;
margin: 40px auto;
display:flex;
justify-content:space-between;
box-sizing:border-box;
`;

// Image
const ImageArea = styled.div`
/* width: 264px; */
`;
const Image = styled.div`
background-color:#fff;
width:187px;
height:180px;
border-radius:100%;
position:absolute;
top:87px;
left:113px;
`;
const CameraBtn = styled.div`
width:53px;
height: 53px;
background-color:#d9d9d9;
border-radius:100%;
position:absolute;
top:214px;
left:247px;
padding: 17.8px 17px 17px 16.5px;
&:hover {
  cursor: pointer;
}
`;

// TextArea
const TextArea = styled.div`
width: 729px;
padding-left: 50px;
`;

// Nickname
const NicknameArticle = styled.div`
  display:flex;
  padding:43px 0 18px 20px;
`;

const Nickname = styled.p`
font-size:32px;
font-weight:500;
`;
const NicknameBtn = styled.button`
margin-left:16px;
padding:4px 14px 4px 15px;
color:#A5A5A5;
background-color: #F5F5F5;
border: 1px solid #A5A5A5;
border-radius: 50px;
font-size:14px;
line-height:24px;
box-sizing: border-box;
`;

// Desc
const DescArticle = styled.div`
 padding-left:18px;
`;

const Desc = styled.p`
font-size:22px;
margin-bottom:14px;
margin-top:35px;
`;

const DescInput = styled.input`
width: 605px;
height: 40px;
padding:9px 22px 7px 19px;
color:#969696;
background: #FFFFFF;
border-radius: 50px;
border:none;
`;

// Email
const EmailArticle = styled.div`
margin-top:43px;
padding-left:18px;
`
const EmailTitle = styled.p`
font-size:22px;
margin-bottom:9px;
`
const Email = styled.p`
font-size:20px;
color:#818181;
`

// Pwd
const PwdArticle = styled.div`
margin-top:32px;
padding-left:18px;
`;
const PwdTitle = styled.div`
font-size:22px;
`;

const PwdArea = styled.div`
  /* height: 40px; */
  line-height: 40px;
  display: flex;
  align-items: center;
`;
const Pwd = styled.div`
  font-size: 20px;
  color:#818181;
  vertical-align: middle;
  /* height: 40px; */
  display: flex;
  align-items: center;
  position: relative;
  top: 5px;
`;
const PwdBtn = styled.button`
  margin-left: 33px;
  border: none;
  height: 32px;
  color:#A5A5A5;
  background-color:#F5F5F5;
  border: 1px solid #A5A5A5;
  border-radius: 50px;
  padding: 4px 12px 4px 11px;
`;

// DeleteAccount
const DeleteAccountArticle = styled.div`
margin-top:29px;
padding-left:18px;
`;
const DeleteAccount = styled.p`
color:#8B8B8B;
font-size:14px;
text-decoration:underline;
`;
export default MyPage;