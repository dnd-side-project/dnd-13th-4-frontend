import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';

const Inviter = () => {
  return (
    <SafeScreenLayout background={{ type: 'solid', color: '#FFFFFF' }}>
      <CustomText>inviter</CustomText>
    </SafeScreenLayout>
  );
};

export default Inviter;
