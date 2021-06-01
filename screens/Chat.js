import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView,Platform,ScrollView,TextInput,SafeAreaView } from 'react-native';


const Chat = ({navigation,route}) => {
    const [input,setInput] = useState("")
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

    const sendMessage = () => {

    }

    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS ==="ios" ?"padding": "height"}
                keyboardVerticalOffset={90}>
                    <>
                    <ScrollView>

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            value={input} 
                            placeholder="Message"
                            onChangeText={(text)=> setInput(text)}/>
                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send" color="#2868E6"/>
                            </TouchableOpacity>
                    </View>
                    </>
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
    },
    footer: {
        alignItems: 'center',
        flexDirection:"row"
    }

})
