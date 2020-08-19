const ProfileSummryText = ({ percentage }) => {
  if (percentage < 10) return 'Your Profile is weak as shit here are some tips';
  if (percentage < 30)
    return 'you are on your way to completing your profile, consider uploading the rest of your information as it will make applying for applications that much easier and seemless';
  if (percentage < 70) return 'You are nearly at max profile strength good job';
  if (percentage < 95) return 'You are nearly at max profile strength good job';
  return 'Congratulations you have completed the entire application';
};

export default ProfileSummryText;
