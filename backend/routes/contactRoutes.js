import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();


// =========================================================
// CREATE CONTACT ENQUIRY
// =========================================================

router.post("/", async (req, res) => {
  try {

    const {
      name,
      phone,
      email,
      subject,
      message,
    } = req.body;


    // Validation
    if (
      !name ||
      !phone ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }


    const contact = await Contact.create({
      name,
      phone,
      email,
      subject,
      message,
    });


    return res.status(201).json({
      success: true,
      message:
        "Your enquiry has been submitted successfully.",
      enquiry: contact,
    });

  } catch (error) {

    console.error(
      "Contact submission error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to submit your enquiry.",
    });
  }
});


// =========================================================
// GET ALL ENQUIRIES
// =========================================================

router.get("/", async (req, res) => {

  try {

    const enquiries =
      await Contact.find()
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      enquiries,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Unable to fetch enquiries.",
    });
  }

});


// =========================================================
// UPDATE ENQUIRY STATUS
// =========================================================

router.patch("/:id", async (req, res) => {

  try {

    const {
      status,
      adminNote,
    } = req.body;


    const enquiry =
      await Contact.findByIdAndUpdate(
        req.params.id,
        {
          ...(status && { status }),
          ...(adminNote !== undefined && {
            adminNote,
          }),
        },
        {
          new: true,
        }
      );


    if (!enquiry) {

      return res.status(404).json({
        message:
          "Enquiry not found.",
      });

    }


    res.json({
      success: true,
      enquiry,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Unable to update enquiry.",
    });
  }

});


export default router;