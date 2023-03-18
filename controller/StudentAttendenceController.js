import StudentAttendence from "../model/StudentAttendenceSchema.js";


const getAttendence = async (req, res) => {
  try {
    const attendenceSheet = await StudentAttendence.find({});
    return res.status(200).json(attendenceSheet);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
const addAttendence = async (req, res) => {

  let i = 0;

  try {

    console.log("edit installment", req.body.filter);
    console.log("edit installment", req.body.post);
    console.log("edit installment", req.body.upattendence);
    var attendenceSheet
    console.log()
    var query = "students.$.month." + req.body.filter[2] + ".attendences." + parseInt(req.body.filter[4] - 1) + ".status";

    req.body.upattendence.map(async (resp,j) => {
      // console.log("this is resp",resp)
      // console.log("value of i ",j);
      attendenceSheet = await StudentAttendence.updateOne(
        { "students.studentid": resp.studentid, class: req.body.filter[0], year: req.body.filter[3], batch: req.body.filter[1] },


        {
          $set: {
            [query]: req.body.post[j].status

          }
        }
      );
      i++;
    })

    console.log(attendenceSheet);
    return res.status(200).json(attendenceSheet);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
const deleteAttendence = async (req, res) => {

  let i = 0;

  try {

    console.log("edit installment", req.body.filter);
    // console.log("edit installment", req.body.post);
    console.log("edit installment", req.body.upattendence);
    var attendenceSheet
    console.log()
    var query = "students.$.month." + req.body.filter[2] + ".attendences." + parseInt(req.body.filter[4] - 1) + ".status";

    req.body.upattendence.map(async (resp,j) => {
      // console.log("this is resp",resp)
      console.log(query);
      attendenceSheet = await StudentAttendence.updateOne(
        { "students.studentid": resp.studentid, class: req.body.filter[0], year: req.body.filter[3], batch: req.body.filter[1] },


        {
          $set: {
            [query]: ""

          }
        }
      );
      i++;
    })

    console.log(attendenceSheet);
    return res.status(200).json(attendenceSheet);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};


export default {}
export { getAttendence, addAttendence ,deleteAttendence};
