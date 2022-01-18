import axios from "axios";
import { baseUrl } from "../../constants/url";
import { SET_BOARDS, ADD_BOARD, DELETE_BOARD } from "./actionType";

function SetBoards(data) {
  return {
    type: SET_BOARDS,
    payload: data
  };
}

function AddBoard(data) {
  return {
    type: ADD_BOARD,
    payload: data
  };
}

function DeleteBoard(id) {
  return {
    type: DELETE_BOARD,
    payload: id
  };
}


export function getBoards() {
  const accessToken = localStorage.getItem("access-token");

  return (dispatch) =>{
    dispatch(SetBoards({
      isLoading: true,
      isError: false
    }));
    
    axios({
      method: "get",
      url: `${baseUrl}/boards`,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;

      dispatch(SetBoards({
        boards: data,
        isLoading: false,
        isError: false
      }));
    }).catch(err=>{
      dispatch(SetBoards({
        isLoading: false,
        isError: true
      }));
      console.log(err.response);
    });
  };
}

export function addBoard(data) {
  const accessToken = localStorage.getItem("access-token");
  return (dispatch)=>{
    axios({
      method: "post",
      url: `${baseUrl}/boards`,
      data,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;
      dispatch(AddBoard({
        board: data
      }));
    }).catch(err=>{
      console.log(err.response);
    });
  };
}

export function deleteBoard(id) {
  const accessToken = localStorage.getItem("access-token");
  return (dispatch)=>{
    axios({
      method: "delete",
      url: `${baseUrl}/boards/${id}`,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;

      dispatch(DeleteBoard({
        id: data.id
      }));
    }).catch(err=>{
      console.log(err.response);
    });;
  };
}