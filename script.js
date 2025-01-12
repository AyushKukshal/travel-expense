window.onload = function () {
    // Set the date input to the current date
    const dateInput = document.getElementById('date');
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    dateInput.value = currentDate;

    const dayTypeButtons = document.querySelectorAll('.day-type-btn');
    const selectedDayTypeInput = document.getElementById('selectedDayType');
    const submitButton = document.querySelector('.submit-btn');
    let selectedAmount = 0;

    dayTypeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Set the selected day type value
            selectedAmount = parseInt(button.getAttribute('data-value'), 10);
            selectedDayTypeInput.value = button.getAttribute('data-type');
            
            // Enable the submit button
            submitButton.disabled = false;
        });
    });

    // Handle form submission
    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const dayType = selectedDayTypeInput.value;
        const amount = selectedAmount;

        addExpense(date, dayType, amount);

        // Reset the form and disable the submit button
        expenseForm.reset();
        selectedAmount = 0;
        submitButton.disabled = true;
    });

    // Add expense to the table and update total
    function addExpense(date, dayType, amount) {
        const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
        const newRow = expenseTable.insertRow();

        newRow.innerHTML = `
            <td>${date}</td>
            <td>${dayType}</td>
            <td>₹${amount}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeExpense(this)">Remove</button></td>
        `;

        updateTotal();
    }

    // Remove expense from the table and update total
    window.removeExpense = function (button) {
        const row = button.closest('tr');
        row.remove();
        updateTotal();
    };

    // Update the total amount
    function updateTotal() {
        const rows = document.getElementById('expenseTable').getElementsByTagName('tbody')[0].rows;
        let total = 0;

        for (let row of rows) {
            const amountCell = row.cells[2].innerText;
            total += parseInt(amountCell.replace('₹', ''), 10);
        }

        document.getElementById('totalAmount').innerText = total;
    }
};
