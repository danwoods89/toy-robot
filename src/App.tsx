import React from 'react';
import styled from 'styled-components';
import RobotConsole from './RobotConsole';

const Container = styled.div`
  position: relative;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: hsla(0, 0%, 100%, 0.87);
  text-rendering: optimizeLegibility;
  font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h1`
  display: block;
  font-weight: 600;
  font-size: 10vmin;
  margin: 0;
  color: rgb(222, 228, 253);
`;

const Name = styled.h5`
  display: block;
  font-weight: 200;
  font-size: 2vmin;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Title>toy-robot</Title>
      <Name>Dan Woods</Name>
      <RobotConsole />
    </Container>
  );
};

export default App;
