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
        message: "Eamil Already Exists",
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


export const getStudent = async (req,res) => {
  try {
    const response = await Student.findById(req.params.id)
    if(!response)  return res.status(400).json({
      message: "Student not found",
    });

    res.status(200).json({student:response})

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}


export const deleteStudent = async(req ,res) => {
  try {
    const response = await Student.findById(req.params.id)
    if(!response)  return res.status(400).json({
      message: "Student not foundr",
    });

    res.status(200).json({message:"Student removed Successfully"})

  } catch (error) {
     return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }

}