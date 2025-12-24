import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionEntity } from "../domain/entities/session.entity";

export interface AuthState {
  session: SessionEntity | undefined;
  idSession:string | undefined
}

const initialState: AuthState = {
  session: undefined,
  idSession:undefined
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionEntity>) => {
      state.session = action.payload
      state.idSession = action.payload.user.id
    },
    setIdSession: (state, action: PayloadAction<string>) => {
      state.idSession = action.payload;
    },
    clearSession: (state) => {
      state.session= undefined;
    },
  },
});

export const { setSession, clearSession,setIdSession } = authSlice.actions;

export default authSlice.reducer;