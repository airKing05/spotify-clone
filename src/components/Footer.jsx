import React from 'react'
import styled from 'styled-components'
import CurrentTrack from './CurrentTrack';
import PlayerControl from './PlayerControl';
import VolumeControl from './VolumeControl';

export default function Footer() {
  return (
    <Container>
      <CurrentTrack/>
      <PlayerControl/>
      <VolumeControl/>
    </Container>
  )
}


const Container = styled.div`
height: 100%;
width: 100%;
padding: 0 1rem;
background: #181818;
border-top: 1px solid #282828;
display: grid;
grid-template-columns: 1fr 2fr 1fr;
align-items: center;
justify-content: center;
`;