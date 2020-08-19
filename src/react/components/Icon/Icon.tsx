import React,
{ useContext } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps 
} from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

export interface IconProps extends FontAwesomeIconProps {}

export const Icon = (props: IconProps) => {
  const {
    color,
    ...rest 
  } = props;
  const theme = useContext(ThemeContext);

  const getColor = (clr: string): string => {
    return theme.palette[clr] ?? clr;
  };

  return (
    <FontAwesomeIcon
      color={getColor(color)}
      {...rest}
    />
  );
};
