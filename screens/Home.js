import React, { useLayoutEffect } from 'react'
import { SafeAreaView,ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'


const Home = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Chat App",
            headerStyle:{ backgroundColor: "white" },
            headerTitleStyle: {color: "black"},
            headerTintColor: {color: "black"},
            headerLeft: () =>{ <View style={{marginLeft: 20}}>
                <Avatar rounded source={{ 
                    uri: auth?.currentUser?.photoURL
                }}/>
            </View>}
        })
    },[navigation])
    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem  />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
