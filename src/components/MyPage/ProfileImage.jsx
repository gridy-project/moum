// React-redux
import React, { useRef } from "react";
// React Query
import {  useMutation, useQuery } from "react-query";
import queryClient from "shared/query";
// axios
import { instance } from "shared/axios"
// css
import pen from "assets/images/pages/mypage/pen.png";
import styled from 'styled-components';
import Swal from "sweetalert2";

const ProfileImage = () => {

	// 계정 조회
	const { data } = useQuery(
    "profile",
    async () => {
      const response = await instance.get("/user/profile");
      return response.data;
    },
    {
      onSuccess: (data) => {
			},
      onError: (err) => {
      }
    }
  );

  // 프로필 이미지 1장 업로드
  const imageRef = useRef(null);

	const uploadImage = (e) => {
		const formData = new FormData();

		formData.append("profilePhoto", imageRef.current.files[0]);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		modifyImage({formData, config});
	};

	const { mutate: modifyImage } = useMutation(
    async ({formData, config}) => {
      await instance.post("/user/profilePhoto", formData, config);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("profile");
      },
			onError: (err) => {
				console.log(err)
				 Swal.fire({
          icon: "error",
          title: err.data.message
        })
			}
    }
  )
  
  return (
   <ImageArea>
							<ImageBox>
								<label htmlFor="file" onChange={uploadImage}>
									<Image>
										<div>
											{data?.imgPath && (
												<img
													src={data?.imgPath}
													alt="previewImg"
													style={{
														width: "187px",
														height: "180px",
														borderRadius: "100%",
													}}
												/>
											)}
										</div>
									</Image>
									<FileBox>
										<FileLabel htmlFor="file">
											<FileImagePhoto src={pen} alt="펜 사진" />
											<FileImageBtn>
												<input type="file" id="file" ref={imageRef} />
											</FileImageBtn>
										</FileLabel>
									</FileBox>
								</label>
							</ImageBox>
						</ImageArea>
  );
};

const ImageArea = styled.div``;
const ImageBox = styled.div`
	position: relative;
`;
const Image = styled.div`
  background-color:#c9aaff;
  width:187px;
  height:180px;
  border-radius:100%;
  position:relative;
`
const FileBox = styled.div`
	input {
		position: absolute;
		width: 0;
		height: 0;
		padding: 0;
		overflow: hidden;
		border: 0;
	}
`;
const FileLabel = styled.label`
	width: 53px;
	height: 53px;
	background-color: #9152ff;
	border-radius: 100%;
	position: absolute;
	top: 127px;
	right: 0px;
	padding: 17px 17px;
	&:hover {
		cursor: pointer;
	}
`;
const FileImagePhoto = styled.img`
	width: 21px;
	height: 21px;
	position: absolute;
	z-index: 1;
	color: #999;
`;
const FileImageBtn = styled.div``;

export default ProfileImage;