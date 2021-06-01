import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView,Platform,ScrollView,TextInput,SafeAreaView } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { auth, db } from '../firebase';
import firebase from 'firebase/app'

const Chat = ({navigation,route}) => {
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle: {backgroundColor:"#2868E6"},
            headerTitleStyle: {color: "white"},
            headerTintColor:"white",
            headerBackTitleVisible: false,
            headerTitleAlign : "left",
            headerTitle : () => (
                <View  style={styles.title}>
                    <Avatar rounded source={{uri: "https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png"}}/>
                    <Text style={styles.chatNameHeader}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.iconsRight}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])

    useLayoutEffect(()=>{
        
        const unsubscribe = db.collection("chats")
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) => 
         setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }
        )))
        //console.log(snapshot.docs.map(doc => ({id: doc.id,data: doc.data() })))
        )
        return unsubscribe
        
    },[route])

    const sendMessage = () => {
        //Keyboard.dismiss()
        db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            image: auth.currentUser.photoURL
        })
        setInput("")
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS ==="ios" ?"padding": "height"}
                keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback>
                    <>
                    <ScrollView>
                        {messages.map(({data,id}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar 
                                        rounded 
                                        //Web
                                        containerStyle={{ 
                                            right:-5,
                                            bottom:-15 ,
                                            position:"absolute" }}
                                        right={-5}
                                        bottom={-15} 
                                        position="absolute" 
                                        size={30} source={{
                                            uri: data.image
                                        }} />
                                    <Text style={styles.recieverChat}>{data.message}</Text>
                                </View>
                            ): (
                                <View style={styles.sender}>
                                    <Avatar />
                                    <Text style={styles.senderChat}>{data.message}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            style={styles.textInput}
                            value={input} 
                            placeholder="Message"
                            onChangeText={(text)=> setInput(text)}
                            onSubmitEditing={sendMessage}/>
                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send" color="#2868E6" size={24}/>
                            </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>    
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    title:{
        flexDirection:'row',
        alignItems: "center",
    },
    backBtn: {
        padding: 10,
        width: 50,
    },
    chatNameHeader :{
        fontWeight: "700",
        marginLeft: 10,
        color:"white"
    },
    iconsRight: {
        flexDirection:"row",
        marginRight: 20,
        justifyContent: 'space-between',
        width: 70,
    },
    container: {
        flex: 1
    },
    footer: {
        alignItems: 'center',
        flexDirection:"row",
        width: "100%",
        padding:15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        borderRadius:30,
        color: "grey"
    },
    reciever: {
        padding: 15,
        backgroundColor: "#2868E6",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    recieverChat:{
        color: "white"
    },
    sender: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    senderChat:{
        color: "black"
    }

})
