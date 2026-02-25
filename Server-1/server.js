const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const students = [
  { id: 1, name: "Aarav Sharma", branch: "CSE", semester: 8, cgpa: 9.3 },
  { id: 2, name: "Ishita Verma", branch: "IT", semester: 7, cgpa: 8.9 },
  { id: 3, name: "Rohan Kulkarni", branch: "ECE", semester: 6, cgpa: 8.4 },
  { id: 4, name: "Meera Iyer", branch: "CSE", semester: 8, cgpa: 9.1 },
  { id: 5, name: "Kunal Deshmukh", branch: "IT", semester: 5, cgpa: 7.8 },
  { id: 6, name: "Ananya Reddy", branch: "CSE", semester: 6, cgpa: 8.7 },
  { id: 7, name: "Vikram Patil", branch: "ECE", semester: 7, cgpa: 8.2 },
  { id: 8, name: "Priyanka Nair", branch: "AI", semester: 4, cgpa: 8.8 },
  { id: 9, name: "Harsh Mehta", branch: "Data Science", semester: 5, cgpa: 8.0 },
  { id: 10, name: "Neha Gupta", branch: "CSE", semester: 6, cgpa: 7.9 }
];

app.get("/students", (req, res) => {
  res.status(200).json(students);
});

app.get("/students/topper", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  let topper = students[0];

  for (let i = 1; i < students.length; i++) {
    if (students[i].cgpa > topper.cgpa) {
      topper = students[i];
    }
  }

  res.status(200).json(topper);
});


app.get("/students/average", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  let total = 0;

  for (let i = 0; i < students.length; i++) {
    total += students[i].cgpa;
  }

  const average = (total / students.length).toFixed(2);

  res.status(200).json({
    averageCGPA: Number(average)
  });
});



app.get("/students/count", (req, res) => {
  res.status(200).json({
    totalStudents: students.length
  });
});


app.get("/students/branch/:branchName", (req, res) => {
  const branchName = req.params.branchName.toLowerCase();

  const filteredStudents = students.filter(
    s => s.branch.toLowerCase() === branchName
  );

  res.status(200).json(filteredStudents);
});


app.get("/students/semester4", (req, res) => {
  const filteredStudents = students.filter(
    student => student.semester === 4
  );

  res.status(200).json(filteredStudents);
});

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});