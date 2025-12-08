import {
  createSample,
  getSamples,
  getAllSamples,
  updateSample,
  deleteSample
} from "../services/sample.service.js";
import Sample from "../models/Sample.model.js";

export const create = async (req, res) => {
  try {
    const sample = await createSample(req.body);
    res.status(201).json(sample);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;

    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Sample.countDocuments();

    // Paginated results
    const data = await Sample.find()
      .skip(skip)
      .limit(limit);

    res.json({
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const update = async (req, res) => {
  try {
    const updated = await updateSample(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteSample(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
