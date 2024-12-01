document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const passportFile = document.getElementById('passport').files[0];

    // Check if passport is uploaded
    if (!passportFile) {
        alert('Please upload your passport.');
        return;
    }

    // Resize the passport image before sending it to the API
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set the desired maximum dimensions (e.g., 200x200 pixels)
            const maxWidth = 200;
            const maxHeight = 200;
            let width = img.width;
            let height = img.height;

            // Resize logic
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const resizedImage = canvas.toDataURL('image/jpeg', 0.7); // Compress to JPEG with 70% quality

            // Prepare data for the API
            const data = {
                name: formData.get('name'),
                Gender: formData.get('gender'),
                registrationNumber: formData.get('registrationNumber'),
                profileCode: formData.get('profileCode'),
                nationalIDNumber: formData.get('nationalIDNumber') || '', // Handle missing national ID
                examTownCode: formData.get('examTownCode'),
                passportImage: resizedImage, // Use resized image
                department: formData.get('department'),
                course: formData.get(formData.get('department') + 'Course') || null, // Ensure course is selected
                createdAt: new Date().toISOString(),
            };

            // Debugging: Check all data before submitting
            console.log(data);

            // Check for required fields
            if (!data.name || !data.registrationNumber || !data.profileCode || !data.examTownCode || !data.department || !data.course) {
                alert('Please fill in all required fields.');
                return;
            }

            // Send data to the API
            fetch('https://6749b2978680202966323256.mockapi.io/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((result) => {
                    console.log('Successfully saved data:', result);
                    alert('Registration successful!');
                    document.getElementById('registrationForm').reset();
                    document.getElementById('passportPreview').src = '';
                    // Redirect to database.html
                    window.location.href = 'database.html';
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    alert('There was an error saving your data. Please try again.');
                });
        };
    };

    reader.readAsDataURL(passportFile);
});

// Handle department change and show relevant course options
document.getElementById('department').addEventListener('change', function () {
    const department = this.value;

    // Hide all course sections
    document.querySelectorAll('.course-section').forEach((section) => {
        section.style.display = 'none';
    });
    document.getElementById('subject-combinations').style.display = 'none';

    // Show the selected department's course section
    if (department) {
        document.getElementById(`${department}-courses`).style.display = 'block';
    }
});

// Handle course selection and show subject combinations
document.querySelectorAll('.course-section select').forEach((selectElement) => {
    selectElement.addEventListener('change', function () {
        const department = this.closest('.course-section').id.split('-')[0];
        const course = this.value;

        // Display subject combinations based on department and course
        const combinations = getSubjectCombinations(department, course);
        const subjectsDiv = document.getElementById('subjects');

        if (combinations.length > 0) {
            document.getElementById('subject-combinations').style.display = 'block';
            subjectsDiv.innerHTML = combinations.map(subject => `<div>${subject}</div>`).join('');
        }
    });
});

