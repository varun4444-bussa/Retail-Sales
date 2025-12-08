import Sample from "../models/Sample.model.js";

export const createSample = async (data) => {
  const sample = new Sample(data);
  return await sample.save();
};

export const getSamples = async (page = 1, limit = 1000) => {
  // Fetch paginated data from retail_db database
  // Pagination support to prevent memory issues with very large datasets
  // Using lean() for better performance - returns plain JS objects
  try {
    const skip = (page - 1) * limit;
    
    // Get total count and paginated data from retail_db
    const [total, samples] = await Promise.all([
      Sample.countDocuments(), // Count from retail_db.transactions collection
      Sample.find() // Query retail_db.transactions collection
        .skip(skip)
        .limit(limit)
        .lean()
        .maxTimeMS(30000) // 30 second timeout
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: samples,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error in getSamples:', error);
    throw error;
  }
};

// Helper function to get all samples from retail_db in chunks (for initial load)
export const getAllSamples = async (chunkSize = 5000) => {
  try {
    const total = await Sample.countDocuments(); // Count from retail_db.transactions
    const allSamples = [];
    const totalChunks = Math.ceil(total / chunkSize);
    
    console.log(`Fetching ${total} records from retail_db in ${totalChunks} chunks of ${chunkSize}`);
    
    for (let page = 1; page <= totalChunks; page++) {
      const result = await getSamples(page, chunkSize);
      allSamples.push(...result.data);
      console.log(`Fetched chunk ${page}/${totalChunks} (${result.data.length} records)`);
    }
    
    return allSamples;
  } catch (error) {
    console.error('Error in getAllSamples:', error);
    throw error;
  }
};

export const updateSample = async (id, data) => {
  return await Sample.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSample = async (id) => {
  return await Sample.findByIdAndDelete(id);
};
