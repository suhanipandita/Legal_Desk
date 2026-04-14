import Case from '../models/Case.js';

export const createCase = async (req, res) => {
  try {
    const newCase = await Case.create({ ...req.body, lawyerId: req.user.id });
    res.status(201).json(newCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCases = async (req, res) => {
  try {
    // Lawyers see their cases, Admins see all, Clients see theirs
    let query = {};
    if (req.user.role === 'Lawyer') query.lawyerId = req.user.id;
    if (req.user.role === 'Client') query.clientId = req.user.id;
    
    const cases = await Case.find(query).populate('clientId lawyerId', 'name email');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};