// Function to get subject combinations based on department and course
function getSubjectCombinations(department, course) {
    const subjects = {
        science: {
            
                medicine: ['Biology', 'Chemistry', 'Physics'],
                engineering: ['Mathematics', 'Physics', 'Chemistry'],
                computer_science: ['Mathematics', 'Physics', 'Computer Studies'],
                biochemistry: ['Biology', 'Chemistry', 'Physics'],
                pharmacy: ['Biology', 'Chemistry', 'Physics'],
                nursing: ['Biology', 'Chemistry', 'Physics'],
                microbiology: ['Biology', 'Chemistry', 'Physics'],
                physics: ['Mathematics', 'Physics', 'Chemistry'],
                mathematics: ['Mathematics', 'Physics', 'Chemistry'],
                environmental_science: ['Biology', 'Chemistry', 'Physics'],
                geology: ['Mathematics', 'Physics', 'Geography'],
                agricultural_science: ['Biology', 'Chemistry', 'Agricultural Science'],
                economics: ['English Language', 'Mathematics', 'Economics'],
                accounting: ['English Language', 'Mathematics', 'Economics'],
                business_administration: ['English Language', 'Mathematics', 'Economics'],
                law: ['English Language', 'Literature in English', 'Government'],
                political_science: ['English Language', 'Government', 'Literature in English'],
                sociology: ['English Language', 'Government', 'Literature in English'],
                psychology: ['English Language', 'Biology', 'Government'],
                mass_communication: ['English Language', 'Literature in English', 'Government'],
                history: ['English Language', 'Literature in English', 'Government'],
                philosophy: ['English Language', 'Literature in English', 'Government'],
                theatre_arts: ['English Language', 'Literature in English', 'Government'],
                music: ['Music', 'English Language', 'Government'],
                geography: ['Geography', 'Government', 'English Language'],
                international_relations: ['English Language', 'Government', 'Literature in English'],
                public_administration: ['English Language', 'Government', 'Literature in English'],
                fine_arts: ['Fine Art', 'English Language', 'Government'],
                sociology: ['English Language', 'Government', 'Literature in English'],
                social_work: ['English Language', 'Government', 'Literature in English'],
                criminology: ['English Language', 'Government', 'Literature in English'],
                foreign_languages: ['English Language', 'Literature in English', 'Foreign Language'],
                library_and_information_science: ['English Language', 'Literature in English', 'Government'],
                journalism: ['English Language', 'Literature in English', 'Government'],
                education: ['English Language', 'Literature in English', 'Government']
            },
            
    
        commercial: {
          
                accounting: ['English Language', 'Mathematics', 'Economics'],
                business_administration: ['English Language', 'Mathematics', 'Economics'],
                economics: ['English Language', 'Mathematics', 'Economics'],
                banking_and_finance: ['English Language', 'Mathematics', 'Economics'],
                marketing: ['English Language', 'Mathematics', 'Economics'],
                entrepreneurship: ['English Language', 'Mathematics', 'Economics'],
                insurance: ['English Language', 'Mathematics', 'Economics'],
                public_administration: ['English Language', 'Government', 'Economics'],
                international_relations: ['English Language', 'Government', 'Economics'],
                hospitality_management: ['English Language', 'Mathematics', 'Economics'],
                tourism_management: ['English Language', 'Mathematics', 'Economics'],
                logistics_and_transportation: ['English Language', 'Mathematics', 'Economics'],
                advertising: ['English Language', 'Literature in English', 'Economics'],
                real_estate: ['English Language', 'Mathematics', 'Economics'],
                library_and_information_science: ['English Language', 'Literature in English', 'Economics'],
                business_education: ['English Language', 'Mathematics', 'Economics'],
                public_relations: ['English Language', 'Literature in English', 'Economics'],
                secretarial_studies: ['English Language', 'Literature in English', 'Economics'],
                journalism: ['English Language', 'Literature in English', 'Government'],
                criminology: ['English Language', 'Government', 'Economics']
           
            
        },
        
        art: {
            law: ['English Language', 'Literature in English', 'Government'],
    literature_in_english: ['English Language', 'Literature in English', 'Government'],
    history: ['English Language', 'Literature in English', 'Government'],
    philosophy: ['English Language', 'Literature in English', 'Government'],
    religious_studies: ['English Language', 'Literature in English', 'Christian Religious Studies'],
    theatre_arts: ['English Language', 'Literature in English', 'Government'],
    music: ['English Language', 'Music', 'Government'],
    sociology: ['English Language', 'Government', 'Literature in English'],
    political_science: ['English Language', 'Government', 'Literature in English'],
    international_relations: ['English Language', 'Government', 'Literature in English'],
    mass_communication: ['English Language', 'Literature in English', 'Government'],
    journalism: ['English Language', 'Literature in English', 'Government'],
    public_administration: ['English Language', 'Government', 'Literature in English'],
    criminology: ['English Language', 'Government', 'Literature in English'],
    social_work: ['English Language', 'Government', 'Literature in English'],
    geography: ['English Language', 'Government', 'Geography'],
    psychology: ['English Language', 'Government', 'Biology'],
    fine_arts: ['Fine Art', 'English Language', 'Government'],
    foreign_languages: ['English Language', 'Literature in English', 'Foreign Language'],
    library_and_information_science: ['English Language', 'Literature in English', 'Government'],
    education: ['English Language', 'Literature in English', 'Government']
        }
    };

    return subjects[department]?.[course] || [];
}

// Function to preview the uploaded image
document.getElementById('passport').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('passportPreview');
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block'; // Show the image preview
        };

        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none'; // Hide the image preview if no file is selected
    }
});

// Select the button and audio elements
function playAudio(audioId) {
    const audio = document.getElementById(audioId);

    // Stop all audio before playing the selected one
    const audios = document.querySelectorAll('audio');
    audios.forEach((aud) => {
        aud.pause();
        aud.currentTime = 0;
    });

    // Play the selected audio
    audio.play();
}

// Add event listener to the <select> element
const audioSelector = document.getElementById('audioSelector');
audioSelector.addEventListener('change', () => {
    const selectedAudioId = audioSelector.value; // Get the selected value (audio ID)
    playAudio(selectedAudioId); // Call playAudio with the selected audio ID
});
