// React, React-redux
import React from "react";
// css
import styled from "styled-components";
// component
import Header from "components/Common/Header";
import Container from "components/Common/Container";
import ProfileImage from "../components/MyPage/ProfileImage";
import ChangeNickname from "../components/MyPage/ChangeNickname";
import ChangeDesc from "../components/MyPage/ChangeDesc";
import ChangeEmail from "../components/MyPage/ChangeEmail";
import ChangePwd from "../components/MyPage/ChangePwd";
import DeleteAccount from "../components/MyPage/DeleteAccount";

function MyPage() {

	return (
		<Container>
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
		</Container>
	);
}

const Wrap = styled.div`
	width: 1000px;
	margin: 0 auto 100px auto;
`;

// Title
const TitleWrap = styled.div`
	width: 100%;
	margin-bottom: 50px;
`;
const Title = styled.p`
	font-size: 30px;
	line-height: 24px;
	font-weight: 500;
	padding: 8px 0px 19px 15px;
`;
const TitleDesc = styled.p`
	font-size: 20px;
	line-height: 24px;
	font-weight: 400;
	padding: 0px 0px 3px 15px;
`;

// Content
const ContentBox = styled.div`
	width: 1000px;
	height: 610px;
	border: none;
	border-radius: 30px;
	background: #f6f5fb;
	position: relative;
	padding: 65px 105px 70px 104px;
`;
const Content = styled.div`
	width: 900px;
	height: 470px;
	display: flex;
`;

// TextArea
const TextArea = styled.div`
	margin-left: 100px;
`;



export default MyPage;
