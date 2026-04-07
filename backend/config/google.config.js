const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl:
    process.env.GOOGLE_REDIRECT_URL ||
    "http://localhost:3001/users/auth/google/callback",
  frontendCallback:
    process.env.GOOGLE_FRONTEND_CALLBACK ||
    "http://localhost:5173/auth/callback",
};

console.log("Loaded Google config:", {
  clientId: googleConfig.clientId,
  redirectUrl: googleConfig.redirectUrl,
});

if (!googleConfig.clientId || !googleConfig.clientSecret) {
  console.warn(
    "Please enter a valid GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables, because they are required for Google OAuth to work",
  );
}

export default googleConfig;
