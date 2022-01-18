import { 
  SET_GROUPS, 
  ADD_GROUP, 
  ADD_MEMBER, 
  ADD_TASK, 
  DELETE_GROUP, 
  DELETE_TASK,
  UPDATE_TASK, 
  // EDIT_GROUP 
} from "../action/actionType";

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
      case DELETE_GROUP:
        const groupId = action.payload;
        return {
          ...state,
          groups: state.groups.filter(group => group.group_id !== groupId)
        };
      case ADD_MEMBER:
        return {
          ...state,
          members: state.members.concat(action.payload.member)
        };
      case ADD_TASK:
        const groups = JSON.parse(JSON.stringify(state.groups));
        const { task, group_id } = action.payload;
        
        const groupIndex = groups.findIndex(el=>el.group_id === group_id);
        const group = groups.find(el=>el.group_id === group_id);
        const tasks = [...group.tasks];
        
        tasks.push(task);
        group.tasks = tasks;
        groups[groupIndex] = group;
        return {
          ...state,
          groups
        };
      case DELETE_TASK:
        const inGroupId = action.payload.groupId;
        const taskId = action.payload.taskId;
        
        const groupsCopy = JSON.parse(JSON.stringify(state.groups));
        const findGroupIndex = groupsCopy.findIndex(el=>el.group_id === inGroupId);
        const findGroup = groupsCopy.find(el=>el.group_id === inGroupId);

        const listTask = [...findGroup.tasks];

        findGroup.tasks = listTask.filter(el=>el.id !== taskId );
        groupsCopy[findGroupIndex] = findGroup;
        
        return {
          ...state,
          groups: groupsCopy
        };
      case UPDATE_TASK:
        const currentTask = action.payload.task;
        // console.log(currentTask);
        const originGroupId = action.payload.originGroupId;
        const destinationGroupId = action.payload.destinationGroupId;

        const listGroup = JSON.parse(JSON.stringify(state.groups));

        const indexGroupOrigin = listGroup.findIndex(el=>el.group_id === originGroupId);
        const indexGroupDest = listGroup.findIndex(el=>el.group_id === destinationGroupId);

        const groupOrigin = listGroup.find(el=>el.group_id === originGroupId);
        const groupDestination = listGroup.find(el=>el.group_id === destinationGroupId);

        groupDestination.tasks.push(currentTask);
        groupOrigin.tasks = groupOrigin.tasks.filter(el=>el.id !==currentTask.id);
        // console.log(currentTask);
        // console.log(groupOrigin);

        listGroup[indexGroupOrigin]= groupOrigin;
        listGroup[indexGroupDest] = groupDestination;

        return {
          ...state,
          groups: listGroup
        };
      default:
        return {
          ...state
        };
  }
}