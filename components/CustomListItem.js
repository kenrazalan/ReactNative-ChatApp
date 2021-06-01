import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Avatar,ListItem} from 'react-native-elements'
import { db } from '../firebase'


const CustomListItem = ({id,chatName,openChat}) => {
    const [messages,setMessages] = useState([])

    useEffect(()=>{
        const unsubscribe = db.collection('chats')
        .doc(id).collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(snapshot => 
            setMessages(snapshot.docs.map(doc => doc.data())))
        return unsubscribe
    },[])
    return (
        <ListItem key={id} onPress={()=>{
            openChat(id,chatName)
        }} key={id} bottomDivider>
            <Avatar 
            rounded
            source={{
                uri: messages?.[messages.length -1]?.image || 
                "https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png"
            }} />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"bold"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
               <Text style={{fontWeight: "bold"}}>
                   {messages?.[messages.length -1]?.displayName}
              </Text>: {messages?.[messages.length -1]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
