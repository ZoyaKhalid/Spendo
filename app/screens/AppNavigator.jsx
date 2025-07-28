import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AboutUsScreen from './AboutUsScreen';
import AddTransactionScreen from './AddTransactionScreen.jsx';
import BillDetailScreen from './BillDetailScreen.jsx';
import ChangePasswordScreen from './ChangePasswordScreen';
import ChartScreen from './ChartScreen.jsx';
import ConnectWalletScreen from './ConnectWalletScreen.jsx';
import CustomTabBar from './CustomTabBar';
import EditTransactionScreen from './EditTransactionScreen.jsx';
import FeedbackScreen from './FeedbackScreen';
import HistoryScreen from './HistoryScreen';
import HomeScreen from './HomeScreen.jsx';
import landingPage from './landingPage.jsx';
import LoginScreen from './LoginScreen.jsx';
import ProfileMenuScreen from './ProfileMenuScreen.jsx';
import SignupScreen from './SignupScreen.jsx';
import SplashScreen from './SplashScreen.jsx';
import TransactionDetailScreen from './TransactionDetailScreen.jsx';
import UpdateProfileScreen from './UpdateProfileScreen';
import WalletScreen from './WalletScreen.jsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2A7C76',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white', height: 70 },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          paddingBottom: 4,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Chart') iconName = 'bar-chart';
          else if (route.name === 'Wallet') iconName = 'account-balance-wallet';
          else if (route.name === 'Profile') iconName = 'account-circle';

          return (
            <Icon
              name={iconName}
              size={focused ? 30 : 26}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Spendo',
          tabBarLabel: 'Home',
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: '#2A7C76' },
          headerTintColor: 'white',
          headerTitleStyle: {
          fontSize: 40,
          fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{ headerShown: false, tabBarLabel: 'Chart' }}
      />
      <Tab.Screen
        name="Add"
        component={AddTransactionScreen}
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Wallet',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMenuScreen}
        options={{ headerShown: false, tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeTabs" component={BottomTabs} />
      <Stack.Screen name="Edit" component={EditTransactionScreen} />
      <Stack.Screen name="ProfileMenu" component={ProfileMenuScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="ConnectWallet" component={ConnectWalletScreen} />
      <Stack.Screen name="BillDetails" component={BillDetailScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <Stack.Screen name="landingPage" component={landingPage} />
    </Stack.Navigator>
  );
}
