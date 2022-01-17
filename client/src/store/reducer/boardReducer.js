import { 
  SET_BOARDS,
  ADD_BOARD,
  DELETE_BOARD,
  EDIT_BOARD,
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
        return {
          ...state,
          boards: state.boards.concat(action.payload.board)
        };
      case DELETE_BOARD:
        return {
          ...state,
          boards: state.boards.filter(board=> board.board_id !== action.payload.id)
        };
      default:
        return {
          ...state,
        };
  }
};