export const getCommonConfig = (user_id, limit, from) => {
  try {
    if (!user_id) {
      throw new Error("user_id is required");
    }

    const commonConfig = {
      where: {
        user_id,
        status: true
      },
      offset: (from - 1) * limit,
      limit: Number(limit)
    };

    if (!limit && !from) {
      delete commonConfig.offset;
      delete commonConfig.limit;
    }

    return commonConfig;
  } catch (error) {
    throw new Error(`Error in getCommonConfig: ${error.message}`);
  }
};