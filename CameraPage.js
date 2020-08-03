import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';

export default class CameraPage extends Component {

    camera = null;

    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false,
            type: Camera.Constants.Type.back,
            caption: ''
        }
        this.takePhoto = this.takePhoto.bind(this);
    }

    async componentDidMount() {

        const { status } = await Camera.requestPermissionsAsync();
        if (status == 'granted') {
            this.setState({
                hasPermission: true,
                type: this.state.type
            });
        }

    }

    async takePhoto() {
        if(this.camera) {
            this.camera.takePictureAsync()
            .then(async (value) => {
                console.log(value.uri);

                this.setState({ caption: 'Processing photo...' });

                const formData = new FormData();
                formData.append('photo', {uri: value.uri, name: 'image.jpg', type: 'image/jpeg'});
                fetch('https://35.208.238.60/api/analyse', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                })
                .then((resp) => {
                    console.log(resp.json().then((value) => {
                        this.setState({ caption: value.caption })
                        Speech.speak(value.caption);
                        }
                    ));
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        }
        else {
            console.log('camera not initialized' + this.camera);
        }
    }

    render() {
        if (this.state.hasPermission === null) {
            return <Text>Initializing Camera...</Text>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ flex: 0, marginTop: 50 }}>{this.state.caption}</Text>
                <Camera style={{ flex: 1, width: 360, marginTop: 30 }} type={this.state.type} ratio='4:3' 
                ref={ref => { this.camera = ref; }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={this.takePhoto}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> OK </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}
