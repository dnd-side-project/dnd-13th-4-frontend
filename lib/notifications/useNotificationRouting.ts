// src/notifications/useNotificationRouting.ts
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

// 🔒 모듈 스코프에 "이미 처리한 응답 ID" 저장 (리마운트에도 유지)
const handledResponseIds = new Set<string>();

type RouteData = { route?: string; params?: string };

function parseRouteData(data: Record<string, string | undefined>) {
  const route = data.route;
  let params: Record<string, any> | undefined;
  if (data.params) {
    try {
      params = JSON.parse(data.params);
    } catch {}
  }
  return { path: route, params };
}

// 중복 내비 방지(같은 목적지로 연속 이동 방지) — 선택
function makeOnceNavigator() {
  let last = '';
  return (pathname: string, params?: any) => {
    const sig = JSON.stringify({ pathname, params });
    if (sig === last) return false;
    last = sig;
    return true;
  };
}

export function useNotificationRouting() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const subscribedRef = useRef(false);
  const coldHandledRef = useRef(false);
  const canNavigate = useRef(makeOnceNavigator());

  const consume = (response: Notifications.NotificationResponse | null) => {
    if (!response) return false;
    const id = response.notification?.request?.identifier ?? '';
    if (!id) return false;
    if (handledResponseIds.has(id)) return false; // 이미 처리함
    handledResponseIds.add(id); // ✅ 이제 소비 완료
    return true;
  };

  // 1) 탭 리스너 — 한 번만 구독
  useEffect(() => {
    if (subscribedRef.current) return;
    subscribedRef.current = true;

    const sub = Notifications.addNotificationResponseReceivedListener((res) => {
      // ✅ 새 응답만 처리
      if (!consume(res)) return;

      const data = (res.notification?.request?.content?.data || {}) as Record<
        string,
        string
      >;
      const { path, params } = parseRouteData(data);
      if (path && canNavigate.current(path, params)) {
        routerRef.current.push({ pathname: path, params });
      }
    });

    return () => {
      sub.remove();
      subscribedRef.current = false;
    };
  }, []); // deps 없음

  // 2) 냉시작 — 초기 1회만
  useEffect(() => {
    if (coldHandledRef.current) return;
    coldHandledRef.current = true;

    (async () => {
      const res = await Notifications.getLastNotificationResponseAsync();
      // ✅ 같은 응답을 재사용하지 않도록 소비 처리
      if (!consume(res)) return;

      const data = (res.notification?.request?.content?.data || {}) as Record<
        string,
        string
      >;
      const { path, params } = parseRouteData(data);
      if (path && canNavigate.current(path, params)) {
        routerRef.current.replace({ pathname: path, params });
      }
    })();
  }, []); // deps 없음
}
