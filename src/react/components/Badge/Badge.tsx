/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '../Icon';

export const StyledBadge = styled.div<BadgeProps>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.palette[props.color] ?? props.color,
  padding: props.theme.spacing(props.size === 'sm' ? 0.5 : props.size === 'lg' ? 1.5 : 1),
  color: props.theme.palette.text.alternate,
  borderRadius: props.theme.shapes.borderRadius,
  fontWeight: 600,
  fontSize: props.size === 'sm' ? props.theme.font.size.small : props.size === 'lg' ? props.theme.font.size.large : props.theme.font.size.normal,
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
