// selectActiveImage
import allSelectActive from "assets/images/category/select/category-active/all.png";
import businessSelectActive from "assets/images/category/select/category-active/business.png";
import cafeSelectActive from "assets/images/category/select/category-active/cafe.png";
import designSelectActive from "assets/images/category/select/category-active/design.png";
import economySelectActive from "assets/images/category/select/category-active/economy.png";
import exhibitionSelectActive from "assets/images/category/select/category-active/exhibition.png";
import fashionSelectActive from "assets/images/category/select/category-active/fashion.png";
import favoriteSelectActive from "assets/images/category/select/category-active/favorite.png";
import foodSelectActive from "assets/images/category/select/category-active/food.png";
import healthSelectActive from "assets/images/category/select/category-active/health.png";
import movieSelectActive from "assets/images/category/select/category-active/movie.png";
import musicSelectActive from "assets/images/category/select/category-active/music.png";
import otherSelectActive from "assets/images/category/select/category-active/other.png";
import performanceSelectActive from "assets/images/category/select/category-active/performance.png";
import shoppingSelectActive from "assets/images/category/select/category-active/shopping.png";
import sportSelectActive from "assets/images/category/select/category-active/sport.png";
import studySelectActive from "assets/images/category/select/category-active/study.png";
import tripSelectActive from "assets/images/category/select/category-active/trip.png";

// selectImage
import allSelect from "assets/images/category/select/category/all.png";
import businessSelect from "assets/images/category/select/category/business.png";
import cafeSelect from "assets/images/category/select/category/cafe.png";
import designSelect from "assets/images/category/select/category/design.png";
import economySelect from "assets/images/category/select/category/economy.png";
import exhibitionSelect from "assets/images/category/select/category/exhibition.png";
import fashionSelect from "assets/images/category/select/category/fashion.png";
import favoriteSelect from "assets/images/category/select/category/favorite.png";
import foodSelect from "assets/images/category/select/category/food.png";
import healthSelect from "assets/images/category/select/category/health.png";
import movieSelect from "assets/images/category/select/category/movie.png";
import musicSelect from "assets/images/category/select/category/music.png";
import otherSelect from "assets/images/category/select/category/other.png";
import performanceSelect from "assets/images/category/select/category/performance.png";
import shoppingSelect from "assets/images/category/select/category/shopping.png";
import sportSelect from "assets/images/category/select/category/sport.png";
import studySelect from "assets/images/category/select/category/study.png";
import tripSelect from "assets/images/category/select/category/trip.png";


// pieceCategoryImage
import businessPieceCategory from "assets/images/category/piece/business.png";
import cafePieceCategory from "assets/images/category/piece/cafe.png";
import designPieceCategory from "assets/images/category/piece/design.png";
import economyPieceCategory from "assets/images/category/piece/economy.png";
import exhibitionPieceCategory from "assets/images/category/piece/exhibition.png";
import fashionPieceCategory from "assets/images/category/piece/fashion.png";
import favoritePieceCategory from "assets/images/category/piece/favorite.png";
import foodPieceCategory from "assets/images/category/piece/food.png";
import healthPieceCategory from "assets/images/category/piece/health.png";
import moviePieceCategory from "assets/images/category/piece/movie.png";
import musicPieceCategory from "assets/images/category/piece/music.png";
import otherPieceCategory from "assets/images/category/piece/other.png";
import performancePieceCategory from "assets/images/category/piece/performance.png";
import shoppingPieceCategory from "assets/images/category/piece/shopping.png";
import sportPieceCategory from "assets/images/category/piece/sport.png";
import studyPieceCategory from "assets/images/category/piece/study.png";
import tripPieceCategory from "assets/images/category/piece/trip.png";

export const typeCategory = [
  "카테고리",
  "디자인",
  "쇼핑",
  "건강",
  "음식",
  "카페",
  "영화",
  "비즈니스",
  "패션",
  "경제",
  "음악",
  "취미",
  "스포츠",
  "여행",
  "공연",
  "전시",
  "공부"
]

