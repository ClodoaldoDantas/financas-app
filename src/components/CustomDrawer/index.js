import React from 'react';
import { View, Image, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useAuth } from '../../hooks/auth';

export default function CustomDrawer(props) {
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
        }}
      >
        <Image
          resizeMode="contain"
          source={require('../../assets/Logo.png')}
          style={{ height: 85, width: 85 }}
        />

        <Text style={{ color: '#fff', fontSize: 18, marginTop: 5 }}>
          Bem-vindo
        </Text>

        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            paddingBottom: 25,
          }}
        >
          {user && user.name}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        {...props}
        label="Sair do app"
        inactiveBackgroundColor="#c62c36"
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
}
