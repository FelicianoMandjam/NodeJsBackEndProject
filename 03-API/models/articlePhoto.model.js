export default (connection, DataTypes) => {
    connection.define(
        'ArticlePhoto',
        {
            // Model attributes are defined here
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: true }
    );
  }