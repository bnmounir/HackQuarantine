import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import WAVE from '../assets/wave3.png';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
        email: '',
        password: '',
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }));
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
                <View
                    style={{
                        position: 'absolute',
                        top: 100,
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Text style={styles.greeting}>Reform</Text>
                    <Text>Welcome Back!</Text>
                </View>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>
                <View style={styles.form}>
                    <View>
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
                <TouchableOpacity
                    onPress={this.handleLogin}
                    style={styles.button}
                >
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={{ alignSelf: 'center', marginTop: 32 }}
                >
                    <Text>
                        New to Reform{' '}
                        <Text style={{ fontWeight: '500', color: '#E9446A' }}>
                            Sign up
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
        fontSize: 32,
        fontWeight: '800',
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
    }
});
