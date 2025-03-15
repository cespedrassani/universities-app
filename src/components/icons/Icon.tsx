import React from 'react';
import { LucideProps, icons } from 'lucide-react-native';
import { iconWithClassName } from './iconWithClassName';

type IconName = keyof typeof icons;

type IconProps = LucideProps & {
  name: IconName;
};

const Icon = React.forwardRef<SVGElement, IconProps>(({ name, color, size, ...rest }, _ref) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    throw new Error(`Icon "${name}" does not exist in icons.`);
  }

  return <LucideIcon color={color} size={size} {...rest} />;
});

Icon.displayName = 'Icon';
iconWithClassName(Icon as any);
export { Icon };
