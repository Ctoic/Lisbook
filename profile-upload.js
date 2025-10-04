const cloudName = 'dtz769wul';        
const uploadPreset = 'musicplayer';   

const uploadButton = document.getElementById('upload-pic');
const fileInput = document.getElementById('file-input');
const profilePic = document.getElementById('profile-pic');


window.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('profileImageUrl');
  if (savedUrl) {
    profilePic.src = savedUrl;
  }
});


uploadButton.addEventListener('click', () => {
  fileInput.click();
});


fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      profilePic.src = data.secure_url;                         
      localStorage.setItem('profileImageUrl', data.secure_url); 
    } else {
      alert('Image upload failed. Please try again.');
    }
  } catch (error) {
    alert('Error uploading image.');
    console.error(error);
  }
});
