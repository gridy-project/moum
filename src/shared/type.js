// selectActiveImage
import allSelectActive from "../public/img/moum-select-category-active/all.png";
import businessSelectActive from "../public/img/moum-select-category-active/business.png";
import cafeSelectActive from "../public/img/moum-select-category-active/cafe.png";
import designSelectActive from "../public/img/moum-select-category-active/design.png";
import economySelectActive from "../public/img/moum-select-category-active/economy.png";
import exhibitionSelectActive from "../public/img/moum-select-category-active/exhibition.png";
import fashionSelectActive from "../public/img/moum-select-category-active/fashion.png";
import favoriteSelectActive from "../public/img/moum-select-category-active/favorite.png";
import foodSelectActive from "../public/img/moum-select-category-active/food.png";
import healthSelectActive from "../public/img/moum-select-category-active/health.png";
import movieSelectActive from "../public/img/moum-select-category-active/movie.png";
import musicSelectActive from "../public/img/moum-select-category-active/music.png";
import otherSelectActive from "../public/img/moum-select-category-active/other.png";
import performanceSelectActive from "../public/img/moum-select-category-active/performance.png";
import shoppingSelectActive from "../public/img/moum-select-category-active/shopping.png";
import sportSelectActive from "../public/img/moum-select-category-active/sport.png";
import studySelectActive from "../public/img/moum-select-category-active/study.png";
import tripSelectActive from "../public/img/moum-select-category-active/trip.png";

// selectImage
import allSelect from "../public/img/moum-select-category/all.png";
import businessSelect from "../public/img/moum-select-category/business.png";
import cafeSelect from "../public/img/moum-select-category/cafe.png";
import designSelect from "../public/img/moum-select-category/design.png";
import economySelect from "../public/img/moum-select-category/economy.png";
import exhibitionSelect from "../public/img/moum-select-category/exhibition.png";
import fashionSelect from "../public/img/moum-select-category/fashion.png";
import favoriteSelect from "../public/img/moum-select-category/favorite.png";
import foodSelect from "../public/img/moum-select-category/food.png";
import healthSelect from "../public/img/moum-select-category/health.png";
import movieSelect from "../public/img/moum-select-category/movie.png";
import musicSelect from "../public/img/moum-select-category/music.png";
import otherSelect from "../public/img/moum-select-category/other.png";
import performanceSelect from "../public/img/moum-select-category/performance.png";
import shoppingSelect from "../public/img/moum-select-category/shopping.png";
import sportSelect from "../public/img/moum-select-category/sport.png";
import studySelect from "../public/img/moum-select-category/study.png";
import tripSelect from "../public/img/moum-select-category/trip.png";


// pieceCategoryImage
import businessPieceCategory from "../public/img/piece-card-category/business.png";
import cafePieceCategory from "../public/img/piece-card-category/cafe.png";
import designPieceCategory from "../public/img/piece-card-category/design.png";
import economyPieceCategory from "../public/img/piece-card-category/economy.png";
import exhibitionPieceCategory from "../public/img/piece-card-category/exhibition.png";
import fashionPieceCategory from "../public/img/piece-card-category/fashion.png";
import favoritePieceCategory from "../public/img/piece-card-category/favorite.png";
import foodPieceCategory from "../public/img/piece-card-category/food.png";
import healthPieceCategory from "../public/img/piece-card-category/health.png";
import moviePieceCategory from "../public/img/piece-card-category/movie.png";
import musicPieceCategory from "../public/img/piece-card-category/music.png";
import otherPieceCategory from "../public/img/piece-card-category/other.png";
import performancePieceCategory from "../public/img/piece-card-category/performance.png";
import shoppingPieceCategory from "../public/img/piece-card-category/shopping.png";
import sportPieceCategory from "../public/img/piece-card-category/sport.png";
import studyPieceCategory from "../public/img/piece-card-category/study.png";
import tripPieceCategory from "../public/img/piece-card-category/trip.png";

export const typeCategory = [
  {
    value: "전체",
    text: "전체"
  },
  {
    value: "디자인",
    text: "디자인"
  },
  {
    value: "음악",
    text: "음악"
  },
  {
    value: "음식",
    text: "음식"
  },
  {
    value: "건강",
    text: "건강"
  },
  {
    value: "영화",
    text: "영화"
  },
  {
    value: "스포츠",
    text: "스포츠"
  },
  {
    value: "취미",
    text: "취미"
  },
  {
    value: "여행",
    text: "여행"
  },
  {
    value: "공연",
    text: "공연"
  },
  {
    value: "공부",
    text: "공부"
  },
  {
    value: "비즈니스",
    text: "비즈니스"
  },
  {
    value: "패션",
    text: "패션"
  },
  {
    value: "경제",
    text: "경제"
  },
  {
    value: "기타",
    text: "기타"
  }
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
    case "식당":
      return {
        id: 4,
        category: "식당",
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