import React from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomTabBar(props) {
  const { width } = useWindowDimensions();
  const currentRoute = props.state.routes[props.state.index].name;

  return (
    <View style={{ position: 'relative' }}>
      <BottomTabBar {...props} />
      
      {currentRoute === 'Home' && (
        <TouchableOpacity
          style={[styles.fab, { left: width / 2 - 30 }]} 
          onPress={() => props.navigation.navigate('Add')}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 35,
    backgroundColor: '#2A7C76',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 10,
  },
});
