import React, { useState } from "react";

const GradeForm = ({ addCourse }) => {
  const [weight, setWeight] = useState("");
  const [grade, setGrade] = useState("");
  const [maxgrade, setMaxGrade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ weight, grade, maxgrade});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Grade:</label>
        <input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Max Grade:</label>
        <input
          type="number"
          value={maxgrade}
          onChange={(e) => setMaxGrade(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Element</button>
    </form>
  );
};

export default GradeForm;
