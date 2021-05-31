import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {Button,Input,Text} from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({navigation}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    },[navigation])

    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(user => {
            user.user.updateProfile({
                displayName: name,
                photoURL: image || `https://image.shutterstock.com/image-photo/man-hiking-sunset-mountains-heavy-600w-723981925.jpg`
            })
        })
        .catch(error => alert(error))
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <Text h3 >Create Accoun</Text>
        <View style={styles.input}>
            <Input 
                placeholder="Full Name" 
                
                type="text"
                value={name}
                onChangeText={text => setName(text)}/>
            <Input 
                placeholder="Email" 
                type="email"
                value={email}
                onChangeText={text => setEmail(text)}/>
            <Input 
                secureTextEntry
                placeholder="Password" 
                type="password"
                value={password}
                onChangeText={text => setPassword(text)}/>
            <Input 
                placeholder="Profile Picture" 
                type="text"
                value={image}
                onChangeText={text => setImage(text)}
                onSubmitEditing={register}/>
        </View>
        <Button 
            containerStyle={styles.button}
            raised
            title="Register"
            onPress={register}/>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "center",

    },
    input: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,

    }
})
