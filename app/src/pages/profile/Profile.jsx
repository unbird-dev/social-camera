/* eslint-disable global-require */
import React from 'react';

import { Layout } from '../../components/layout';
import { Button, Flex } from '../../components/styles';
import { Camera, Wrapper } from './style';

const Profile = () => (
  <Layout title="Take a snapshot">
    <Flex>
      <Wrapper>
        <Camera>
          Webcam stream shows here
        </Camera>
        <Button className="primary">Take shot</Button>
      </Wrapper>
      <Wrapper>
        <Camera>
          uploaded snapshot shows here
        </Camera>
        <Button className="green">Clear</Button>
      </Wrapper>
    </Flex>
  </Layout>
);

export default Profile;
