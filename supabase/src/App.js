import { useState, useEffect } from "react";
import StudentCard from "./components/StudentCard";
import { supabase } from "./utils/SupabaseClient";
import "./App.css";

export default function App() {
  const [studentName, setStudentName] = useState("");
  const [studentEmailId, setStudentEmailId] = useState("");
  const [students, setStudents] = useState([]);

  async function addStudent() {
    try {
      const { data, error } = await supabase
        .from("students")
        .insert({
          studentName: studentName,
          studentEmailId: studentEmailId,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function getStudents() {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .limit(10);

      if (error) throw error;

      if (data != null) {
        setStudents(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <header>
        <div className="header-container">
          <h3>Store Students</h3>
        </div>
      </header>

      <h3>Add students Data to the Supabase Database</h3>

      <div className="create-student-container">
        <div>
          <label>Student Name</label>
          <input
            type="text"
            id="studentName"
            onChange={(e) => setStudentName(e.target.value)}
          />
          <label>Student Email Id</label>
          <input
            type="text"
            id="studentEmailId"
            onChange={(e) => setStudentEmailId(e.target.value)}
          />
          <br />
          <button onClick={() => addStudent()}>Add Student</button>
        </div>
      </div>
      <hr />

      <h3>Current Students in the Database</h3>

      <div className="student-list-container">
        {students.map((student) => (
          <div key={student.studentId}>
            <StudentCard student={student} />
          </div>
        ))}
      </div>
    </>
  );
}
