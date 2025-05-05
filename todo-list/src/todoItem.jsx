import React from "react";

export default class TodoItem extends React.Component {
  render() {
    const { text, isCompleted, handleTask } = this.props;

    return (
      <>
        <input onClick={() => handleTask()} type="checkbox" checked={isCompleted}/>
        <span>{isCompleted ? <del>{text}</del> : text}</span>
      </>
    );
  }
}
