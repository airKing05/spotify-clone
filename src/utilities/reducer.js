import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: '06XnWfK5ttKPRTur4KMeM4',
    selectedPlaylist: null,
    currentlyPlaying: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case reducerCases.SET_TOKEN: {
            return {
                ...state, token: action.token 
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return{
                ...state, playlists: action.playlists
            }
        }
        case reducerCases.SET_USER: {
          return{
              ...state, userInfo: action.userInfo
          }
        }
        case reducerCases.SET_PLAYLIST: {
            return{
                ...state, selectedPlaylist: action.selectedPlaylist
            }
        }
        case reducerCases.SET_CURRENTLY_PLAYING: {
            return{
                ...state, currentlyPlaying: action.currentlyPlaying
            }
        }
        default:
            return state;
    }
}

export default reducer; 