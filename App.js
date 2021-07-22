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
import { Provider as AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './src/RootNavigation';
import { Provider as CourseProvider } from './src/context/CourseContext';
import { Provider as StudentProvider } from './src/context/StudentContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
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

function mainFlow() {
  return (        
  <Tab.Navigator>
    <>
      <Tab.Screen name="Course"
        component={courseFlow}
        options={{
        headerShown: true}}
      />
      <Tab.Screen name="Account"
        component={Account}
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
            <App/>
          </StudentProvider>
        </CourseProvider>
      </AuthProvider>
  );
};

