// import Booking from '../models/Booking.js';
// import { asyncHandler } from '../middleware/errorHandler.js';

// const getPricing = (serviceType, duration) => {
//   const pricing = {
//     astrology: { 30: 1000, 60: 2000, 90: 2500 },
//     psychology: { 30: 800, 60: 1500, 90: 2000 },
//     spiritual: { 30: 900, 60: 1800, 90: 2500 },
//     moral: { 30: 600, 60: 1200, 90: 1800 },
//     testing: { 30: 1200, 60: 2500, 90: 3500 },
//     paranormal: { 30: 1000, 60: 2000, 90: 2800 },
//   };

//   return pricing[serviceType]?.[duration] || 0;
// };

// export const createBooking = asyncHandler(async (req, res) => {
//   const {
//     serviceType,
//     sessionDuration,
//     preferredDate,
//     preferredTime,
//     notes,
//   } = req.body;

//   if (!serviceType || !sessionDuration || !preferredDate || !preferredTime) {
//     return res.status(400).json({
//       success: false,
//       message: 'Please provide all required fields',
//     });
//   }

//   const price = getPricing(serviceType, sessionDuration);

//   const booking = await Booking.create({
//     user: req.user._id,
//     serviceType,
//     sessionDuration,
//     preferredDate,
//     preferredTime,
//     notes,
//     price,
//   });

//   res.status(201).json({
//     success: true,
//     message: 'Booking created successfully',
//     data: booking,
//   });
// });

// export const getBooking = asyncHandler(async (req, res) => {
//   const booking = await Booking.findById(req.params.id)
//     .populate('user', 'name email phone')
//     .populate('consultant', 'name email');

//   if (!booking) {
//     return res.status(404).json({
//       success: false,
//       message: 'Booking not found',
//     });
//   }

//   if (
//     booking.user._id.toString() !== req.user._id.toString() &&
//     req.user.role !== 'admin'
//   ) {
//     return res.status(403).json({
//       success: false,
//       message: 'Not authorized to view this booking',
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: booking,
//   });
// });

// export const getUserBookings = asyncHandler(async (req, res) => {
//   const bookings = await Booking.find({ user: req.user._id })
//     .populate('consultant', 'name email')
//     .sort({ createdAt: -1 });

//   res.status(200).json({
//     success: true,
//     data: bookings,
//   });
// });

// export const updateBookingStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;

//   if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid status',
//     });
//   }

//   const booking = await Booking.findByIdAndUpdate(
//     req.params.id,
//     { status },
//     { new: true }
//   );

//   if (!booking) {
//     return res.status(404).json({
//       success: false,
//       message: 'Booking not found',
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Booking updated successfully',
//     data: booking,
//   });
// });

// export const cancelBooking = asyncHandler(async (req, res) => {
//   const booking = await Booking.findById(req.params.id);

//   if (!booking) {
//     return res.status(404).json({
//       success: false,
//       message: 'Booking not found',
//     });
//   }

//   if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//     return res.status(403).json({
//       success: false,
//       message: 'Not authorized to cancel this booking',
//     });
//   }

//   booking.status = 'cancelled';
//   await booking.save();

//   res.status(200).json({
//     success: true,
//     message: 'Booking cancelled successfully',
//     data: booking,
//   });
// });


import Booking from "../models/Booking.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { sendEmail } from "../services/emailService.js";

const getPricing = (serviceType, duration) => {
  const pricing = {
    counselling:{
      30: 500, 
      60: 500,
    },
    astrology: {
      30: 500,
      60: 500,
    },

    psychology: {
      30: 500,
      60: 500,  
    },

    spiritual: {
      30: 500,
      60: 500,
    },

    moral: {
      30: 500,
      60: 500,
      90: 1800,
    },

    testing: {
      30: 500,
      60: 500,
    },

    paranormal: {
      30: 500,
      60: 500,
    },
  };

  return pricing[serviceType]?.[duration] || 0;
};


// =====================================================
// CREATE BOOKING - PUBLIC
// No login required
// =====================================================

export const createBooking = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    serviceType,
    sessionDuration,
    preferredDate,
    preferredTime,
    notes,
  } = req.body;


  if (
    !name ||
    !email ||
    !phone ||
    !serviceType ||
    !sessionDuration ||
    !preferredDate ||
    !preferredTime
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields.",
    });
  }


  // Basic email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }


  // Basic phone validation
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid 10-digit phone number.",
    });
  }


  const price = getPricing(
    serviceType,
    Number(sessionDuration)
  );


  const booking = await Booking.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),

    serviceType,

    sessionDuration:
      Number(sessionDuration),

    preferredDate,
    preferredTime,

    notes: notes || "",

    price,

    status: "pending",
  });


  // ---------------------------------------------------
  // Notify admin
  // ---------------------------------------------------

  try {
    await sendEmail({
      from: `"Dr. Amit Kumar Pushpam" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,

      subject: `New Booking Request - ${name}`,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto">

          <h2 style="color:#1E3A5F">
            New Session Booking
          </h2>

          <p>A new session booking has been submitted.</p>

          <hr/>

          <h3>Client Details</h3>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>

          <h3>Booking Details</h3>

          <p>
            <strong>Service:</strong>
            ${serviceType}
          </p>

          <p>
            <strong>Duration:</strong>
            ${sessionDuration} minutes
          </p>

          <p>
            <strong>Preferred Date:</strong>
            ${preferredDate}
          </p>

          <p>
            <strong>Preferred Time:</strong>
            ${preferredTime}
          </p>

          <p>
            <strong>Price:</strong>
            ₹${price}
          </p>

          ${
            notes
              ? `
                <p>
                  <strong>Notes:</strong>
                  ${notes}
                </p>
              `
              : ""
          }

          <hr/>

          <p style="color:#777">
            Please open the Admin Panel to review and confirm this booking.
          </p>

        </div>
      `,
    });

  } catch (error) {
    console.error(
      "Admin notification email failed:",
      error.message
    );
  }


  return res.status(201).json({
    success: true,

    message:
      "Your booking request has been submitted successfully. Our team will contact you shortly.",

    data: booking,
  });
});


