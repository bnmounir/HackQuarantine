import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    LayoutAnimation,
    SafeAreaView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import WAVE from '../assets/wave3.png';
import { Ionicons } from '@expo/vector-icons';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        email: '',
        name: '',
        password: '',
        errorMessage: null
    };

    handleSignup = () => {
        const { email, password, name } = this.state;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }))
            .finally(() => this.props.navigation.navigate('Loading'));
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Image
                    resizeMode='contain'
                    source={WAVE}
                    style={styles.image}
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
                <Text style={styles.greeting}>{`Join our Community!`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>
                <SafeAreaView>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            ></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Email</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            ></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.input}
                                autoCapitalize='none'
                                onChangeText={password =>
                                    this.setState({ password })
                                }
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>
                </SafeAreaView>
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
                        <Text style={{ fontWeight: '500', color: '#E9446A' }}>
                            Login
                        </Text>
                    </Text>
                </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    image: {
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
    }
});
