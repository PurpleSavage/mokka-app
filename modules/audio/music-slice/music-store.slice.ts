import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  socketMusicFailed,
  socketMusicReady,
} from "@/store-events/notifications-events.event";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { MusicEntity } from "../domain/entities/music.entity";

export interface AiMusicState {
  musicHistory: MusicEntity[];
  currentMusicData: MusicEntity | null;
  isGenerating: ResponseHttpQueue | null;
  musicNotifications: MusicEntity[];
  musicsLastWeek: MusicEntity[];
}
const initialState: AiMusicState = {
  musicHistory: [],
  currentMusicData: null,
  isGenerating: null,
  musicNotifications: [],
  musicsLastWeek: [],
};

export const aiMusicSlice = createSlice({
  initialState,
  name: "audio",
  reducers: {
    setMusicHistory: (state, action: PayloadAction<MusicEntity[]>) => {
      state.musicHistory = action.payload;
    },

    lookMusicData: (state, action: PayloadAction<MusicEntity>) => {
      state.currentMusicData = action.payload;
    },
    deleteDataMusicModa: (state) => {
      state.currentMusicData = null;
    },
    setLoadingMusic: (state, action: PayloadAction<ResponseHttpQueue>) => {
      state.isGenerating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(socketMusicReady, (state, action) => {
      const entity = action.payload.entity;
      if (entity) {
        const exists = state.musicHistory.some((a) => a.id === entity.id);
        if (!exists) {
          state.musicHistory = [entity, ...state.musicHistory];
        }
      }
      state.isGenerating = null; // completed
    });
    builder.addCase(socketMusicFailed, (state) => {
      state.isGenerating = null; // failed
    });
  },
});
export const {
  setMusicHistory,
  lookMusicData,
  deleteDataMusicModa,
  setLoadingMusic,
} = aiMusicSlice.actions;

export default aiMusicSlice.reducer;
