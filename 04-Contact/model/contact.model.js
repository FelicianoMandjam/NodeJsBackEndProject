export default (connection , DataTypes) => {
    connection.define(
        'Contact', 
        {
            nom: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            telephone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message : {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        { timestamps: true }
    );
}