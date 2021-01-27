import {initGlobalState} from 'qiankun'

const state = {
  name: 'Devan',
  age: 27
}

const actions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  console.log(state, prev)
});



export {actions}