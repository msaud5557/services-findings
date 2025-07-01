import { NextResponse } from "next/server";
import formidable from "formidable";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import UserModel from "@/models/UserModel";
import Joi from "joi";
import UploadManager from "@/app/utils/UploadManager";


// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().trim().required().messages({
    "string.empty": "Please enter your phone number",
  }),
  trade: Joi.string().required(),
  experience: Joi.string().required(),
  shortBio: Joi.string().required(),
  serviceArea: Joi.string().required(),
  zipCode: Joi.number().required(),
  availability: Joi.string().required(),
  hourlyRate: Joi.string().optional(),
});

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const buffer = Buffer.from(await request.arrayBuffer());

    // Fake Node request object
    const stream = Readable.from(buffer);
    stream.headers = Object.fromEntries(request.headers);
    stream.method = request.method;
    stream.url = request.url;
    stream.socket = {};

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      multiples: true,
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(stream, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const flattenedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    );

    const { error } = schema.validate(flattenedFields);
    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    const {
      name,
      email,
      password,
      phone,
      trade,
      shortBio,
      experience,
      serviceArea,
      zipCode,
      availability,
      hourlyRate,
    } = flattenedFields;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // File upload handling with Promise.all
    let profilePicture = "";
    let idFrontImageUrl = "";
    let idBackImageUrl = "";
    let certification = "";

    const uploadPromises = [];

    if (files.profilePicture) {
      const filePath = files.profilePicture[0].filepath;
      uploadPromises.push(
        UploadManager.upload({
          key: `pictures`,
          fileReference: filePath,
          contentType: "image",
          fileName: files.profilePicture[0].originalFilename,
          shouldChangeFileName: false,
        }).then((res) => {
          profilePicture = res.Location;
        })
      );
    }

    if (files.idFrontImage) {
      const filePath = files.idFrontImage[0].filepath;
      uploadPromises.push(
        UploadManager.upload({
          key: `documents`,
          fileReference: filePath,
          contentType: "image",
          fileName: files.idFrontImage[0].originalFilename,
          shouldChangeFileName: false,
        }).then((res) => {
          idFrontImageUrl = res.Location;
        })
      );
    } else {
      return NextResponse.json({ error: "Front ID image is required" }, { status: 400 });
    }

    if (files.idBackImage) {
      const filePath = files.idBackImage[0].filepath;
      uploadPromises.push(
        UploadManager.upload({
          key: `documents`,
          fileReference: filePath,
          contentType: "image",
          fileName: files.idBackImage[0].originalFilename,
          shouldChangeFileName: false,
        }).then((res) => {
          idBackImageUrl = res.Location;
        })
      );
    } else {
      return NextResponse.json({ error: "Back ID image is required" }, { status: 400 });
    }

      if (files.certification) {
        console.log("files.certification=======", files.certification);
        
      const filePath = files.certification[0].filepath;
      const certificationUpload = await UploadManager.upload({
        key: `documents`,
        fileReference: filePath,
        contentType: "image",
        fileName: files.certification[0].originalFilename,
        shouldChangeFileName: false,
      });

      certification = certificationUpload.Location;
      console.log("certification=========================", certification);
      
    }

    // Run all uploads in parallel
    await Promise.all(uploadPromises);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      profilePicture,
      phone,
      trade,
      shortBio,
      experience,
      serviceArea,
      zipCode,
      availability,
      hourlyRate,
      idFrontImage: idFrontImageUrl,
      idBackImage: idBackImageUrl,
      certification
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
