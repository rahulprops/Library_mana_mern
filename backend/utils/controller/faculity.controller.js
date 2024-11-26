import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import faculityModal from "../modal/faculity.modal.js";
import multer from "multer";
import handleError from "../middlerare/error_logs/handleError.js";
import path from "path";
import adminModal from "../modal/admin.modal.js";
import mongoose from "mongoose";

const facuDir = path.join("public/faculity/");
const facStore = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, facuDir);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});
export const faculityMulter = multer({ storage: facStore });
//! create faculity controller

export const createFaculity = async (req, res) => {
  const Id = req.params.Id;

  const { faculityName, faculityEmail, faculityPhone, faculityPassword } =
    req.body;
  // console.log(faculityEmail)
  const faculityPhoto = req.file;
  if (!faculityPhoto) {
    return handleError(res, 400, "please enter photo");
  }
  //  console.log(faculityPhoto.filename)
  if (!faculityName || !faculityEmail || !faculityPhone || !faculityPassword) {
    return handleError(res, 400, "all feilds required ");
  }

  // console.log(Id)
  try {
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return handleError(res, 400, "please enter validkey");
    }
    const checkAdmin = await adminModal.findById(Id);
    // console.log(checkAdmin)
    if (!checkAdmin) {
      return handleError(res, 400, "please enter currect key");
    }
    // console.log("20");
    const faculityfindEmail = await faculityModal.findOne({
      faculityEmail: faculityEmail,
    });
    if (faculityfindEmail) {
      return handleError(res, 400, "email already exits");
    }
    const hashPass = await bcrypt.hash(faculityPassword, 12);
    // console.log(hashPass)
    const createFaculity = new faculityModal({
      faculityName: faculityName,
      faculityEmail: faculityEmail,
      faculityPassword: hashPass,
      faculityPhoto: faculityPhoto.filename,
      AdminId: Id,
    });
    if (createFaculity) {
      const faculityCreate = await createFaculity.save();
      return handleError(res, 400, "create sucessful", faculityCreate);
    } else {
      return handleError(res, 400, "faculity create failed ");
    }
  } catch (err) {
    return handleError(res, 500, `server error ${err}`);
  }
};

export const loginFaculity = async (req, res) => {
    const { faculityEmail, FaculityPassword } = req.body;

    if (!faculityEmail || !FaculityPassword) {
        return handleError(res, 400, "All fields are required");
    }

    try {
        // Check if email exists
        const checkEmail = await faculityModal.findOne({ faculityEmail: faculityEmail });
        if (!checkEmail) {
            return handleError(res, 400, "Email does not exist"); // Add return here
        }

        // Compare passwords
        const comparePass = await bcrypt.compare(FaculityPassword, checkEmail.faculityPassword);
        if (comparePass) {
            return handleError(res, 200, "Login successful", checkEmail); // Add return here
        } else {
            return handleError(res, 400, "Invalid password"); // Add return here
        }
    } catch (err) {
        // Handle server errors
        return handleError(res, 500, `Server error: ${err.message}`); // Add return here
    }
};
