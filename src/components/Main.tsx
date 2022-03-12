import React from 'react';
import styled from 'styled-components';
import Column from './Column';
import { Column as ColumnType } from '../types/tasks';
import { connect } from 'react-redux';
import { ColumnSelectors } from '../redux/Columns/index';
import Container from './Container';

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
type MainProps = {
  columns?: Array<ColumnType>;
};
function Main(props: MainProps) {
  return (
    <StyledMain>
      {props.columns!.map((elem: ColumnType) => {
        return <Column key={elem.id} id={elem.id} cardsIds={elem.cards} title={elem.title} />;
      })}
    </StyledMain>
  );
}
const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    columns: ColumnSelectors.getColumns(state),
  };
};
export default connect(mapStateToProps, null)(Main);
