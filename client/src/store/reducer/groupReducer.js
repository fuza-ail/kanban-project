import { SET_GROUPS, ADD_GROUP, ADD_MEMBER, ADD_TASK, DELETE_GROUP, EDIT_GROUP } from "../action/actionType";

const initialState = {
  groups: [],
  members: [],
  isLoading: false,
  isError: false,
};

export default function groupReducer(state=initialState, action) {
  switch (action.type) {
      case SET_GROUPS:
        return {
          ...state,
          members: action.payload.members,
          groups: action.payload.groups,
          isLoading: action.payload.isLoading,
          isError: action.payload.isError,
        };
      case ADD_GROUP:
        return {
          ...state,
          groups: state.groups.concat(action.payload.group)
        };
      case ADD_MEMBER:
        return {
          ...state,
          members: state.members.concat(action.payload.member)
        };
      case ADD_TASK:
        const groups = JSON.parse(JSON.stringify(state.groups));
        const { task, group_id } = action.payload;
        
        const groupIndex = groups.findIndex(el=>el.group_id = group_id);
        const group = groups.find(el=>el.group_id = group_id);
        const tasks = [...group.tasks];
        
        tasks.push(task);
        group.tasks = tasks;
        groups[groupIndex] = group;

        return {
          ...state,
          groups
        };
      default:
        return {
          ...state
        };
  }
}