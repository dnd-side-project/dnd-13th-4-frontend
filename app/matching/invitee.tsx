import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';

const Invitee = () => {
  return (
    <SafeScreenLayout background={{ type: 'solid', color: '#FFFFFF' }}>
      <CustomText>invitee</CustomText>
    </SafeScreenLayout>
  );
};

export default Invitee;
