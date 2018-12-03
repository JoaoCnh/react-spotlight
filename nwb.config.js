const path = require("path");

module.exports = {
  type: "react-app",
  webpack: {
    aliases: {
      utils: path.resolve(path.join("src", "utils")),
      components: path.resolve(path.join("src", "components"))
    }
  }
};
