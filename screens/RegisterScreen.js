import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView
} from 'react-native';
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker';

import WAVE from '../assets/wave3.png';
import { Ionicons } from '@expo/vector-icons';
import UserPermissions from '../util/UserPermissions';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        user: {
            name: '',
            email: '',
            password: '',
            avatar: undefined
        },
        errorMessage: null
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    };

    handleSignup = () => {
        Fire.shared.createUser(this.state.user);
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Image
                    resizeMode='contain'
                    source={WAVE}
                    style={styles.backgroundImage}
                ></Image>

                <TouchableOpacity
                    style={styles.back}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Ionicons
                        name='ios-arrow-round-back'
                        size={32}
                        color='#FFF'
                    ></Ionicons>
                </TouchableOpacity>

                <View
                    style={{
                        // position: 'absolute',
                        top: -65,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '15%'
                    }}
                >
                    <Text style={styles.greeting}>Reform</Text>
                    <Text>Join us!</Text>

                    <TouchableOpacity
                        style={styles.avatarPlaceHolder}
                        onPress={this.handlePickAvatar}
                    >
                        <Image
                            source={{ url: this.state.user.avatar }}
                            style={styles.avatar}
                        />
                        <Ionicons
                            name='ios-add'
                            size={40}
                            color='#fff'
                            style={{ marginTop: 6, marginLeft: 2 }}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && (
                            <Text style={styles.error}>
                                {this.state.errorMessage}
                            </Text>
                        )}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={name =>
                                    this.setState({
                                        user: { ...this.state.user, name }
                                    })
                                }
                                value={this.state.user.name}
                            ></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Email</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={email =>
                                    this.setState({
                                        user: { ...this.state.user, email }
                                    })
                                }
                                value={this.state.user.email}
                            ></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={password =>
                                    this.setState({
                                        user: { ...this.state.user, password }
                                    })
                                }
                                value={this.state.user.password}
                            ></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={this.handleSignup}
                        style={styles.button}
                    >
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                        style={{ alignSelf: 'center', marginTop: 32 }}
                    >
                        <Text>
                            already a Reform user{' '}
                            <Text
                                style={{
                                    fontWeight: '500',
                                    color: '#E9446A'
                                }}
                            >
                                Login
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center'
    },
    backgroundImage: {
        height: 200,
        alignSelf: 'center'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginTop: 10,
        marginHorizontal: 30,
        backgroundColor: '#ff5500',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(21, 22, 48, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarPlaceHolder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e1e2e6',
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
