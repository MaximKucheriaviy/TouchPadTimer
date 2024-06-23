module.exports = (callback) => {
  return async (event, data) => {
    try {
      const result = await callback(data);
      return JSON.stringify(result);
    } catch (err) {
      return JSON.stringify(null);
    }
  };
};
