import React, { useState } from "react";
import GradeForm from "./GradeForm";
import GradeList from "./GradeList";
import styles from "./CourseCalculator.module.css";
const CourseCalculator = () => {
  const [courses, setCourses] = useState([]);
  const maxGrade = 100;

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };
  const removeCourse = (courseToRemove) => {
    setCourses(courses.filter((course) => course !== courseToRemove));
  };
  const resetCourses = () => {
    setCourses([]);
  };

  const calculateGrade = () => {
    const totalGrade = courses.reduce(
      (acc, course) =>
        acc +
        (parseFloat(course.weight) * parseFloat(course.grade)) /
          parseFloat(course.maxgrade),
      0
    );
    return totalGrade.toFixed(2);
  };
  const getLetterGrade = (numericGrade) => {
    if (numericGrade >= 94) {
      return "A+";
    } else if (numericGrade >= 90) {
      return "A";
    } else if (numericGrade >= 86) {
      return "A-";
    } else if (numericGrade >= 82) {
      return "B+";
    } else if (numericGrade >= 78) {
      return "B";
    } else if (numericGrade >= 74) {
      return "B-";
    } else if (numericGrade >= 70) {
      return "C+";
    } else if (numericGrade >= 65) {
      return "C";
    } else if (numericGrade >= 60) {
      return "C-";
    } else if (numericGrade >= 55) {
      return "D+";
    } else if (numericGrade >= 50) {
      return "D";
    } else {
      return "F";
    }
  };
  const calculateRemainingGrade = (desiredLetterGrade) => {
    const numericGradeNeeded = {
      "A+": 94,
      "A": 90,
      "A-": 86,
      "B+": 82,
      "B": 78,
      "B-": 75,
      "C+": 70,
      "C": 65,
      "C-": 60,
      "D+": 55,
      "D": 50,
    }[desiredLetterGrade];

    if (!numericGradeNeeded) {
      return null;
    }

    const currentGrade = parseFloat(calculateGrade());
    const remainingGrade = numericGradeNeeded - currentGrade;

    return remainingGrade > 0 && remainingGrade <= maxGrade
      ? remainingGrade.toFixed(2)
      : null;
  };
  const renderRemainingGrade = (desiredLetterGrade) => {
    const remainingGrade = calculateRemainingGrade(desiredLetterGrade);
    if (courses.length > 0 && remainingGrade) {
      return (
        <h2 className={styles.gradeburger}>
          Remaining Grade for {desiredLetterGrade}: {remainingGrade}%
        </h2>
      );
    }
    return null;
  };
  return (
    <div className={styles.container}>
      <h1>Course Grade Calculator</h1>
      <GradeForm addCourse={addCourse} />
      <GradeList courses={courses} removeCourse={removeCourse} />
      <h2>Total Grade: {courses.length > 0 ? calculateGrade() : "0.00"}%, {courses.length > 0 ? getLetterGrade(calculateGrade()) : "F"}</h2>
      <h2>
        Remaining Grade: {courses.length > 0 ? 100 - calculateGrade() : "0.00"}%
      </h2>
      {renderRemainingGrade("A+")}
      {renderRemainingGrade("A")}
      {renderRemainingGrade("A-")}
      {renderRemainingGrade("B+")}
      {renderRemainingGrade("B")}
      {renderRemainingGrade("B-")}
      {renderRemainingGrade("C+")}
      {renderRemainingGrade("C")}
      {renderRemainingGrade("C-")}
      {renderRemainingGrade("D+")}
      {renderRemainingGrade("D")}


      <button onClick={resetCourses}>Reset</button>
    </div>
  );
};

export default CourseCalculator;
