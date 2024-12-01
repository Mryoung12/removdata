document.addEventListener('DOMContentLoaded', function () {
    const userGrid = document.getElementById('userGrid');

    // Fetch data from the Mock API
    fetch('https://6749b2978680202966323256.mockapi.io/users')
        .then(response => response.json())
        .then(data => {
            // Clear the existing content in the grid
            userGrid.innerHTML = '';

            // Loop through each user and create a card
            data.forEach(user => {
                // Create a new user card
                const card = document.createElement('div');
                card.classList.add('user-card');

                // Add user details to the card
                card.innerHTML = `
                    <img src="${user.passportImage}" alt="Passport Image" class="passport-image">
                    <div class="user-info">
                        <label>Name: </label><input type="text" value="${user.name}" readonly>
                        <label>Assistance Package: </label><input type="text" value="${user.gender}" readonly>
                        <label>Registration Number: </label><input type="text" value="${user.registrationNumber}" readonly>
                        <label>Profile Code: </label><input type="text" value="${user.profileCode}" readonly>
                        <label>Score: </label><input type="text" value="${user.nationalIDNumber}" readonly>
                        <label>Exam Town Code: </label><input type="text" value="${user.examTownCode}" readonly>
                        <label>Department: </label><input type="text" value="${user.department}" readonly>
                        <label>Course: </label><input type="text" value="${user.course}" readonly>
                        <button class="Paid" onclick="editUser(${user.id})">Paid</button>
                        <button class="delete-button" onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                `;

                // Append the card to the grid
                userGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
