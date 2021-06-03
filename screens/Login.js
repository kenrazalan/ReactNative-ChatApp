import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView } from 'react-native'
import {Button,Input,Image} from 'react-native-elements'
import {StatusBar} from 'expo-status-bar'
import { auth } from '../firebase'
import chat from '../assets/chat.png'


const Login = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged((authuser)=>{
            if(authuser){
                navigation.replace('Home')
            }
        })

        return unsubscribe
    },[])
    const signIn = () =>{
        auth.signInWithEmailAndPassword(email,password).catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
           
            <Image source={chat}
            style={styles.image} />
            <View style={styles.input}>
                <Input 
                    placeholder="Email" 
                    autoFocus type="email" 
                    value={email}
                    onChangeText={text => setEmail(text)}/>
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    autoFocus 
                    type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}/>
            </View>
            <Button containerStyle={styles.button}
            onPress={signIn} title="Login"/>
            <Button 
                onPress={() => navigation.navigate("Register") } 
                containerStyle={styles.button}
                type="outline" 
                title="Register"/>

        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        //padding: 10,
    },
    image: {width: 200,height: 200},
    input: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
