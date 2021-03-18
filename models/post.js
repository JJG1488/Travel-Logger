module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        recentSearches: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    });
    return Post;
}