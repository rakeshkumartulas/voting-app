'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Elections extends Model {


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Elections.belongsTo(models.User, {
        foreignKey: "userId",
      });
     
      Elections.hasMany(models.Questionslist, {
        foreignKey: "electionId",
      });
      Elections.hasMany(models.voters, {
        foreignKey: "electionId",
      });

      // define association here
    }
    static async findAllElectionOfUser(userId)
    {
      return this.findAll({where:{userId}});
    }



    // Add_Election define this method here

    static Add_Election(ele_Name,logged_user) {
      return this.create({name:ele_Name,userId:logged_user,start: false,end: false, });
    }
  }
   // static async Add_Election({ele_Name, logged_User}){

      //return this.create({name:ele_Name, userId:logged_User})
   // }
 // }
  Elections.init({
    name: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Elections',
  });
  return Elections;
};