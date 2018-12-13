import {
  basicRegistry,
  isActionInNamespace
} from "../utils/reduxHelpers";
import * as formManager from "../templates/formManager/formManagerReducer";

const NAMESPACE = "profile";

const origin = {
  ...formManager.state,
  info: {
    username: "",
    email: ""
  },
  settings: {}
};

const registry = {
  ...basicRegistry,
};

const profileReducer = (state = origin, action) => {
  if (!isActionInNamespace(action, NAMESPACE)) {
    return state;
  }

  const handler = registry[action.type];
  if (!handler) return state;

  return handler(state, action);
}

export default profileReducer;