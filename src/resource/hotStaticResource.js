export function HotStaticResource(newComponent, staticOption){
  newComponent.displayName = staticOption.displayName;
  newComponent.actions = staticOption.actions;
  newComponent.initialize = staticOption.initialize;
  
  for(let name in newComponent.actions){
    newComponent[name] = staticOption.actions[name];
    newComponent[name].name = staticOption.displayName + '.' + name;
  }
  return newComponent;
}
