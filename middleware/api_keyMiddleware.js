const { api_key } = require("../models");
const checkAPI = async (req, res, next) => {
  const APIKey = req.headers["x-api-key"];

  if (!APIKey) {
    return res.status(401).json({ message: "API Key required" });
  }

  const existing_APIKey = await api_key.findOne({
    where: {
      api_key: APIKey,
    },
  });

  if (!existing_APIKey) {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  req.apiUser = existing_APIKey;
  next();
};

module.exports = { checkAPI };
