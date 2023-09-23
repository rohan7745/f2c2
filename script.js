// Global variables to store student data
let studentData = [];
let filteredData = [];

// Function to render the main table
function renderMainTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to render the female and male tables
function renderGenderTables() {
    const femaleTableBody = document.getElementById('femaleTableBody');
    const maleTableBody = document.getElementById('maleTableBody');

    femaleTableBody.innerHTML = '';
    maleTableBody.innerHTML = '';

    studentData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.marks}</td>
            <td>${student.class}</td>
            <td>${student.gender}</td>
        `;

        if (student.gender === 'Female') {
            femaleTableBody.appendChild(row);
        } else if (student.gender === 'Male') {
            maleTableBody.appendChild(row);
        }
    });
}

// Function to filter data based on search input
function filterData(searchText) {
    filteredData = studentData.filter(student => {
        const fullName = `${student.first_name} ${student.last_name}`;
        return (
            fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    // Render the main table with filtered data
    renderMainTable(filteredData);
}

// Event listener for search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.trim();
    filterData(searchText);
});

// Event listeners for sorting buttons and sorting logic (to be implemented)
// ...

// Event listener for "Sort by Gender" button
const sortGenderButton = document.getElementById('sortGenderButton');
sortGenderButton.addEventListener('click', () => {
    const genderTables = document.getElementById('genderTables');
    genderTables.classList.toggle('hidden');

    if (!genderTables.classList.contains('hidden')) {
        // Show gender tables
        renderGenderTables();
    }
});

// Fetch student data and initial rendering
fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        studentData = data;
        filteredData = data;
        renderMainTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));

    // Sorting function for A->Z (ascending order of full name)
function sortAZ() {
    filteredData.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`;
        const nameB = `${b.first_name} ${b.last_name}`;
        return nameA.localeCompare(nameB);
    });
    renderMainTable(filteredData);
}

// Sorting function for Z->A (descending order of full name)
function sortZA() {
    filteredData.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`;
        const nameB = `${b.first_name} ${b.last_name}`;
        return nameB.localeCompare(nameA);
    });
    renderMainTable(filteredData);
}

// Sorting function for ascending order of marks
function sortMarks() {
    filteredData.sort((a, b) => a.marks - b.marks);
    renderMainTable(filteredData);
}

// Sorting function to show only passing students
function sortPassing() {
    filteredData = filteredData.filter(student => student.passing);
    renderMainTable(filteredData);
}

// Sorting function for ascending order of class
function sortClass() {
    filteredData.sort((a, b) => a.class.localeCompare(b.class));
    renderMainTable(filteredData);
}

// Event listeners for sorting buttons
const sortAZButton = document.getElementById('sortAZButton');
const sortZAButton = document.getElementById('sortZAButton');
const sortMarksButton = document.getElementById('sortMarksButton');
const sortPassingButton = document.getElementById('sortPassingButton');
const sortClassButton = document.getElementById('sortClassButton');

sortAZButton.addEventListener('click', sortAZ);
sortZAButton.addEventListener('click', sortZA);
sortMarksButton.addEventListener('click', sortMarks);
sortPassingButton.addEventListener('click', sortPassing);
sortClassButton.addEventListener('click', sortClass);
