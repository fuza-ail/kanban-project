import { 
  SET_BOARDS,
  ADD_BOARD,
  // EDIT_BOARD,
  // DELETE_BOARD
} from "../action/actionType";

const initialState = {
  boards: [],
  isLoading: false,
  isError: false,
};

export default function boardReducer(state=initialState, action) {
  switch (action.type) {
      case SET_BOARDS:
        return {
          ...state,
          boards: action.payload.boards,
          isLoading: action.payload.isLoading,
          isError: action.payload.isError,
        };
      case ADD_BOARD:
        console.log("ss", action.payload.board);
        console.log(state.boards);
        return {
          ...state,
          boards: state.boards.concat(action.payload.board)
        };
      default:
        return {
          ...state,
        };
  }
};