import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import AccountScreen from './src/screens/AccountScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import CreateScreen from './src/screens/CreateScreen';
import CreateGroupScreen from  './src/screens/CreateGroupScreen';
import ChatScreen from './src/screens/ChatScreen';
import ChatIndexScreen from './src/screens/ChatIndexScreen';
import GroupScreen from './src/screens/GroupScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './src/RootNavigation';
import { Provider as CourseProvider } from './src/context/CourseContext';
import { Provider as StudentProvider } from './src/context/StudentContext';
import { Provider as ChatProvider } from './src/context/ChatContext';
import { Provider as GroupProvider } from './src/context/GroupContext';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function courseFlow({ navigation }){
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{
          title: "Groupme",
          headerLeft: () => null,
          headerRight: () => (
          <View style={{    
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: 100}}>
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
              <Feather name="plus" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChatIndex')}>
              <Feather name="message-circle" size={30} />
            </TouchableOpacity>
          </View>
        )}}
        />
        <Stack.Screen 
          name="Detail"
          component={DetailScreen}
          options={{
          title: "Groupme"}}
          />
        <Stack.Screen 
          name="Create"
          component={CreateScreen}
          options={{
          title: "Groupme"}}
          />
        <Stack.Screen 
          name="Chat"
          component={ChatScreen}
          options={{
          title: "Chat"}}
          />
        <Stack.Screen 
          name="ChatIndex"
          component={ChatIndexScreen}
          options={{
          title: "Chat"}}
          />
      </>
    </Stack.Navigator>
  )
}

function Account(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Groupme",
          headerLeft: () => null
        }}
      />
      </Stack.Navigator>
  )
}

function Group({ navigation }){
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={GroupScreen}
        options={{
          title: "Groupme",
          headerLeft: () => null,
          headerRight: () => (
          <View style={{    
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: 100}}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
              <Feather name="plus" size={30} />
            </TouchableOpacity>
          </View>

          )}}
      />
      <Stack.Screen 
          name="CreateGroup"
          component={CreateGroupScreen}
          options={{
          title: "Groupme"}}
      />
      </Stack.Navigator>
  )
}

function mainFlow() {
  return (        
  <Tab.Navigator
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={false}
        activeColor="#121211"
        inactiveColor="#95a5a6"
        barStyle={{ backgroundColor: '#ffff' }} >
    <>
      <Tab.Screen name="Course"
        component={courseFlow}
        labeled={false}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Group"
        component={Group}
        labeled={false}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen name="Account"
        component={Account}
        labeled={false}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </>
  </Tab.Navigator>);
}

  
function App() { 

 return (
   <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <>
            <Stack.Screen name="Auth" 
              component={ResolveAuthScreen}     
              options={{
              headerShown: false}}
            />
            <Stack.Screen name="Signup" 
              component={SignupScreen}     
              options={{
              headerShown: false}}
            />
            <Stack.Screen name="Signin" 
              component={SigninScreen}     
              options={{
              headerShown: false}}
            />
            <Stack.Screen name="Main" 
              component={mainFlow}
              options={{
              headerShown: false}}
            />
          </>
        </Stack.Navigator>
   </NavigationContainer>
 )
};

export default () => {
  return (
      <AuthProvider>
        <CourseProvider>
          <StudentProvider>
            <ChatProvider>
              <GroupProvider>
                <App/>
              </GroupProvider>
            </ChatProvider>
          </StudentProvider>
        </CourseProvider>
      </AuthProvider>
  );
};

