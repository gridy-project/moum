// React-redux
import React, { useRef } from "react";
// React Query
import {  useMutation, useQuery, useQueryClient } from "react-query";
// axios
import { instance } from "shared/axios"
// css
import tw from "twin.macro";
import pen from "assets/images/pages/mypage/pen.png";
import styled from 'styled-components';
import Swal from "sweetalert2";

const ProfileImage = () => {
	const queryClient = useQueryClient();

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
	${tw`relative `}
`;
const Image = styled.div`
  background-color:#c9aaff;
	${tw`
    relative w-[187px] h-[180px] rounded-[100%] 
  `}
`
const FileBox = styled.div`
	input {
		border: 0;
		${tw`
    absolute w-[0] h-[0] p-[0] overflow-hidden border-[0]
  	`}
	}
`;
const FileLabel = styled.label`
	background-color: #9152ff;
	&:hover {
		cursor: pointer;
	}
	${tw`
		absolute w-[53px] h-[53px] p-[17px 17px] top-[127px] right-[0] rounded-[100%]
	`}
`;
const FileImagePhoto = styled.img`
	z-index: 1;
	color: #999;
	${tw`
		absolute w-[21px] h-[21px]
	`}
`;
const FileImageBtn = styled.div``;

export default ProfileImage;