import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '../Icon';

const getPadding = (props: any): string => {
  const {
    size, theme 
  } = props;
  if (size === 'sm') return `${theme.spacing(0.35)}px ${theme.spacing(0.5)}px`;
  if (size === 'lg') return `${theme.spacing(1)}px ${theme.spacing(1.5)}px`;
  return `${theme.spacing(0.5)}px ${theme.spacing(1)}px`;
};

const getFontSize = (props: any): string => {
  const { size } = props;
  if (size === 'sm') return props.theme.font.size.small;
  if (size === 'lg') return props.theme.font.size.large;
  return props.theme.font.size.normal;
};

export const StyledBadge = styled.div<BadgeProps>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.palette[props.color] ?? props.color,
  padding: getPadding(props),
  color: props.theme.getContrastText(props.theme.palette[props.color] ?? props.color),
  borderRadius: props.theme.shapes.borderRadius,
  fontWeight: 600,
  fontSize: getFontSize(props),
  userSelect: 'none',
  [StyledIcon]: {
    '&:first-child': {
      marginRight: props.theme.spacing(0.75)
    },
    '&:last-child': {
      marginLeft: props.theme.spacing(0.75)
    }
  }
}));

export interface BadgeProps {
  children?: React.ReactNode;
  size?: 'sm' | 'lg';
  color: string;
}

export const Badge = (props: BadgeProps) => {
  const {
    children,
    ...rest 
  } = props;
  return (<StyledBadge {...rest}>{children}</StyledBadge>);
};
