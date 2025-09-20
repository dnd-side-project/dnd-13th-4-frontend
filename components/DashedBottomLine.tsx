import { GreyColors } from '@/constants/Colors';
import Svg, { Line } from 'react-native-svg';

const DashedBottomLine = () => (
  <Svg height='2' width='100%'>
    <Line
      x1='0'
      y1='1'
      x2='100%'
      y2='1'
      stroke={GreyColors.grey400}
      strokeWidth='1'
      strokeDasharray='4,2'
    />
  </Svg>
);

export default DashedBottomLine;
