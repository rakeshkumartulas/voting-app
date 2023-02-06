'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionslist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Questionslist.belongsTo(models.Elections, {
        foreignKey: "electionId",
      });
// add values database
//static Add_Election(ele_Name,logged_user) {
//  return this.create({name:ele_Name,userId:logged_user,start: false,end: false, });
//}

      // define association here
    }
    static addquestionnaire(title, details, electionId) {
      return this.create({title:title,details:details,
        electionId,
      });
    }
  }
  Questionslist.init({
    title: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Questionslist',
  });
  return Questionslist;
};