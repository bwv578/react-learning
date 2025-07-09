import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // 이건 로컬스토리지
import storageSession from 'redux-persist/lib/storage/session'; // 얘가 세션스토리지
import {userReducer} from "../redux/reducers/userReducer";

const rootReducer = combineReducers({
    user: userReducer
});

const persistConfig = {
    key: "root", // 저장소의 키 => sessionStorage.getItem("root")
    storage: storage, // 사용할 저장소
    whitelist: ["user"] // 저장할 리듀서 이름
}

// 루트 리듀서를 persistConfig이 적용된 persist리듀서로 감싸기
export const persistedReducer = persistReducer(persistConfig, rootReducer);
