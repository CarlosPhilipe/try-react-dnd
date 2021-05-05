import React from 'react';
import { Draggable } from "react-beautiful-dnd";

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid grey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
`;

export default class Taks extends React.Component {
 render() {
   return (
     <Draggable draggableId={this.props.task.id} index={this.props.index} >
       {(provided) => (
         <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
         >
           {this.props.task.content}
         </Container>
       )}
     </Draggable>
   );
 };
}
