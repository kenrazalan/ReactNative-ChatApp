import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Avatar,ListItem} from 'react-native-elements'


const CustomListItem = ({id,chatName,openChat}) => {
    return (
        <ListItem onPress={()=>{
            openChat(id,chatName)
        }} key={id} bottomDivider>
            <Avatar 
            rounded
            source={{
                uri:"https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png"
            }} />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:"bold"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                Subtitle
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
