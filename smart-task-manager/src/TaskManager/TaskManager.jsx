import { useState, useRef, useEffect, useReducer } from "react";
import styles from "./TaskManager.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "Add":
      return {
        ...state,
        taskArray: [...state.taskArray, action.payload], //[{formData:...},{formData:...},{formData:...},{formData:...}]
      };
    case "Delete":
      const newTaskArray = state.taskArray.filter(
        (_, i) => i !== action.payload
      );
      return {
        ...state,
        taskArray: newTaskArray,
      };
    case "Update":
      const updatedTasks = state.taskArray.map((task, index) =>
        index === action.payload.index
          ? { formData: action.payload.formData }
          : task
      );
      return {
        ...state,
        taskArray: updatedTasks,
      };
    default:
      return state;
  }
}

export default function TaskManager() {
  //State variables
  const [updateIndex, setUpdateIndex] = useState(null);
  const [willUpdate, setWillUpdate] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  let [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    tag: "work",
    title: "",
    description: "",
    duration: {
      hour: 0,
      minute: 0,
    },
  });

  //useRef
  const inputRef = useRef(null);
  //useEffect
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  //useReducer
  const [state, dispatch] = useReducer(reducer, { taskArray: [] });

  //Validate Form
  function validateForm(formData) {
    if (!formData.title.trim()) return "No title added";
    if (!formData.description.trim()) return "No description added";
    if (
      parseInt(formData.duration.hour) === 0 &&
      parseInt(formData.duration.minute) === 0
    )
      return "No duration added";
    return null;
  }

  //Function submit the form
  function handleSubmit(e) {
    e.preventDefault();
    setWillUpdate(false);

    const error = validateForm(formData);
    if (error) {
      setAlertMessage(error);
      setTimeout(() => setAlertMessage(""), 2000);
      return;
    }

    if (willUpdate && updateIndex !== null) {
      dispatch({
        type: "Update",
        payload: {
          index: updateIndex,
          formData,
        },
      });
      setUpdateIndex(null);
    } else {
      dispatch({
        type: "Add",
        payload: { formData },
      });
    }

    setWillUpdate(false);

    setFormData({
      date: new Date().toISOString().split("T")[0],
      tag: "work",
      title: "",
      description: "",
      duration: {
        hour: 0,
        minute: 0,
      },
    });
  }
  //Function to delete task
  function handleDelete(index) {
    dispatch({
      type: "Delete",
      payload: index,
    });
  }
  //Function to update task
  function handleUpdate(index) {
    const task = state.taskArray[index];
    setFormData({ ...task.formData });

    setUpdateIndex(index);
    setWillUpdate(true);
  }

  return (
    <>
      {/* Today's date */}
      <p className={styles.todayDate}>Today is: {new Date().toDateString()}</p>
      {/* For alert message */}
      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}

      {/* Form to add task */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Plan your day</h2>
        {/* For the day */}
        <div className={styles.date}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
            }}
          />
        </div>
        {/* For the date selection */}
        <div className={styles.tags}>
          {/* select Tag */}
          <label>Tag</label>
          <br />
          <input
            type="radio"
            id="work"
            name="tag"
            value="work"
            //This is a controlled input in React.
            // If formData.tag is "work", then this radio button will appear selected.
            checked={formData.tag === "work"}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            defaultChecked
          />
          <label htmlFor="work">Work</label>
          <input
            type="radio"
            id="home"
            name="tag"
            value="home"
            checked={formData.tag === "home"}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          />
          <label htmlFor="home">Home</label>
          <input
            type="radio"
            id="urgent"
            name="tag"
            value="urgent"
            checked={formData.tag === "urgent"}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          />
          <label htmlFor="urgent">Urgent</label>
        </div>
        {/* Type Title of the task */}
        <div className={styles.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title of the Task"
            id="title"
            ref={inputRef}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        {/* Add Description of the task */}
        <div className={styles.description}>
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="description"
            rows="5"
            cols="20"
            placeholder="Enter your task description here..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        {/* For Duration */}
        <div className={styles.duration}>
          <label htmlFor="hour">Duration</label>
          {/* For hour */}
          <div className={styles.hour}>
            <select
              id="hour"
              name="hour"
              value={formData.duration.hour}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  duration: { ...formData.duration, hour: e.target.value },
                });
              }}
            >
              <option value="">Select hour</option>
              {Array.from({ length: 23 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            &nbsp;
            <label>hour</label>
          </div>
          {/* For Minute */}
          <div className={styles.minute}>
            <select
              id="minute"
              name="minute"
              value={formData.duration.minute}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  duration: { ...formData.duration, minute: e.target.value },
                });
              }}
            >
              <option value={0}>0</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
            &nbsp;
            <label>minute</label>
          </div>
        </div>
        {/* Button */}
        <div className={styles.btnDiv}>
          <button className={styles.button}>
            {willUpdate ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
      {/* The Task List */}

      {state.taskArray
        .sort((a, b) => {
          const dateA = new Date(a.formData.date).getTime();
          const dateB = new Date(b.formData.date).getTime();

          if (dateA < dateB) return -1; // latest date first
          if (dateA > dateB) return 1;

          // If dates are same, compare hour
          const hourA = parseInt(a.formData.duration.hour);
          const hourB = parseInt(b.formData.duration.hour);

          if (hourA !== hourB) return hourA - hourB;

          // If hours are same, compare minute
          const minuteA = parseInt(a.formData.duration.minute);
          const minuteB = parseInt(b.formData.duration.minute);

          return minuteA - minuteB;
        })
        .map((task, index) => (
          <div className={styles.taskContainer} key={index}>
            <div className={styles.tagContainer}>
              <div>
                <div className={styles.tagDiv}>
                  <span className="material-symbols-outlined">
                    label_important
                  </span>
                  <span className={styles.tag}>{task.formData.tag}</span>
                </div>
                <h3>{task.formData.title}</h3>
                <h4>{task.formData.description}</h4>
              </div>

              <div>
                <h4 style={{ color: "black" }}>Date: {task.formData.date}</h4>
                {task.formData.duration.hour > 0 &&
                  task.formData.duration.minute > 0 && <span>Deadline :</span>}
                &nbsp;
                {task.formData.duration.hour > 0 && (
                  <span>{task.formData.duration.hour} hour</span>
                )}
                {task.formData.duration.minute > 0 && (
                  <span>{task.formData.duration.minute} minute</span>
                )}
              </div>
            </div>
            <div className={styles.icons}>
              <span
                className="material-symbols-outlined"
                onClick={() => handleDelete(index)}
              >
                delete
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => handleUpdate(index)}
              >
                edit_note
              </span>
            </div>
          </div>
        ))}
    </>
  );
}
