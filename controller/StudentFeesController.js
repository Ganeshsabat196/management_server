import StudentFees from "../model/StudentFeesSchema.js";
import Student from "../model/StudentsSchema.js";

const addStudentsFees = async (req, res) => {
  try {
    console.log("addfees", req.body);
    const student_id = req.body.student_id;
    const student_name = req.body.student_name;
    const fees_amount = req.body.fees_amount;
    const fees_type = req.body.fees_type;
    const payment_date = req.body.payment_date;

    const userExistStudent = await Student.findOne({ _id: student_id });
    const userExistStudentFees = await StudentFees.findOne({
      student_id: student_id,
    });

    if (!userExistStudent) {
      return res.status(200).json({ message: "no student exists create one" });
    }

    if (userExistStudentFees) {
      console.log("student at student fees exists");

      // if studentFees exists then we will add the attendence inside the array of it
      const updateinstallment = await StudentFees.updateOne(
        { student_id: student_id },
        {
          $push: {
            fees: {
              fees_amount: fees_amount,
              fees_type: fees_type,
              payment_date: payment_date,
            },
          },
        }
      );
      console.log("updateInstallment", updateinstallment);

      return res
        .status(200)
        .json({ message: "studentfees updated successfully" });
    } else {
      // if student field collection is not found then create one and then later update it later
      const newStudentFees = new StudentFees({
        student_id: student_id,
        student_name: student_name,
      });
      await newStudentFees.save();
      console.log("new Studentfees added successfully", newStudentFees);

      // if studentFees not exists then after creating it we will add the attendence inside the array of it
      const updateinstallment = await StudentFees.updateOne(
        { student_id: student_id },
        {
          $push: {
            fees: {
              fees_amount: fees_amount,
              fees_type: fees_type,
              payment_date: payment_date,
            },
          },
        }
      );
      console.log("updateInstallment", updateinstallment);

      return res
        .status(200)
        .json({ message: "studentfees added & updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getStudentsFees = async (req, res) => {
  try {
    const allStudentsFees = await StudentFees.find({});
    return res.status(200).json(allStudentsFees);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getStudentFees = async (req, res) => {
  console.log("get a student fees", req.body);

  try {
    const studentFees = await StudentFees.find({
      student_id: req.body.student_id,
    });
    return res.status(200).json(studentFees);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// installment
const editInstallment = async (req, res) => {
  try {
    console.log("edit installment", req.body);

    const student_id = req.body.student_id;
    const _id = req.body._id;
    const fees_amount = req.body.fees_amount;
    const fees_type = req.body.fees_type;
    const payment_date = req.body.payment_date;
    const entrydate = req.body.entrydate;

    const updateinstallment = await StudentFees.updateOne(
      { student_id: student_id, "fees._id": _id },
      {
        $set: {
          "fees.$": {
            _id: _id,
            fees_amount: fees_amount,
            fees_type: fees_type,
            payment_date: payment_date,
            entrydate: entrydate,
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
        $pull: { "fees": { "_id": _id } }
      }
    );

    console.log("deleteInstallment", deleteinstallment);

    return res.status(200).json({ message: "student deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {
  getStudentsFees,
  addStudentsFees,
  deleteInstallment,
  getStudentFees,
  editInstallment,
};
