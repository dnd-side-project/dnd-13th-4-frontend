import { schedulePushNotification } from '@/lib/notifications';
import * as Clipboard from 'expo-clipboard';
import { usePathname, useRouter } from 'expo-router';
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

export const DebugFloatingTokenButton = ({ token }: { token: string }) => {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState('');
  const router = useRouter();
  const currentPath = usePathname();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(token || '');
    Alert.alert('복사 완료', '토큰이 클립보드에 복사되었습니다.');
  };

  const handleLocalPush = async () => {
    await schedulePushNotification();
  };

  const normalizePath = (p: string) => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  };

  const handleNavigate = (mode: 'push' | 'replace') => {
    const n = normalizePath(path);
    if (!n) {
      Alert.alert('경로를 입력하세요', '예: /notes/feeling, /Storage, /');
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
        style={styles.floatingButton}
        onPress={() => {
          setPath('');
          setOpen(true);
        }}
        accessibilityRole='button'
        accessibilityLabel='디버그 메뉴 열기'
      >
        <Text style={styles.floatingButtonText}>🐛</Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType='fade'
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>빠른 이동</Text>

          {/* 현재 경로 표시 (참고용) */}
          <Text style={styles.currentPath}>현재 경로: {currentPath}</Text>

          {/* 경로 입력 */}
          <View style={styles.inputRow}>
            <TextInput
              value={path}
              onChangeText={setPath}
              placeholder='예: /notes/feeling'
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.input}
              returnKeyType='go'
              onSubmitEditing={() => handleNavigate('push')}
            />
          </View>

          {/* 이동 버튼 */}
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

          <Text style={styles.sectionTitle}>디버그</Text>
          <View style={styles.actionsRow}>
            <Pressable style={styles.actionBtn} onPress={handleCopy}>
              <Text style={styles.actionText}>토큰 복사</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={handleLocalPush}>
              <Text style={styles.actionText}>로컬 푸시</Text>
            </Pressable>
          </View>

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
    bottom: 40,
    backgroundColor: '#333',
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
    bottom: 24,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
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
