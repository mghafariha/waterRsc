import thunk from 'redux-thunk'
import {items,item,infractionItem,columns} from './reducer'
import {
 combineReducers,
 createStore,
 applyMiddleware

} from 'redux';
const reducer=combineReducers({
    items,
    item,
    infractionItem,
    columns,
});
const store=createStore(reducer,applyMiddleware(thunk))
export default store