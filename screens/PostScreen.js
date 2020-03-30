import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../util/UserPermissions';

export default class PostScreen extends React.Component {
    state = {
        text: '',
        image: undefined
    };

    componentDidMount() {
        UserPermissions.getCameraPermission();
    }

    handlePost = () => {
        Fire.shared
            .addPost({
                text: this.state.text.trim(),
                localUri: this.state.image
            })
            .then(ref => {
                console.log('58 handlePost');
                this.setState({ text: '', image: undefined });
                this.props.navigation.goBack();
            })
            .catch(err => {
                console.log('error handling post at line 63');
                alert(err);
            });
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons
                            name='md-arrow-back'
                            size={24}
                            color='#d8d9db'
                        ></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: '500' }}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatar}
                    ></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder='write something...'
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name='md-camera' size={32} color='#d8d9db' />
                </TouchableOpacity>

                <View
                    style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}
                >
                    <Image
                        source={{ uri: this.state.image }}
                        style={{ width: '100%', height: '100%' }}
                    ></Image>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d9db'
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    }
});