// =====================================================
// GET ALL BOOKINGS - ADMIN
// =====================================================

export const getAllBookings = asyncHandler(
  async (req, res) => {

    const bookings =
      await Booking.find()
        .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  }
);


// =====================================================
// GET SINGLE BOOKING - ADMIN
// =====================================================

export const getBooking = asyncHandler(
  async (req, res) => {

    const booking =
      await Booking.findById(req.params.id);


    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }


    res.status(200).json({
      success: true,
      data: booking,
    });
  }
);


// =====================================================
// ADMIN CONFIRMS BOOKING
// =====================================================

export const confirmBooking = asyncHandler(
  async (req, res) => {
    const {
      confirmedDate,
      confirmedTime,
      meetingPlatform,
      meetingLink,
      adminNotes,
    } = req.body;

    if (!confirmedDate || !confirmedTime) {
      return res.status(400).json({
        success: false,
        message:
          "Confirmed date and time are required.",
      });
    }

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.confirmedDate = confirmedDate;
    booking.confirmedTime = confirmedTime;
    booking.meetingPlatform =
      meetingPlatform || "Google Meet";
    booking.meetingLink = meetingLink || "";
    booking.adminNotes = adminNotes || "";
    booking.status = "confirmed";

    await booking.save();

    /*
    ================================================
    SEND EMAIL TO CLIENT
    ================================================
    */

    try {
      await sendEmail({
        to: booking.email,

        subject:
          "Your Prosper Foundation Session is Confirmed",

        html: `
          <div style="
            font-family:Arial,sans-serif;
            max-width:650px;
            margin:auto;
            color:#333;
          ">

            <div style="
              background:#1E3A5F;
              color:white;
              padding:30px;
              text-align:center;
            ">

              <h1>
                Prosper Foundation
              </h1>

              <p>
                Session Confirmation
              </p>

            </div>

            <div style="padding:30px">

              <h2 style="color:#1E3A5F">
                Hello ${booking.name},
              </h2>

              <p>
                Your consultation session has been
                confirmed.
              </p>

              <div style="
                background:#f7f9fb;
                padding:20px;
                border-radius:10px;
                margin:25px 0;
              ">

                <p>
                  <strong>Service:</strong>
                  ${booking.serviceType}
                </p>

                <p>
                  <strong>Duration:</strong>
                  ${booking.sessionDuration} minutes
                </p>

                <p>
                  <strong>Date:</strong>
                  ${booking.confirmedDate}
                </p>

                <p>
                  <strong>Time:</strong>
                  ${booking.confirmedTime}
                </p>

                <p>
                  <strong>Platform:</strong>
                  ${booking.meetingPlatform}
                </p>

              </div>

              ${
                booking.meetingLink
                  ? `
                    <div style="
                      text-align:center;
                      margin:30px 0;
                    ">

                      <a
                        href="${booking.meetingLink}"
                        style="
                          display:inline-block;
                          background:#D4AF37;
                          color:white;
                          padding:14px 28px;
                          text-decoration:none;
                          border-radius:8px;
                          font-weight:bold;
                        "
                      >
                        Join Your Session
                      </a>

                    </div>
                  `
                  : ""
              }

              ${
                booking.adminNotes
                  ? `
                    <div style="
                      background:#fff8e6;
                      padding:15px;
                      border-radius:8px;
                    ">

                      <strong>
                        Message from Prosper Foundation
                      </strong>

                      <p>
                        ${booking.adminNotes}
                      </p>

                    </div>
                  `
                  : ""
              }

              <p>
                If you have any questions or need
                to reschedule, please contact us.
              </p>

              <p>
                Regards,<br/>
                <strong>
                  Prosper Foundation
                </strong>
              </p>

            </div>

          </div>
        `,
      });

      booking.confirmationSent = true;
      await booking.save();

    } catch (emailError) {

      console.error(
        "Client confirmation email failed:",
        emailError.message
      );

      // Booking stays confirmed even if email fails.
    }

    res.status(200).json({
      success: true,
      message:
        "Booking confirmed successfully.",
      data: booking,
    });
  }
);


// =====================================================
// UPDATE STATUS
// =====================================================

export const updateBookingStatus =
  asyncHandler(async (req, res) => {

    const { status } = req.body;


    const validStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];


    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }


    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,

        { status },

        {
          new: true,
          runValidators: true,
        }
      );


    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: booking,
    });

  });


// =====================================================
// DELETE BOOKING - ADMIN
// =====================================================

export const deleteBooking =
  asyncHandler(async (req, res) => {

    const booking =
      await Booking.findByIdAndDelete(
        req.params.id
      );


    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });

  });

 