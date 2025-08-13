import React, { useState } from "react";

const CourseForm = ({ addCourse }) => {
  const [subjectName, setSubjectName] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [grade, setGrade] = useState("");
  const [customGPA, setCustomGPA] = useState("");

  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setGrade(selectedGrade);
    setCustomGPA(gradeOptions[selectedGrade].toString());
  };

  const handleCustomGPAChange = (e) => {
    const inputGPA = parseFloat(e.target.value);
    setCustomGPA(inputGPA.toString());
    // Find the closest matching grade based on inputGPA (you can customize this logic)
    // For simplicity, I'll just use the first matching grade.
    const matchingGrade = Object.keys(gradeOptions).find(
      (gradeKey) => gradeOptions[gradeKey] === inputGPA
    );
    if (matchingGrade) {
      setGrade(matchingGrade);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gpa = customGPA ? parseFloat(customGPA) : gradeOptions[grade];
    addCourse({ subjectName, creditHours, grade: gpa });
  };

  const gradeOptions = {
    'A+': 0.7,
    'A': 1.0,
    'A-': 1.3,
    'B+': 1.7,
    'B': 2.0,
    'B-': 2.3,
    'C+': 2.7,
    'C': 3.0,
    'C-': 3.3,
    'D+': 3.7,
    'D': 4.0,
    'F': 5.0
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Subject Name:</label>
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Credit Hours:</label>
        <input
          type="number"
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
          required
        />
      </div>
      <div> 
        <label>Grade:</label>
        <select value={grade} onChange={handleGradeChange} required>
          <option value="">Select Grade</option>
          {Object.keys(gradeOptions).map((gradeKey) => (
            <option key={gradeKey} value={gradeKey}>
              {gradeKey} ({gradeOptions[gradeKey]})
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          value={customGPA}
          onChange={handleCustomGPAChange}
          placeholder="Custom GPA"
        />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
