const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");

const UserProfile = require("./models/userProfile.models");

initializeDatabase();

const jsonData = fs.readFileSync("BE1.2_HW1/profilesData.json");

const profileData = JSON.parse(jsonData);

const seedData = () => {
  try {
    for (const profile of profileData) {
      const newUser = new UserProfile({
        fullName: profile.fullName,
        username: profile.username,
        bio: profile.bio,
        profilePicUrl: profile.profilePicUrl,
        followingCount: profile.followingCount,
        followerCount: profile.followerCount,
        companyName: profile.companyName,
        location: profile.location,
        portfolioUrl: profile.portfolioUrl,
      });

      newUser.save();
      console.log("User Data: ", newUser.username);
    }
  } catch (error) {
    console.log("Error seeding data.", error);
  }
};
seedData();
