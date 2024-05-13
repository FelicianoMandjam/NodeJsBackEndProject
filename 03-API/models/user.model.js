// Je recup ma connexion dans la variable sequalize
import { Timestamp } from "mongodb"

// et mes types de champs SQL dans DataTypes
export default (sequelize , DataTypes) =>{

    const User = sequelize.define(
      'User',
      {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull : false,
          unique : true
          // allowNull defaults to true
        },
        password: {
          type: DataTypes.STRING,
          allowNull : false
        },
      },
      {
         timestamp: true 
      },
    );
}

