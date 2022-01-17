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

const accessToken = localStorage.getItem("access-token");

export function getBoards() {
  return (dispatch) =>{
    dispatch(SetBoards({
      isLoading: true
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
        isLoading: false
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
  return (dispatch)=>{
    axios({
      method: "delete",
      url: `${baseUrl}/boards/${id}`,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;
      console.log(data);
      dispatch(DeleteBoard({
        id: data.id
      }));
    }).catch(err=>{
      console.log(err.response);
    });;
  };
}