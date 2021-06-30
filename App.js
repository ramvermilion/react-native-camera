import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';

//Imported Images
import cameraIcon from './assets/icons8-camera-50.png';
import cameraSwitchIcon from './assets/icons8-switch-camera-50.png';

const CameraApp = () => {

  let cameraRef = useRef(null);
  const [camType, setCamType] = useState(RNCamera.Constants.Type.front);
  const [preview, setPreview] = useState(false)

  const takePicture = async () => {
    console.log('works')
    if (cameraRef) {
      const options = { quality: RNCamera.Constants.VideoQuality["720p"], mirrorVideo: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        console.log("picture source", source);
        setPreview(true)
        //handle save with the source
      }
    }
  };

  const cancelPreview = async () => { await cameraRef.current.resumePreview(); setPreview(false) };

  const handleFlip = () => camType === 0 ? setCamType(1) : setCamType(0);

  return (
    <View style={styles.mainContainer}>

      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={camType}
        captureAudio={false}
        playSoundOnCapture={true}
        mirrorVideo={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'I need my permission to use my camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={styles.buttonWrap}>

        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Text style={styles.iconWrap}>
            <Image source={cameraIcon} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFlip} style={styles.captureButton}>
          <Text style={styles.iconWrap}>
            <Image source={cameraSwitchIcon} />
          </Text>
        </TouchableOpacity>

        {preview &&
          <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
            <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
            <View style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]} />
          </TouchableOpacity>
        }

      </View>
    </View>
  )
}

const VIEW = styled.View`
  color:red,
`

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeButton: {
    position: "absolute",
    bottom: 650,
    left: 320,
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    opacity: 0.7,
    zIndex: 2,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "#000",
  },
  buttonWrap: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  iconWrap: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: '100%',
    height: '100%'
  }
});

export default CameraApp;



