import React from 'react'
import PropTypes from 'prop-types'
import Text, {
  Uppercase,
  Center
} from '../../src/components/text'

const Credits = props => (
  <Text className={props.className}>
    <Center>
      <Uppercase>
        {props.children}
      </Uppercase>
    </Center>
  </Text>
)

Credits.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Credits
