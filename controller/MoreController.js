import Standard from "../model/StudentStandard.js";
import Section from "../model/StudentSection.js";

const getStandards = async (req, res) => {
  try {
    const allStandard = await Standard.find({});
    return res.status(200).json(allStandard);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addStandard = async (req, res) => {
  try {
    console.log("addstandard", req.body);

    const newStandard = new Standard(req.body);
    await newStandard.save();

    return res.status(200).json(newStandard);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const addSection = async (req, res) => {
  try {
    console.log("addsection", req.body);
    const standard = req.body.standard;
    const section = req.body.section;
    const description = req.body.description;
    const startyear = req.body.startyear;
    const endyear = req.body.endyear;

    const StandardExists = await Standard.findOne({
      standard: standard,
      startyear: startyear,
      endyear: endyear,
    });

    const SectionExists = await Section.findOne({
      standard: standard,
      startyear: startyear,
      endyear: endyear,
    });

    if (!StandardExists) {
      return res.status(200).json({ message: "no standard exists create one" });
    } else if (!SectionExists) {
      const newSection = new Section({
        standard: standard,
        startyear: startyear,
        endyear: endyear,
      });
      await newSection.save();

      const updateSection = await Section.updateOne(
        { standard: standard, startyear: startyear, endyear: endyear },
        {
          $push: {
            batches: {
              standard: standard,
              section: section,
              description: description,
              startyear: startyear,
              endyear: endyear,
            },
          },
        }
      );
      console.log("updateSection", updateSection);

      return res
        .status(200)
        .json({ message: "section added & updated successfully" });
    } else {
      console.log("standard exists");

      const updateSection = await Section.updateOne(
        { standard: standard, startyear: startyear, endyear: endyear },
        {
          $push: {
            batches: {
              standard: standard,
              section: section,
              description: description,
              startyear: startyear,
              endyear: endyear,
            },
          },
        }
      );
      console.log("updateSection", updateSection);

      return res.status(200).json({ message: "section updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getSections = async (req, res) => {
  try {
    const allSections = await Section.find({});
    return res.status(200).json(allSections);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getDistinctSections = async (req, res) => {
  try {
    const allSections = await Section.find({});
    return res.status(200).json(allSections);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}; 

const getDistinctStandards = async (req, res) => {
  try {
    const allStandard = await Standard.find({}).distinct("standard");
    return res.status(200).json(allStandard);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { getStandards, addStandard, addSection, getSections, getDistinctSections, getDistinctStandards };
