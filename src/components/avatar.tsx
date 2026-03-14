import * as React from "react";

export const Avatar: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
};

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage: React.FC<AvatarImageProps> = ({ className = "", ...props }) => {
  return (
    <img
      className={`h-full w-full object-cover ${className}`}
      {...props}
    />
  );
};

interface AvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium ${className}`}
    >
      {children}
    </div>
  );
};