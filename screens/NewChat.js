import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Input,Button} from 'react-native-elements'
import Icon from '@expo/vector-icons/FontAwesome';
import { db } from '../firebase';


const NewChat = ({navigation}) => {
    const [name,setName] = useState('')
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "New Chat",
             headerBackTitleVisible: false,
        })
    },[navigation])

    const createChat = async () =>{
        await db.collection('chats').add({
            chatName: name
        }).then(()=>{
            navigation.goBack()
        }).catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input 
                value={name} 
                onChangeText={text => setName(text)} 
                placeholder="Enter chat name"
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24}/>
                }
            />
            <Button onPress={createChat} title="Create new chat"/>
        </View>
    )
}

export default NewChat

const styles = StyleSheet.create({
    container:{
        padding: 10,
        height: "100%"
    }
})
