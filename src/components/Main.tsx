import React from 'react';
import styled from 'styled-components';
import Column from './Column';
import { Column as ColumnType } from '../types/tasks';
import { ColumnSelectors } from '../redux/Columns/index';
import Container from './Container';
import { RootState, useAppSelector } from '../redux/configureStore';

const Main: React.FC = () => {
  const columns = useAppSelector((state: RootState) => ColumnSelectors.getColumns(state));
  return (
    <StyledMain>
      {columns!.map((elem: ColumnType) => {
        return <Column key={elem.id} id={elem.id} title={elem.title} />;
      })}
    </StyledMain>
  );
};
const StyledMain = styled(Container)`
  display: flex;
  flex-wrap: no-wrap;
  padding-left: 15px;
  padding-top: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: auto;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;
export default Main;
