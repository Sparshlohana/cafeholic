const cookieToken = (user, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // makes the token available only to the backend
        secure: true,   // Only send over HTTPS
        sameSite: 'none' // Allow cross-origin requests
    };

    user.password = undefined;

    // Include the 'role' in the response
    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            role: user.role,
        },
    });
};

module.exports = cookieToken;
