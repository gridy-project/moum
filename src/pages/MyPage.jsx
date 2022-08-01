// React, React-redux
import React from "react";
// css
import styled from "styled-components";
import tw from "twin.macro";
// component
import Header from "components/Common/Header";
import ProfileImage from "../components/MyPage/ProfileImage";
import ChangeNickname from "../components/MyPage/ChangeNickname";
import ChangeDesc from "../components/MyPage/ChangeDesc";
import ChangeEmail from "../components/MyPage/ChangeEmail";
import ChangePwd from "../components/MyPage/ChangePwd";
import DeleteAccount from "../components/MyPage/DeleteAccount";

function MyPage() {

	return (
		<CustomContainer>
			<Header selected={3}/>
			<Wrap>
				<TitleWrap>
					<Title>마이페이지</Title>
					<TitleDesc>나의 정보를 수정할 수 있습니다.</TitleDesc>
				</TitleWrap>
				<ContentBox>
					<Content>
							<ProfileImage/>
						<TextArea>
							<ChangeNickname/>
							<ChangeDesc/>
							<ChangeEmail/>
							<ChangePwd/>
							<DeleteAccount/>
						</TextArea>
					</Content>
				</ContentBox>
			</Wrap>
		</CustomContainer>
	);
}

const CustomContainer = styled.div`
	background-color: #FFFFFF !important;
	${tw`
    w-[100%] pt-[150px] min-h-screen flex
  `}
`;

const Wrap = styled.div`
	${tw`
    w-[1000px] m-[0 auto 100px auto]
  `}
`;

// Title
const TitleWrap = styled.div`
	${tw`
    w-[100%] mb-[50px]
  `}
`;
const Title = styled.p`
	font-size: 30px;
	line-height: 24px;
	color:#111111;
	${tw`
    font-medium p-[8px 0 19px 15px]
  `}
`;
const TitleDesc = styled.p`
	font-size: 20px;
	line-height: 24px;
	color:#949494;
	${tw`
    font-normal p-[0px 0px 3px 15px]
  `}
`;

// Content
const ContentBox = styled.div`
	background: #f6f5fb;
	${tw`
    w-[1000px] h-[610px] border-none rounded-[30px] relative p-[65px 105px 70px 104px]
  `}
`;
const Content = styled.div`
	${tw`
    w-[900px] h-[470px] flex
  `}
`;

// TextArea
const TextArea = styled.div`
	${tw`
    ml-[100px]
  `}
`;



export default MyPage;
