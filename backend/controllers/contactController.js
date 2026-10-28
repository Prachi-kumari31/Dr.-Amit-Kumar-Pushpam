import Contact from '../models/Contact.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Contact message sent successfully',
    data: contact,
  });
});

export const getContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  let query = {};

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(query)
    .populate('repliedBy', 'name email')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Contact.countDocuments(query);
  const pages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    data: contacts,
    pagination: {
      total,
      pages,
      currentPage: parseInt(page),
    },
  });
});

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id).populate(
    'repliedBy',
    'name email'
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found',
    });
  }

  contact.status = 'read';
  await contact.save();

  res.status(200).json({
    success: true,
    data: contact,
  });
});

export const replyContact = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  if (!reply) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a reply',
    });
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      reply,
      repliedBy: req.user._id,
      repliedAt: new Date(),
      status: 'replied',
    },
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Reply sent successfully',
    data: contact,
  });
});