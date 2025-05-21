import { useState, useRef, useEffect } from "react";
import styles from "./TaskManager.module.css";

export default function TaskManager() {
  //State variables

  const [willUpdate, setWillUpdate] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  //useRef
  const inputRef = useRef(null);
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
  const [taskArray, setTaskArray] = useState([]);
  //useEffect
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //Function submit the form
  function handleSubmit(e) {
    e.preventDefault();
    setWillUpdate(false);

    if (formData.title == "") {
      setAlertMessage("No title added");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      return;
    }

    if (formData.description == "") {
      setAlertMessage("No description added");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
    if (formData.duration.hour == 0 && formData.duration.minute == 0) {
      setAlertMessage("No duration  added");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
    if (
      formData.duration.hour == 0 &&
      formData.duration.minute == 0 &&
      formData.description == ""
    ) {
      setAlertMessage("No duration and description added");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
    setTaskArray([...taskArray, { formData }]);

    console.log(taskArray);
    setDate(new Date().toISOString().split("T")[0]);
    setHour(0);
    setMinute(0);
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
    const newTaskArray = taskArray.filter((_, i) => i !== index);
    setTaskArray(newTaskArray);
  }
  //Function to update task
  function handleUpdate(index) {
    const task = taskArray[index];
    const updatedForm = {
      date: task.formData.date,
      tag: task.formData.tag,
      title: task.formData.title,
      description: task.formData.description,
      duration: {
        hour: task.formData.duration.hour,
        minute: task.formData.duration.minute,
      },
    };
    setFormData(updatedForm); //Now value of formData will be updateForm
    setDate(task.formData.date);
    setHour(task.formData.duration.hour);
    setMinute(task.formData.duration.minute);
    const newTaskArray = taskArray.filter((_, i) => i !== index); //The previous task will be deleted now
    setTaskArray(newTaskArray);
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
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
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
              value={hour}
              onChange={(e) => {
                setHour(e.target.value);
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
              value={minute}
              onChange={(e) => {
                setMinute(e.target.value);
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

      {taskArray
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
