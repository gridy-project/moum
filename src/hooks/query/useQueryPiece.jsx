import { useMutation } from "react-query";
import { apiPiece } from "utils/api/piece";

export function useAddPiece (option) {
  return useMutation(apiPiece.addPiece, option);
}

export function useModifyPiece () {

}

export function useRemovePiece () {

}