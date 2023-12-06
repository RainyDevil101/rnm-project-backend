export const getQueryOptions = (headers, commonConfig) => {
  try {
    if (!headers) {
      throw new Error("headers are required");
    }

    if (headers["account-id"]) {
      const accountId = headers["account-id"];
      return {
        ...commonConfig,
        where: {
          ...commonConfig.where,
          account_id: accountId
        }
      };
    } else {
      return commonConfig;
    }
  } catch (error) {
    throw new Error(`Error in getQueryOptions: ${error.message}`);
  }
};