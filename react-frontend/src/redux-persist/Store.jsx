import {createStore} from "redux";
import persistStore from "redux-persist/es/persistStore";
import {persistedReducer} from "./rootReducer";

export const store = createStore(persistedReducer); // 최종 스토어
export const persistor = persistStore(store); // 스토어의 persist 상태를 복원/조작/초기화 등 동기화 및 제어할때 사용