import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons';


const Home = ({navigation}) => {
    const [chats,setChats] = useState([])

    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(snapshot =>{
            setChats(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
        )))
        })
        return unsubscribe
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Chat App",
            headerStyle:{ backgroundColor: "white" },
            headerTitleStyle: {color: "black"},
            headerTintColor: {color: "black"},
            headerLeft: () =>(
            <View style={styles.headerLeftIcon}>
                <TouchableOpacity onPress={signOut}>
                <Avatar rounded source={{ 
                    uri: auth?.currentUser?.photoURL
                }}/>
                </TouchableOpacity>
            </View>),
            headerRight: () =>(
            <View style={styles.headerRightIcon}>
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name="camerao" size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=>{
                        navigation.navigate("NewChat")
                    }}>
                    <SimpleLineIcons name="pencil" size={24} color="black"/>
                </TouchableOpacity>
            </View>),

        })
    },[navigation])

    const signOut = ()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
   
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data: {chatName}})=>(
                    <CustomListItem key={id} id={id} chatName={chatName} />
               ) )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container :{
        height: "100%"
    },
    headerLeftIcon:{
        marginLeft: 20
    },
    headerRightIcon: {
        flexDirection:"row",
        marginRight: 20,
        width: 80,
        justifyContent: 'space-between'
    }
})
