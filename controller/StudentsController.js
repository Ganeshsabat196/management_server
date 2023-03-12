// model -- StudentSchema
import Student from "../model/StudentsSchema.js";

const addStudent = async (req, res) => {
  try {
    console.log("addstudent", req.body, req.file.filename);

    const data = {
      profile: req.file.filename,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      dateofbirth: req.body.dateofbirth,
      email: req.body.email,
      standard: req.body.standard,
      section: req.body.section,
      phone: req.body.phone,
    };

    const newStudent = new Student(data);
    await newStudent.save();

    return res.status(200).json(newStudent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    return res.status(200).json(allStudents);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getStudent = async (req, res) => {
  try {
    console.log("getStudent data", req.body);

    const singleStudents = await Student.find({ _id: req.body._id });
    return res.status(200).json(singleStudents);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getFilteredStudent = async (req, res) => {
  try {
    console.log("getStudent filtered data", req.body);

    const filteredStudents = await Student.find({
      $and: [{ standard: req.body.standard }, { section: req.body.section }],
    });
    console.log("getfilterddata", filteredStudents);
    return res.status(200).json(filteredStudents);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editStudent = async (req, res) => {
  try {
    console.log("editStudent", req.body);

    const updatedStudent = await Student.findByIdAndUpdate(
      req.body._id,
      req.body
    );
    console.log("Student updated", updatedStudent);
    return res.status(200).json({ message: "student updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    console.log("deleteStudent", req.body);

    const deletedStudent = await Student.findByIdAndDelete(req.body._id);
    console.log("Student deleted", deletedStudent);
    return res.status(200).json({ message: "student deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  getStudent,
  getStudents,
  getFilteredStudent,
  addStudent,
  editStudent,
  deleteStudent,
};
