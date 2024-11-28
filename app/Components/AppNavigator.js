import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../Screens/UserScreens/Home/Home'
import Logo from './Logo/Logo'
import Drawer_Component from './Drawer_Component/Drawer_Component'
import Login from '../Screens/UserScreens/Auth/Login'
import { useTranslation } from 'react-i18next'
import Dashboard from '../Screens/AdminScreens/Dashboard/Dashboard'
import Add_Category from '../Screens/AdminScreens/Categories/Add_Category'
import Post_Ad from '../Screens/UserScreens/Post_Ad/Post_Ad'
import { Div } from 'react-native-magnus'
import Register from '../Screens/UserScreens/Auth/Register'
import Details from '../Screens/UserScreens/Details/Details'
import Account from '../Screens/UserScreens/Account/Account'
import Edit_Ad from '../Screens/UserScreens/Post_Ad/Edit_Ad'
import Posts from '../Screens/UserScreens/Posts/Posts'
import Profile from '../Screens/UserScreens/Profile/Profile'
import Search from '../Screens/UserScreens/Search/Search'
import Wishlist from '../Screens/UserScreens/Wishlist/Wishlist'
import Add_Post from '../Screens/UserScreens/Posts/Add_Post'
import Support from '../Screens/UserScreens/Support/Support'
import CategoryAds from '../Screens/UserScreens/CategoriesAds/CategoryAds'





const Stack = createNativeStackNavigator()
export default function AppNavigator() {
  const { t } = useTranslation()
  
  return (
    <Stack.Navigator initialRouteName='Home'>
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Home" component={Home}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="PostAd" component={Post_Ad}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Edit_Ad" component={Edit_Ad}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Details" component={Details}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Account" component={Account}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Posts" component={Posts}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Profile" component={Profile}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Search" component={Search}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Wishlist" component={Wishlist}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Add_Post" component={Add_Post}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Support" component={Support}
        options={{ headerShown: false }} />
      {/* ---------------------------------------------------------------------------- */}
      <Stack.Screen
        name="CategoryAds" component={CategoryAds}
        options={{ headerShown: false }} />
      {/* --------------------------------------------------------------------------- */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }} />

      {/* =========================== Admin Navigator =============================== */}

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: t('Dashboard'),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15
          },
          headerRight: () => <Drawer_Component />,

        }} />

      <Stack.Screen
        name="Add_Category"
        component={Add_Category}
        options={{
          headerTitle: t('Dashboard'),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15
          },
          headerRight: () => <Drawer_Component />,

        }} />


    </Stack.Navigator>
  )
}
