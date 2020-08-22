import React from 'react';
import styled from 'styled-components';

const getPadding = (props: any): string => {
  const {
    size, theme 
  } = props;
  if (size === 'sm') return `${theme.spacing(0.5)}px ${theme.spacing(1)}px`;
  if (size === 'lg') return `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`;
  return `${theme.spacing(0.75)}px ${theme.spacing(1.5)}px`;
};

const getFontSize = (props: any): string => {
  const { size } = props;
  if (size === 'sm') return '.75rem';
  if (size === 'lg') return '1.25rem';
  return '1rem';
};

const StyledButton = styled.button<ButtonProps>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: props.theme.palette.primary,
  border: '1px solid',
  borderColor: props.theme.palette.primary,
  padding: getPadding(props),
  fontSize: getFontSize(props),
  fontFamily: '"Work Sans", sans-serif',
  verticalAlign: 'middle',
  textAlign: 'center',
  outline: 'none',
  borderRadius: props.theme.shapes.borderRadius,
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'all .15s ease-in-out',
  '&:hover': {
    backgroundColor: props.theme.darken(props.theme.palette.primary, 0.1),
    borderColor: props.theme.darken(props.theme.palette.primary, 0.1)
  }
}));

const StyledStartIcon = styled.div((props) => ({
  marginRight: props.theme.spacing(1)
}));

export interface ButtonProps {
  children?: React.ReactNode;
  color?: string;
  size?: 'sm' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    startIcon,
    endIcon,
    ...rest 
  } = props;

  return (
    <StyledButton {...rest}>
      {startIcon && (<StyledStartIcon>{startIcon}</StyledStartIcon>)}
      {children}
    </StyledButton>
  );
};
