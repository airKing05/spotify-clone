import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utilities/StateProvider';
import { BsVolumeDown } from 'react-icons/bs'
import axios from 'axios';

export default function VolumeControl() {
    const [{ token }] = useStateProvider();

    const headerData = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
    };

    const changeVolume = async (e) =>{
      const res = await axios.put(`https://api.spotify.com/v1/me/player/volume`, {}, 
      {
          params: {
              volume_precent: parseInt(e.traget.value)
          },
        header: headerData
      }
      );

      console.log(e)
    };
  return (
    <Container>

        {/* <BsVolumeDown/>  */}
        <input type="range" min={0} max={100} value={30} onMouseUp={(e) => changeVolume(e)} />
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
input{
   
    width: 8rem;
    border-radious: 3rem;
    height: .4rem;
    accent-color: rgba(255, 255, 255, 0.6);;
}
`;