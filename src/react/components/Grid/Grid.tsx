import React from 'react';
import styled from 'styled-components';

const StyledGrid = styled.div<GridProps>((props) => ({
  display: 'flex',
  flexDirection: props.flexDirection,
  alignItems: props.alignItems,
  alignContent: props.alignContent,
  justifyContent: props.justifyContent
}));

export type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type GridContentAlignment =
  'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridJustification =
  'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface GridProps {
  children?: React.ReactNode;
  justifyContent?: GridJustification;
  alignItems?: GridItemsAlignment;
  alignContent?: GridContentAlignment;
  flexDirection?: GridDirection;
  flexWrap?: GridWrap;
}

export const Grid = (props: GridProps) => {
  const {
    children,
    justifyContent,
    alignItems,
    alignContent,
    flexDirection,
    flexWrap
  } = props;

  return (
    <StyledGrid
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
    >
      {children}
    </StyledGrid>
  );
};
