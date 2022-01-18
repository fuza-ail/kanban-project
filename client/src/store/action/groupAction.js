import axios from "axios";
import { baseUrl } from "../../constants/url";
import { 
  SET_GROUPS, 
  ADD_GROUP, 
  DELETE_GROUP, 
  // EDIT_GROUP, 
  ADD_MEMBER, 
  ADD_TASK,
  DELETE_TASK 
} from "./actionType";

function SetGroups(data) {
  return {
    type: SET_GROUPS,
    payload: data
  };
}

export function AddGroup(data) {
  return {
    type: ADD_GROUP,
    payload: data
  };
}

export function DeleteGroup(id) {
  return {
    type: DELETE_GROUP,
    payload: id
  };

}

export function AddMember(data) {
  return {
    type: ADD_MEMBER,
    payload: data
  };
}

export function AddTask(data) {
  return {
    type: ADD_TASK,
    payload: data
  };
}

export function DeleteTask(data) {
  return {
    type: DELETE_TASK,
    payload: data
  };
}

const accessToken = localStorage.getItem("access-token");

export function getGroups(groupId) {
  return (dispatch)=>{
    dispatch(SetGroups({
      isLoading: true,
    }));

    axios({
      method: "get",
      url: `${baseUrl}/groups/${groupId}`,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;

      dispatch(SetGroups({
        groups: data.groups,
        members: data.members,
        isLoading: false
      }));
    }).catch(err=>{
      dispatch(SetGroups({
        isLoading: false,
        isError: true,
      }));

      console.log(err.response);
    });
  };
}
