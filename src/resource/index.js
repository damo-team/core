import PropTypes from 'prop-types';

export * from './resource';
export * from './resourceCRUD';
export * from './resourceAction';
export * from './resourceDecorator';
export * from './resourceModel';

export function shallowCopy(obj, extra){
  const newObj = {};
  for(let key in obj){
    newObj[key] = obj[key];
  }
  for(let key in extra){
    newObj[key] = extra[key];
  }
  return newObj;
}

export function extractCopy(obj, extract, extra){
  const newObj = {};
  if(Array.isArray(extract)){
    extract.forEach(key => {
      newObj[key] = obj[key];
    });
  }else{
    for(let key in extract){
      if(extract[key]){
        newObj[key] = obj[key] && obj[key].isRequired;
      }else{
        newObj[key] = obj[key];
      }
    }
  }
  for(let key in extra){
    newObj[key] = extra[key];
  }
  return newObj;
}


export function validateParameters(propTypes, value){
  const newPropTypes = {};
  for(let key in propTypes){
    if(typeof propTypes[key] === 'function'){
      newPropTypes[key] = propTypes[key];
    }else{
      newPropTypes[key] = propTypes[key].type;
    }
  }
  return PropTypes.shape(newPropTypes).isRequired({parameters: value}, 'parameters', 'action');
}
