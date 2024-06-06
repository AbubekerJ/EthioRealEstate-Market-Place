import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user/user.slice";

export const store = configureStore({
    reducer: { user: userSlice },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
    }
});
