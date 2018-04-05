const processingStatus = ['start', 'success', 'error']

function getAction(modelName, actionName, status){
  const actionType = `${modelName}/${actionName}/${status}`;
  
  const action = (data, arguments) => {
    return { type: actionType, payload: {data: data, arguments: arguments, status: status}};
  }

  return [actionType, action];
}

function getActions(modelName, actionName){
  return processingStatus.map(status => getAction(modelName, actionName, status));
}

// + 创建actionTypes和actionCreators
export function getActionCreators(modelName, actionName, status){
  const list = status ? getAction(modelName, actionName, status) : getActions(modelName, actionName);
  const actionsMap = {};

  list.forEach(item => {
    actionsMap[item[0]] = item[1];
  });
  
  return actionsMap;
}
