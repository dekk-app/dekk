import React from 'react'
import Text, {
  Uppercase,
  Center
} from '../../src/components/text'

const Credits = props => (
  <Text {...props}>
    <Center>
      <Uppercase>
        {props.children}
      </Uppercase>
    </Center>
  </Text>
)

export default Credits
