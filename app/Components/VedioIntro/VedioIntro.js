import React from 'react'
import { Video } from 'expo-av';
import { Div, Text } from 'react-native-magnus';
import { StyleSheet } from 'react-native';


export default function VedioIntro() {
  let video = null;
  return (
    <Div w="100%">
      <Video
        ref={(ref) => { video = ref; }}
        style={styles.video}
        source={require('../../../assets/images/video.mp4')}
        useNativeControls={false}
        resizeMode="cover"
        isLooping={true}
        shouldPlay={true}
        onError={(error) => console.log("Error loading video:", error)}

      />
    </Div>
  )
}



const styles = StyleSheet.create({
  video: {
    width: 400,
    height: 300,
  },
});


