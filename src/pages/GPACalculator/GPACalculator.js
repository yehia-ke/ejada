import React, { useState } from "react";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";
import styles from "./GPACalculator.module.css";
const GPACalculator = () => {
  const [courses, setCourses] = useState([]);

  const addCourse = (course) => {
    setCourses((prevCourses) => {
      const existingCourse = prevCourses.find(
        (existing) => existing.subjectName === course.subjectName
      );
      if (existingCourse) {
        return prevCourses; // Return the original courses array
      }
      return [...prevCourses, course]; // Add the new course
    });
  };

  const removeCourse = (courseToRemove) => {
    setCourses((courses) => {
      return courses.filter((course) => course !== courseToRemove);
    });
  };
  const resetCourses = () => {
    setCourses(courses => {
      return [];
    });
    window.location.reload();
  };

  const calculateGPA = () => {
    const totalCredits = courses.reduce(
      (acc, course) => acc + parseFloat(course.creditHours),
      0
    );
    const totalPoints = courses.reduce(
      (acc, course) =>
        acc + parseFloat(course.creditHours) * parseFloat(course.grade),
      0
    );
    return (totalPoints / totalCredits).toFixed(2);
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };
  const handleFileRead = (event) => {
    const csvData = event.target.result;
    const rows = csvData.split("\n");
    const parsedData = rows.map((row) => row.split(","));
    parsedData.pop();
    parsedData.forEach((data) => {
      const [subjectName, creditHours, grade] = data;
      addCourse({subjectName, creditHours, grade});

    });
  };
  return (
    <div className={styles.container}>
      <h1>GPA Calculator</h1>
      <CourseForm addCourse={addCourse} />
      <CourseList courses={courses} removeCourse={removeCourse} />
      <h2>Current GPA: {courses.length > 0 ? calculateGPA() : "0.00"}</h2>
      <button onClick={resetCourses}>Reset</button>
      <input type="file" id="csvFileInput" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default GPACalculator;
