/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from '../components/layout';
import { Text } from '../components/styles';

const NotFound = ({ helpText, messageText }) => (
  <Layout title="Oh no! That didn’t work...">
    <Text margin="16px 0 5px 0">
      { messageText }
    </Text>
    <Text margin="10px 0 40px 0">
      { helpText }
    </Text>
    <img src={require('../assets/img/not-found.jpg')} alt="not found" />
  </Layout>
);

NotFound.propTypes = {
  messageText: PropTypes.string,
  helpText: PropTypes.string,
};

NotFound.defaultProps = {
  messageText: 'It seems you tried to do something we can\'t verify. Did you log into a different Girbil account in a different window?',
  helpText: 'Can can you log out and try again?',
};

export default NotFound;
