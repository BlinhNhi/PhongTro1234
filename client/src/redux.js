 import rootReducer from "./stores/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore , applyMiddleware } from "redux";
import { thunk } from "redux-thunk";


const reduxStore = () =>{
    //thunk call api khi ditpatch lên 1 action lên reducer
    const store = createStore(rootReducer, applyMiddleware(thunk)) // middleware ở đây
    const persistor =  persistStore(store)
    return {store , persistor}
}

export default reduxStore;