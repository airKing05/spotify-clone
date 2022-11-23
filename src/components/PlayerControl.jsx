import React from 'react';
import {FiRepeat} from 'react-icons/fi';
import {CgPlayTrackNext, CgPlayTrackPrev} from 'react-icons/cg';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle} from 'react-icons/bs';
import styled from 'styled-components';
import { useStateProvider } from '../utilities/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utilities/Constants';


export default function PlayerControl() {
    const [{token, playerState }, dispatch] = useStateProvider();

    const headerData = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };

    // change the track based on the "NEXT" and "PREVIOUS" click
    const changeTrack = async (type) =>{
        // changing the track
      const respose =  await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
          headers: headerData
      });
     console.log("kljsdf", respose)
   
      // currently playing 
        const res = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: headerData
        });
        if (res.data !== "") {
            const { item } = res.data;
            const currentlyPlaying = {
                currentTrackId: item.id,
                currentTrackName: item.name,
                currentTrackImage: item.album.images[2].url,
                currentTrackArtists: item.artists.map((artist) => artist.name)
            };
            dispatch({ type: reducerCases.SET_CURRENTLY_PLAYING, currentlyPlaying })
        }else{
            dispatch({ type: reducerCases.SET_CURRENTLY_PLAYING, currentlyPlaying:null })
        }
    };

    // change the state of current track based on the "PLAY" and "PAUSE" state 
    const changePlayerState = async() => {
        const currentState = playerState ? "pause" : "play";
        const res = await axios.put(`https://api.spotify.com/v1/me/player/${currentState}`, {}, {
            headers: headerData
        });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
    };  
   
  return (
    <Container>
        <div className="shuffle">
            <BsShuffle/>
        </div>
        <div className="previous" onClick={()=>changeTrack("previous")}>
            <CgPlayTrackPrev/>
        </div>
        <div className="state">
              {playerState ? <BsFillPauseCircleFill onClick={changePlayerState} /> : <BsFillPlayCircleFill onClick={changePlayerState} />}
        </div>
          <div className="next" onClick={() => changeTrack("next")}>
            <CgPlayTrackNext/>
        </div>
        <div className="repeat">
            <FiRepeat/>
        </div>

    </Container>
  )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
svg{
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover{
        color: #fff;
    }
}
.state{
    svg{
        color: #fff;
    }
}
.previous, .next, .state{
    font-size: 2rem;
}
`;
