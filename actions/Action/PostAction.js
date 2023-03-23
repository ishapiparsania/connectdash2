import { POST,REMOVE_POST,EDIT_POST,ADD_LIKE,CACHE,ADD_COMMENT } from "../ActionType/ActionType";

export const addPost=(payload)=>(
    {type:POST,payload}
);

export const RemovePost=(payload)=>(
    {type:REMOVE_POST,payload}
);

export const Editpost=(payload)=>(
    {type:EDIT_POST,payload}
);

export const AddLike=(payload)=>(
    {type:ADD_LIKE,payload}
);

export const AddComment=(payload)=>(
    {type:ADD_COMMENT,payload}
);

export const ClearCache=(payload)=>(
    {type:CACHE,payload}
);