import { View } from 'react-native'
import React from 'react'

const Seperator = ({width="100%", height = 1, backgroundColor = '#d3d3d3'}) => {
  return (
    <View style={{width , height, backgroundColor, alignSelf: "center"}}/>
  )
};

export default Seperator;