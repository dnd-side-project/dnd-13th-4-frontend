import { S3_IMAGE_URL } from '@/constants';
import { Bodies, Body, Engine, World } from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';

interface StarPhysicsProps {
  width: number;
  height: number;
  starCount?: number;
  onRefresh?: () => void;
}

interface Star {
  id: string;
  body: Body;
  imageUrl: string;
  size: number;
}

// 별 이미지 배열을 컴포넌트 외부로 이동 (상수화)
const starImages = [
  `${S3_IMAGE_URL}/statistics/awkward_star.png`,
  `${S3_IMAGE_URL}/statistics/disappointed_star.png`,
  `${S3_IMAGE_URL}/statistics/grateful_star.png`,
  `${S3_IMAGE_URL}/statistics/joyful_star.png`,
  `${S3_IMAGE_URL}/statistics/reliable_star.png`,
  `${S3_IMAGE_URL}/statistics/uncomfortable_star.png`,
];

const StarPhysics: React.FC<StarPhysicsProps> = ({
  width,
  height,
  starCount = 35,
  onRefresh,
}) => {
  const engineRef = useRef<Engine | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    // Matter.js 엔진 생성
    const engine = Engine.create();
    engine.world.gravity.y = 0.6; // 중력 줄여서 천천히 떨어뜨림
    engine.world.gravity.scale = 0.001;

    // 엔진 안정화 설정
    engine.enableSleeping = true; // 슬리핑 모드 활성화
    engine.positionIterations = 6; // 위치 반복 계산 줄임
    engine.velocityIterations = 4; // 속도 반복 계산 줄임

    engineRef.current = engine;

    // 컨테이너 벽 생성 (마찰력 추가로 굴러가는 효과)
    const walls = [
      Bodies.rectangle(width / 2, height + 25, width, 50, {
        isStatic: true,
        friction: 0.3, // 바닥 마찰력
      }), // 바닥
      Bodies.rectangle(-25, height / 2, 50, height, {
        isStatic: true,
        friction: 0.3,
      }), // 왼쪽 벽
      Bodies.rectangle(width + 25, height / 2, 50, height, {
        isStatic: true,
        friction: 0.3,
      }), // 오른쪽 벽
    ];

    World.add(engine.world, walls);

    // 별들을 순차적으로 생성
    let createdStars = 0;
    const starsPerDrop = 3; // 한 번에 3개씩 떨어뜨려서 빠르게 채움

    const createStars = () => {
      if (createdStars >= starCount) return;

      const starsToCreate = Math.min(starsPerDrop, starCount - createdStars);
      const newStars: Star[] = [];

      for (let i = 0; i < starsToCreate; i++) {
        const size = 16;
        // 더 넓은 범위에서 떨어뜨려서 자연스럽게 퍼지도록
        const x = 30 + Math.random() * (width - 60);
        const y = -40 - i * 25; // y 간격 늘려서 겹치지 않게

        // 원형 바디로 생성 (구르는 효과를 위한 설정)
        const body = Bodies.circle(x, y, size, {
          restitution: 0.4, // 적당한 반발력으로 통통 튀면서 구름
          friction: 0.7, // 마찰력 높여서 구르는 효과
          density: 1.0, // 적당한 무게감
          frictionAir: 0.01, // 공기 저항으로 자연스럽게 멈춤
          frictionStatic: 0.5, // 정적 마찰력
          sleepThreshold: 60, // 슬리핑 임계값 (낮을수록 빨리 잠듦)
        });

        // 구르는 효과를 위한 회전과 움직임
        const initialAngularVelocity = (Math.random() - 0.5) * 2.0; // 회전 증가로 구르는 효과
        Body.setAngularVelocity(body, initialAngularVelocity);

        // 수평 움직임 줄여서 천천히 떨어짐
        const initialVelocityX = (Math.random() - 0.5) * 1.5; // 수평 움직임 줄임
        Body.setVelocity(body, { x: initialVelocityX, y: 0.5 }); // 천천히 떨어짐

        // 초기 각도 랜덤 설정
        const initialAngle = Math.random() * Math.PI * 2; // 0 ~ 2π
        Body.setAngle(body, initialAngle);

        const star: Star = {
          id: `star-${createdStars}`,
          body,
          imageUrl: starImages[Math.floor(Math.random() * starImages.length)],
          size,
        };

        newStars.push(star);
        World.add(engine.world, body);
        createdStars++;
      }

      setStars((prev) => [...prev, ...newStars]);

      // 다음 별들 생성 스케줄링 (간격 줄여서 빠르게 채움)
      if (createdStars < starCount) {
        setTimeout(createStars, 150 + Math.random() * 200);
      }
    };

    // 첫 별들 생성 시작
    setTimeout(createStars, 500);

    // 애니메이션 루프
    const animate = () => {
      Engine.update(engine, 16.666); // 60fps

      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          body: { ...star.body }, // 강제 리렌더링
        })),
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [width, height, starCount]);

  return (
    <View style={{ width, height, overflow: 'hidden' }}>
      {stars.map((star) => (
        // 별 이미지만 표시
        <Image
          key={star.id}
          source={{ uri: star.imageUrl }}
          style={{
            position: 'absolute',
            width: star.size * 2,
            height: star.size * 2,
            left: star.body.position.x - star.size,
            top: star.body.position.y - star.size,
            resizeMode: 'contain',
            transform: [{ rotate: `${star.body.angle * (180 / Math.PI)}deg` }], // 회전 효과
          }}
          onError={(error) =>
            console.log('이미지 로드 에러:', error.nativeEvent.error)
          }
        />
      ))}
    </View>
  );
};

export default StarPhysics;
