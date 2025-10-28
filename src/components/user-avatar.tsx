import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// 아바타의 변형을 위한 cva
const avatarVariants = cva('', {
  variants: {
    size: {
      default: 'h-9 w-9',
      xs: 'h-4 w-4',
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
      xl: 'h-[160px] w-[160px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  username: string;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar = ({
  imageUrl,
  username,
  size,
  className,
  onClick,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(avatarVariants({ size }), className)}
      onClick={onClick}
    >
      <AvatarImage src={imageUrl} alt={username} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