export const getSelectMoumCategory = (name) => {
  switch (name) {
    case "카테고리 전체":
      return {
        id: 0,
        category: "카테고리 전체",
        image: allSelect,
        imageActive: allSelectActive
      }
    case "디자인":
      return {
        id: 1,
        category: "디자인",
        image: designSelect,
        imageActive: designSelectActive
      }
    case "쇼핑":
      return {
        id: 2,
        category: "쇼핑",
        image: shoppingSelect,
        imageActive: shoppingSelectActive
      }
    case "건강":
      return {
        id: 3,
        category: "건강",
        image: healthSelect,
        imageActive: healthSelectActive
      }
    case "음식":
      return {
        id: 4,
        category: "음식",
        image: foodSelect,
        imageActive: foodSelectActive
      }
    case "카페":
      return {
        id: 5,
        category: "카페",
        image: cafeSelect,
        imageActive: cafeSelectActive
      }
    case "영화":
      return {
        id: 6,
        category: "영화",
        image: movieSelect,
        imageActive: movieSelectActive
      }
    case "비즈니스":
      return {
        id: 7,
        category: "비즈니스",
        image: businessSelect,
        imageActive: businessSelectActive
      }
    case "패션":
      return {
        id: 8,
        category: "패션",
        image: fashionSelect,
        imageActive: fashionSelectActive
      }
    case "경제":
      return {
        id: 9,
        category: "경제",
        image: economySelect,
        imageActive: economySelectActive
      }
    case "음악":
      return {
        id: 10,
        category: "음악",
        image: musicSelect,
        imageActive: musicSelectActive
      }
    case "취미":
      return {
        id: 11,
        category: "취미",
        image: favoriteSelect,
        imageActive: favoriteSelectActive
      }
    case "스포츠":
      return {
        id: 12,
        category: "스포츠",
        image: sportSelect,
        imageActive: sportSelectActive
      }
    case "여행":
      return {
        id: 13,
        category: "여행",
        image: tripSelect,
        imageActive: tripSelectActive
      }
    case "공연":
      return {
        id: 14,
        category: "공연",
        image: performanceSelect,
        imageActive: performanceSelectActive
      }
    case "전시":
      return {
        id: 15,
        category: "전시",
        image: exhibitionSelect,
        imageActive: exhibitionSelectActive
      }
    case "공부":
      return {
        id: 16,
        category: "공부",
        image: studySelect,
        imageActive: studySelectActive
      }
    default:
      return {
        id: 17,
        category: "기타",
        image: otherSelect,
        imageActive: otherSelectActive
      }
  }
}

export const getPieceCategory = (name) => {
  switch (name) {
    case "디자인":
      return {
        id: 1,
        category: "디자인",
        image: designPieceCategory,
      }
    case "쇼핑":
      return {
        id: 2,
        category: "쇼핑",
        image: shoppingPieceCategory,
      }
    case "건강":
      return {
        id: 3,
        category: "건강",
        image: healthPieceCategory,
      }
    case "식당":
      return {
        id: 4,
        category: "식당",
        image: foodPieceCategory,
      }
    case "카페":
      return {
        id: 5,
        category: "카페",
        image: cafePieceCategory,
      }
    case "영화":
      return {
        id: 6,
        category: "영화",
        image: moviePieceCategory,
      }
    case "비즈니스":
      return {
        id: 7,
        category: "비즈니스",
        image: businessPieceCategory,
      }
    case "패션":
      return {
        id: 8,
        category: "패션",
        image: fashionPieceCategory,
      }
    case "경제":
      return {
        id: 9,
        category: "경제",
        image: economyPieceCategory,
      }
    case "음악":
      return {
        id: 10,
        category: "음악",
        image: musicPieceCategory,
      }
    case "취미":
      return {
        id: 11,
        category: "취미",
        image: favoritePieceCategory,
      }
    case "스포츠":
      return {
        id: 12,
        category: "스포츠",
        image: sportPieceCategory,
      }
    case "여행":
      return {
        id: 13,
        category: "여행",
        image: tripPieceCategory,
      }
    case "공연":
      return {
        id: 14,
        category: "공연",
        image: performancePieceCategory,
      }
    case "전시":
      return {
        id: 15,
        category: "전시",
        image: exhibitionPieceCategory,
      }
    case "공부":
      return {
        id: 16,
        category: "공부",
        image: studyPieceCategory,
      }
    default:
      return {
        id: 17,
        category: "기타",
        image: otherPieceCategory,
      }
  }
}