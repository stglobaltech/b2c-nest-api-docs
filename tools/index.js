const CleanIDs = require("./clean-ids");

console.log("📁 Running API DOCS > Tools");

const COLLECTIONS = [
  "TmT Demo APIs",

  // Add any new API collection here
  // "TmT NestGEN APIs",
  // "TmT Legacy APIs",
];

const ENVIRONMENTS = [
  "TmT Demo",

  // Add new ENV names here
  // "TmT Local",
  // "TmT Dev",
];

Promise.all(
  COLLECTIONS.map((fileName) =>
    CleanIDs.cleanField({ fileName, type: "COLLECTION" })
  )
)
  .then((statuses) =>
    statuses.map((s) => console.log("✅ status:", "CleanIDs.cleanField", s))
  )
  .catch((err) => console.error("❌ err:", "CleanIDs.cleanField", err));

Promise.all(
  ENVIRONMENTS.map((fileName) =>
    CleanIDs.cleanField({ fileName, type: "ENVIRONMENT" })
  )
)
  .then((statuses) =>
    statuses.map((s) => console.log("✅ status:", "CleanIDs.cleanField", s))
  )
  .catch((err) => console.error("❌ err:", "CleanIDs.cleanField", err));

module.exports = {
  CleanIDs,
};
