import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView } from 'react-native'
import {Button,Input,Image} from 'react-native-elements'
import {StatusBar} from 'expo-status-bar'
import { auth } from '../firebase'


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

    }
   
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
           
            <Image source={{
                uri: "https://image.shutterstock.com/image-photo/man-hiking-sunset-mountains-heavy-600w-723981925.jpg"
            }}
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
                    onChangeText={text => setPassword(text)}/>
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
