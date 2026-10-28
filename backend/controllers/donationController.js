import Donation from "../models/Donation.js";

// ============================================
// CREATE DONATION RECORD
// ============================================

export const createDonation = async (
  req,
  res,
  next
) => {
  try {
    const {
      donorName,
      email,
      phone,
      amount,
    } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Donation amount is required",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Donation amount must be greater than zero",
      });
    }

    const donation = await Donation.create({
      donorName,
      email,
      phone,
      amount: Number(amount),
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Donation record created",
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// GET DONATION BY ID
// ============================================

export const getDonation = async (
  req,
  res,
  next
) => {
  try {
    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};