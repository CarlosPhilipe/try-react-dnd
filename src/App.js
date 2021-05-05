import React from 'react';
import './App.css';
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";
import initialData from "./initial-data";

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    // To-do
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = this.state.columns[source.droppableId];
    const newTaksIds = Array.from(column.taskIds);
    newTaksIds.splice(source.index, 1);
    newTaksIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaksIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  };
}

export default App;
