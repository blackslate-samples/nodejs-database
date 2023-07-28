import { useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import "./studentcard.styles.css";

export default function StudentCard(props) {
  const student = props.student;

  const [editing, setEditing] = useState(false);
  const [studentName, setStudentName] = useState(student.studentName);
  const [studentEmailId, setStudentEmailId] = useState(student.studentEmailId);

  async function updateStudent() {
    try {
      const { data, error } = await supabase
        .from("students")
        .update({
          studentName: studentName,
          studentEmailId: studentEmailId,
        })
        .eq("studentId", student.studentId);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteStudent() {
    try {
      const { data, error } = await supabase
        .from("students")
        .delete()
        .eq("studentId", student.id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="student-card">
      <div>
        {editing === false ? (
          <div>
            <h5>{student.studentName}</h5>
            <p>{student.studentEmailId}</p>
            <button className="delete-button" onClick={() => deleteStudent()}>
              Delete Student
            </button>
            <button className="edit-button" onClick={() => setEditing(true)}>
              Edit Student
            </button>
          </div>
        ) : (
          <div>
            <h4>Editing Student</h4>
            <button
              className="go-back-button"
              onClick={() => setEditing(false)}
            >
              Go Back
            </button>
            <br />
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              id="studentName"
              defaultValue={student.studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <label htmlFor="description">Student Email Id</label>
            <input
              type="text"
              id="studentEmailId"
              defaultValue={student.studentEmailId}
              onChange={(e) => setStudentEmailId(e.target.value)}
            />
            <br />
            <button className="update-button" onClick={() => updateStudent()}>
              Update Student in Supabase DB
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
