import * as PopoverPrimitive from '@rn-primitives/popover';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cn } from '@/utils/cn';
import { TextClassContext } from '@/components/ui/text';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  PopoverPrimitive.ContentRef,
  PopoverPrimitive.ContentProps & { portalHost?: string }
>(({ className, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay style={StyleSheet.absoluteFill}>
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(100)}>
          <TextClassContext.Provider value='text-popover-foreground'>
            <PopoverPrimitive.Content
              ref={ref}
              align={align}
              sideOffset={sideOffset}
              className={cn(
                'z-50 w-auto rounded-md bg-popover p-4 shadow-sm shadow-slate-300 elevation-md',
                className
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
