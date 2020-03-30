import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const posts = [
    {
        id: '1',
        name: 'pete',
        text:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        timestamp: 1585526461879,
        avatar: require('../assets/avatar.png'),
        image: {
            uri:
                'https://images.unsplash.com/photo-1585408871649-f8ce2d371e69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
        }
    },
    {
        id: '2',
        name: 'isabel',
        text:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        timestamp: 1585526461879,
        avatar: require('../assets/avatar.png'),
        image: {
            uri:
                'https://images.unsplash.com/photo-1580654127156-3f4ec6d7a5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        }
    },
    {
        id: '3',
        name: 'creed',
        text:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        timestamp: 1585526461879,
        avatar: require('../assets/avatar.png'),
        image: {
            uri:
                'https://images.unsplash.com/photo-1489769002049-ccd828976a6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        }
    }
];

export default class HomeScreen extends React.Component {
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>
                                {moment(post.timestamp).fromNow()}
                            </Text>
                        </View>
                        <Ionicons name='ios-more' size={24} color='#73788b' />
                    </View>
                    <Text style={styles.post}>{post.text}</Text>

                    <Image
                        source={post.image}
                        style={styles.postImage}
                        resizeMode='cover'
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons
                            name='ios-heart-empty'
                            size={24}
                            color='#73788b'
                            style={{ marginRight: 16 }}
                        />
                        <Ionicons
                            name='ios-chatboxes'
                            size={24}
                            color='#73788b'
                        />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efecf4'
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecf4',
        shadowColor: '#454d65',
        shadowOffset: { height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        zIndex: 3
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454d65'
    },
    timestamp: {
        fontSize: 11,
        color: '#c4c6ce',
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838898'
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});
