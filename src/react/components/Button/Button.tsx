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
  if (size === 'sm') return props.theme.font.size.small;
  if (size === 'lg') return props.theme.font.size.large;
  return props.theme.font.size.normal;
};

const StyledButton = styled.button<ButtonProps>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: props.theme.palette[props.color] ?? props.color,
  border: '1px solid',
  borderColor: props.theme.palette[props.color] ?? props.color,
  color: props.theme.getContrastText(props.theme.palette[props.color] ?? props.color),
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
    backgroundColor: props.theme.emphasize(props.theme.palette[props.color] ?? props.color, 0.1),
    borderColor: props.theme.emphasize(props.theme.palette[props.color] ?? props.color, 0.1)
  }
}));

const StyledStartIcon = styled.div((props) => ({
  marginRight: props.theme.spacing(1)
}));

const StyledEndIcon = styled.div((props) => ({
  marginLeft: props.theme.spacing(1)
}));

export interface ButtonProps {
  children?: React.ReactNode;
  color: string;
  size?: 'sm' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
      {endIcon && (<StyledEndIcon>{endIcon}</StyledEndIcon>)}
    </StyledButton>
  );
};
