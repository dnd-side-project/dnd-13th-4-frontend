import { schedulePushNotification } from '@/lib/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { usePathname, useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DebugFloatingTokenButton = ({ token }: { token: string }) => {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState('');
  const router = useRouter();
  const currentPath = usePathname();
  const insets = useSafeAreaInsets();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(token || '');
    Alert.alert('복사 완료', '토큰이 클립보드에 복사되었습니다.');
  };

  const handleLocalPush = async () => {
    await schedulePushNotification();
  };

  const handleSaveToken = async (text: string): Promise<void> => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await AsyncStorage.setItem('accessToken', trimmed);
    Alert.alert('저장 완료', 'AccessToken이 AsyncStorage에 저장되었습니다.');
    Keyboard.dismiss();

    // ✅ 앱 전체 reload
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.warn('reload failed', e);
    }
  };

  const normalizePath = (p: string) => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  };

  const handleNavigate = (mode: 'push' | 'replace') => {
    const n = normalizePath(path);
    if (!n) {
      Alert.alert('경로를 입력하세요', '예: /notes/feeling, /archive, /');
      return;
    }
    setOpen(false);
    Keyboard.dismiss();
    if (mode === 'push') router.push(n as any);
    else router.replace(n as any);
  };

  if (process.env.EXPO_PUBLIC_ENV === 'production') return null;

  return (
    <>
      <TouchableOpacity
        style={[styles.floatingButton, { top: insets.top }]}
        onPress={() => {
          setPath('');
          setOpen(true);
        }}
      ></TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType='fade'
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>빠른 이동</Text>
          <Text style={styles.currentPath}>현재 경로: {currentPath}</Text>

          {/* 경로 입력 */}
          <View style={styles.inputRow}>
            <TextInput
              value={path}
              onChangeText={setPath}
              placeholder='예: /notes/feeling'
              autoCapitalize='none'
              style={styles.input}
              returnKeyType='go'
              onSubmitEditing={() => handleNavigate('push')}
            />
          </View>

          <View style={styles.navRow}>
            <Pressable
              style={styles.goBtn}
              onPress={() => handleNavigate('push')}
            >
              <Text style={styles.goText}>Push 이동</Text>
            </Pressable>
            <Pressable
              style={styles.goBtn}
              onPress={() => handleNavigate('replace')}
            >
              <Text style={styles.goText}>Replace 이동</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>푸시 디버그</Text>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionBtn} onPress={handleCopy}>
              <Text style={styles.actionText}>푸시토큰 복사</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={handleLocalPush}>
              <Text style={styles.actionText}>로컬푸시 실행</Text>
            </Pressable>
          </View>

          {/* AccessToken 입력 즉시 저장 */}
          <Text style={styles.sectionTitle}>AccessToken 입력 & 저장</Text>
          <TextInput
            placeholder='AccessToken 입력 후 Enter'
            autoCapitalize='none'
            style={styles.input}
            returnKeyType='done'
            onSubmitEditing={(e) => handleSaveToken(e.nativeEvent.text)}
          />

          <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
            <Text style={styles.closeText}>닫기</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  floatingButtonText: { color: 'white', fontSize: 20 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 80,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
    elevation: 20,
  },
  sheetTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  currentPath: { fontSize: 12, color: '#6B7280', marginBottom: 12 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  navRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  goBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  goText: { color: 'white', fontSize: 14, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  actionsRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  actionText: { fontSize: 14, color: '#111827' },
  closeBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  closeText: { color: 'white', fontSize: 14, fontWeight: '600' },
});
