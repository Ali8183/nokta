import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Nokta', 
            headerShown: true,
            headerTitleAlign: 'center',
            headerLargeTitle: true,
          }} 
        />
        <Stack.Screen 
          name="idea/[id]" 
          options={{ 
            title: 'Refining',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="idea/spec/[id]" 
          options={{ 
            title: 'Spec Card',
            headerShown: true,
            presentation: 'modal'
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
