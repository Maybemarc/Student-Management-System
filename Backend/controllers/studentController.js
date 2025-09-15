import Student from "../models/studentsSchema.js";
import cloudinary from "../utils/cloudinaryConfig.js";

const uploadCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "students",
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

export const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      gender,
      email,
      phoneNumber,
      address,
      studentClass,
      rollNumber,
      guardian,
      year,
    } = req.body;

    if (
      !fullName ||
      !dob ||
      !gender ||
      !email ||
      !phoneNumber ||
      !address ||
      !studentClass ||
      !rollNumber ||
      !guardian ||
      !year
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const exist = await Student.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    let photoUrl = "";
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    if (req.file) {
      const uploadResult = await uploadCloudinary(req.file.buffer);
      photoUrl = uploadResult.secure_url;
    }

    const student = await Student.create({
      fullName,
      dob,
      gender,
      email,
      phoneNumber,
      address,
      studentClass,
      rollNumber,
      guardian,
      year,
      photo: photoUrl,
    });

    res.status(201).json({ message: "Student created", student });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const response = await Student.findById(req.params.id);
    if (!response)
      return res.status(400).json({
        message: "Student not found",
      });

    res.status(200).json({ student: response });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const response = await Student.findById(req.params.id);
    if (!response)
      return res.status(400).json({
        message: "Student not found",
      });

    const {
      fullName,
      dob,
      gender,
      email,
      phoneNumber,
      address,
      studentClass,
      rollNumber,
      guardian,
      year,
    } = req.body;

    response.fullName = fullName || response.fullName;
    response.dob = dob || response.dob;
    response.gender = gender || response.gender;
    response.email = email || response.email;
    response.phoneNumber = phoneNumber || response.phoneNumber;
    response.address = address || response.address;
    response.studentClass = studentClass || response.studentClass;
    response.rollNumber = rollNumber || response.rollNumber;
    response.guardian = guardian || response.guardian;
    response.year = year || response.year;

    if (req.file) {
      const uploadResult = await uploadCloudinary(req.file.buffer);
      response.photo = uploadResult.secure_url;
    }

    await response.save();

    res
      .status(200)
      .json({ message: "Student updated Successfully", student: response });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.id);
    if (!response)
      return res.status(400).json({
        message: "Student not found",
      });

    res.status(200).json({ message: "Student removed Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const { name, rollNumber, studentClass, page = 1, limit = 10 } = req.query;

    const query = {};
    if (name) query.fullName = { $regex: name, $options: "i" };
    if (rollNumber) query.rollNumber = rollNumber;
    if (studentClass) query.studentClass = { $regex: studentClass, $options: "i" };

    const skip = (page - 1) * limit;

    const response = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Student.countDocuments(query);

    if(!total){
      return res.status(400).json({message:"No student found"})
    }

    res.status(200).json({
      message: "Data Found",
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      students: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getStudentSUmmary = async (req, res) => {
  try {
    const summary = await Student.aggregate([
      {
        $group: {
          _id: "$year",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const labels = summary.map((item) => item._id);
    const counts = summary.map((item) => item.count);

    res.status(200).json({ labels, counts, summary });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
