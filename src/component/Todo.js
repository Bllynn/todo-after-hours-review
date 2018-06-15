import React from 'react';

function ToDo(props) {
  return (
    <h4
      onClick={() => {
        props.delete(props.task.id);
      }}
    >
      {props.task.actionItem}
    </h4>
  );
}

export default ToDo;

// string task thing
// props.task
