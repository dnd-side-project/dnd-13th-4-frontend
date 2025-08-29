import { Stack } from 'expo-router';

export default function NotesStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureDirection: 'horizontal',
      }}
    />
  );
}
