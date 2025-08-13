import React from 'react';

const CourseList = ({ courses, removeCourse }) => {
  return (
    <ul>
      {courses.map((course, index) => (
        <li key={index}>
          {course.subjectName} - {course.creditHours} Credit Hours - Grade: {course.grade}
          <button onClick={() => removeCourse(course)}>Remove {index}</button>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
