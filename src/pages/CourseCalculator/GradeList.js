import React from 'react';

const GradeList = ({ courses, removeCourse }) => {
  return (
    <ul>
      {courses.map((course, index) => (
        <li key={index}>
          Weight: {course.weight}% - Grade: {((course.grade / course.maxgrade) * 100).toFixed(2)}% | Final Weight: {course.weight * ((course.grade / course.maxgrade))}%
          <button onClick={() => removeCourse(course)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default GradeList;
