import Student from "../model/StudentsSchema.js";
import StudentTest from "../model/StudentTestSchema.js";

const addStudentsTest = async (req, res) => {
  console.log("addtest", req.body);

  req.body.forEach( async (element) => {
    console.log("student id", element.student_id);
    
    try {
      const student_id = element.student_id; 
      const student_name = element.student_name;
      const student_standard = element.student_standard;
      const student_section = element.student_section;
  
      const test_subject = element.test_subject;
      const test_chapter = element.test_chapter;
      const test_date = element.test_date;
      const test_marks_obtained = element.marks_obtained;
      const test_marks = element.marks;
  
      const userExistStudent = await Student.findOne({ _id: student_id });
      const userExistStudentTest = await StudentTest.findOne({
        student_id: student_id,
      });
  
      if (!userExistStudent) {
        return res.status(200).json({ message: "no student exists create one" });
      }
  
      if (userExistStudentTest) {
        console.log("student at student test exists");
  
        // if studentFees exists then we will add the test inside the array of it
        const updateTest = await StudentTest.updateOne(
          { student_id: student_id },
          {
            $push: {
              tests: {
                  test_subject: test_subject,
                  test_chapter: test_chapter,
                  test_date: test_date,
                  test_marks_obtained: test_marks_obtained,
                  test_marks: test_marks,
              },
            },
          }
        );
        console.log("updateTest", updateTest);
        console.log('message: "studenttest updated successfully"');
  
        // return res
        //   .status(200)
        //   .json({ message: "studenttest updated successfully" });
      } else {
        // if student field collection is not found then create one and then later update it later
        const newStudentTest = new StudentTest({
          student_id: student_id,
          student_name: student_name,
          student_standard: student_standard,
          student_section: student_section
        });
        await newStudentTest.save();
        console.log("new Studenttest added successfully", newStudentTest);
  
        // if studentFees not exists then after creating it we will add the attendence inside the array of it
        const updateTest = await StudentTest.updateOne(
          { student_id: student_id },
          {
            $push: {
              tests: {
                  test_subject: test_subject,
                  test_chapter: test_chapter,
                  test_date: test_date,
                  test_marks_obtained: test_marks_obtained,
                  test_marks: test_marks,
              },
            },
          }
        );
        console.log("updateTest", updateTest);
  
        
        console.log('message: "studenttest added & updated successfully"');
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    }
  });
  return res
    .status(200)
    .json({ message: "studenttest added & updated successfully" });

};

const getStudentsTest = async (req, res) => {
  try {
    const allStudentsTest = await StudentTest.find({});
    return res.status(200).json(allStudentsTest);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getStudentTest = async (req, res) => {
  console.log("get a student test", req.body);

  try {
    const studentTest = await StudentTest.find({
      student_id: req.body.student_id,
    });
    return res.status(200).json(studentTest);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}; 

const editStudentTest = async (req, res) => {
  try {
    console.log("edit test", req.body);

    const student_id = req.body.student_id; 
    const _id = req.body._id; 
    const test_marks_obtained = req.body.marks_obtained;
    const test_marks = req.body.marks;
    const test_subject = req.body.subject;
    const test_chapter = req.body.chapter;
    const test_date = req.body.date;

    const updateinstallment = await StudentTest.updateOne(
      { student_id: student_id, "tests._id": _id },
      {
        $set: {
          "tests.$": {
            _id: _id,
            test_marks_obtained: test_marks_obtained,
            test_marks: test_marks,
            test_chapter: test_chapter,
            test_subject: test_subject,
            test_date: test_date,
          },
        },
      }
    );

    console.log("updateInstallment", updateinstallment);

    return res.status(200).json({ message: "student updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteInstallment = async (req, res) => {
  try {
    console.log("delete installment", req.body);

    const student_id = req.body.student_id;
    const _id = req.body._id;

    const deleteinstallment = await StudentFees.updateOne(
      { student_id: student_id },
      {
        $pull: { fees: { _id: _id } },
      }
    );

    console.log("deleteInstallment", deleteinstallment);

    return res.status(200).json({ message: "student deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteTest = async (req, res) => {

  try {
    console.log("delete test", req.body);

    const test_date = req.body.test_date;

    const deletetest = await StudentTest.updateMany(
      {  },
      { $pull: { tests: { test_date: test_date} } }
    );
    console.log("deletetest", deletetest);

    return res.status(200).json({ message: "test deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const getFilteredTests = async (req, res) => {
  try {
    console.log("getStudent tests filtered data", req.body);

    const filteredTests = await StudentTest.find({
        $and: [
            { student_standard: req.body.standard },
            { student_section: req.body.section }
         ]
    });
    console.log("getfilterd test data", filteredTests);
    return res.status(200).json(filteredTests);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { addStudentsTest, getStudentsTest, getStudentTest, editStudentTest, deleteTest, getFilteredTests };

// http://localhost:5000/studentstest/addstudentstest

// {
// 	"student_id" : "63fef27b93058f24eb0a32c3",
//     "student_name" : "Rahul",
    // "student_standard" : "11",
    // "student_section" : "B",
//     "test_subject" : "English",
//     "test_chapter" : "thermodynamics",
//     "test_date" : "11-12-45",
//     "test_marks_obtained" : 20,
//     "test_attendence" : "P",
//     "test_marks" : 20
// }