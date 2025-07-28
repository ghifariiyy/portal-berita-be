const { DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./User");

const News = db.define("news", {
  title: DataTypes.STRING,
  image: DataTypes.STRING,
  category: DataTypes.STRING,
  content: DataTypes.TEXT,
  quickAccess: DataTypes.STRING,   
  trending: DataTypes.STRING,    
  authorId: DataTypes.INTEGER
}, {
  timestamps: true
});

User.hasMany(News, { foreignKey: "authorId" });
News.belongsTo(User, { foreignKey: "authorId" });

module.exports = News;
