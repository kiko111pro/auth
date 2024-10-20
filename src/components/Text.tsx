import {TextProps, Text as RNText} from 'react-native';
import {fontName} from '../utils/constants';

export const fontData: object = {
  heading: {
    h1: {
      family: fontName.black,
      size: 24,
    },
    h2: {
      family: fontName.black,
      size: 18,
    },
    h3: {
      family: fontName.black,
      size: 16,
    },
    h4: {
      family: fontName.extraBold,
      size: 14,
    },
    h5: {
      family: fontName.bold,
      size: 12,
    },
  },

  body: {
    xl: {
      family: fontName.regular,
      size: 18,
    },
    l: {
      family: fontName.regular,
      size: 16,
    },
    m: {family: fontName.regular, size: 14},
    s: {
      family: fontName.regular,
      size: 12,
    },
    xs: {
      family: fontName.med,
      size: 10,
    },
  },

  action: {
    l: {
      family: fontName.semiBold,
      size: 14,
    },
    m: {
      family: fontName.semiBold,
      size: 12,
    },
    s: {
      family: fontName.semiBold,
      size: 10,
    },
  },

  caption: {
    m: {
      family: fontName.semiBold,
      size: 10,
    },
  },
};

type FontDataKey = keyof typeof fontData;
type FontStyleKey =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'xl'
  | 'l'
  | 'm'
  | 's'
  | 'xs';
type FontVariant =
  | 'heading.h1'
  | 'heading.h2'
  | 'heading.h3'
  | 'heading.h4'
  | 'heading.h5'
  | 'body.xl'
  | 'body.l'
  | 'body.m'
  | 'body.s'
  | 'body.xs'
  | 'action.l'
  | 'action.m'
  | 'action.s'
  | 'caption.m';

interface CustomTextProps extends TextProps {
  variant: FontVariant;
}

const getFontStyle = (variant: FontVariant) => {
  const [category, style] = variant.split('.') as [FontDataKey, FontStyleKey];
  return fontData[category][style];
};

const Text: React.FC<CustomTextProps> = ({
  variant,
  style,
  children,
  ...props
}) => {
  const fontStyle: {family: string; size: number} = getFontStyle(variant);

  return (
    <RNText
      style={[{fontFamily: fontStyle.family, fontSize: fontStyle.size}, style]}
      {...props}>
      {children}
    </RNText>
  );
};

export default Text;
