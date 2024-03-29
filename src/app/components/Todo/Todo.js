import React, { useState } from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import octopus from '../../../../public/images/octopus.png';

const Todo = () => {
  const [lists, setLists] = useState([]);
  const [inputListName, setInputListName] = useState('');
  const [inputTask, setInputTask] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const handleChangeListName = (event) => {
    setInputListName(event.target.value);
  };

  const handleSubmitList = (event) => {
    event.preventDefault();
    if (inputListName.trim() !== '') {
      setLists([...lists, { name: inputListName, tasks: [] }]);
      setInputListName('');
    }
  };

  const handleChangeTask = (event) => {
    setInputTask(event.target.value);
  };

  const handleSubmitTask = (listIndex) => (event) => {
    event.preventDefault();
    if (inputTask.trim() !== '') {
      const updatedLists = [...lists];
      updatedLists[listIndex].tasks.push({ name: inputTask, completed: false });
      setLists(updatedLists);
      setInputTask('');
    }
  };

  const handleToggleTask = (listIndex, taskIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].tasks[taskIndex].completed = !updatedLists[listIndex].tasks[taskIndex].completed;
    setLists(updatedLists);
  };

  const handleDeleteTask = (listIndex, taskIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].tasks.splice(taskIndex, 1);
    setLists(updatedLists);
  };

  const handleDragStart = (listIndex, taskIndex) => {
    setDraggedTask({ listIndex, taskIndex });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (listIndex) => {
    const updatedLists = [...lists];
    const { listIndex: prevListIndex, taskIndex } = draggedTask;

    const movedTask = updatedLists[prevListIndex].tasks.splice(taskIndex, 1)[0];
    updatedLists[listIndex].tasks.push(movedTask);

    setLists(updatedLists);
    setDraggedTask(null);
  };

  const todayList = lists.find((list) => list.name.toLowerCase() === 'today');

  return (
    <>
    {todayList && (
      <div className={styles.todaytasks}>
        <h3> ‧₊˚✧ Today's tasks ✧˚₊‧</h3>
        <div className={styles.tasknametoday}>
            {todayList.tasks.map((task, taskIndex) => (
              <table>
              <tr key={taskIndex}>
                <td>{task.name}</td>
              </tr>
              </table>))}
            </div>
      </div>
    )}
    <div className={styles.tipcontainer}>
   <div className={styles.oct}><Image src={octopus} height={50} width={60}/></div><div className={styles.tip}> Tip : Title your list "Today" to unlock a special list displayed above! </div>
   </div>
    <div id="tasks" >
      <div className={styles.heading}>Study To Do  
        <div className={styles.content}>
          <form onSubmit={handleSubmitList}>
            <div>
              <input type="text" value={inputListName} onChange={handleChangeListName} placeholder="Enter list name" />
            </div>
            <div>
              <button type="submit" style={{ backgroundColor: '#a44ed9', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Create List</button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.container}>
        {lists.map((list, listIndex) => (
          <div key={listIndex} className={styles.listContainer}>
            <div className={styles.listHeader}>
              <h3>{list.name}</h3>
              <form onSubmit={handleSubmitTask(listIndex)}>
                <div>
                  <input type="text" value={inputTask} onChange={handleChangeTask} placeholder="Enter task" />
                </div>
                <div className={styles.addtask}>
                  <button type="submit" style={{ backgroundColor: '#a44ed9', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Add Task</button>
                </div>
              </form>
            </div>
            <ul
              className={styles.tasks}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(listIndex)}
            >
              {list.tasks.map((task, taskIndex) => (
                <li
                  key={taskIndex}
                  draggable
                  onDragStart={() => handleDragStart(listIndex, taskIndex)}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(listIndex, taskIndex)}
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default Todo;
