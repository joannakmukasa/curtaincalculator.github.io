// ============== AUTHENTICATION AND USER MANAGEMENT ==============
// Initialize users from localStorage
let appUsers = JSON.parse(localStorage.getItem('appUsers')) || [
    { code: '001', name: 'Admin' },
    { code: '002', name: 'User 1' },
    { code: '003', name: 'User 2' }
];

let currentUser = null;

// Save users to localStorage
function saveUsers() {
    localStorage.setItem('appUsers', JSON.stringify(appUsers));
}

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', function() {
    currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showMainApp();
        restoreLastTab();
    }
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userCode = document.getElementById('userCode').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    // Check if user exists
    const user = appUsers.find(u => u.code === userCode);
    
    if (user) {
        currentUser = userCode;
        localStorage.setItem('currentUser', userCode);
        document.getElementById('userCode').value = '';
        errorDiv.style.display = 'none';
        showMainApp();
        restoreLastTab();
    } else {
        errorDiv.textContent = 'Invalid code. Please try again.';
        errorDiv.style.display = 'block';
        document.getElementById('userCode').value = '';
    }
});

// Show main app
function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    document.getElementById('adminCenter').style.display = 'none';
    
    const user = appUsers.find(u => u.code === currentUser);
    document.getElementById('currentUser').textContent = user ? user.name + ' (' + user.code + ')' : currentUser;
}

// Show login screen
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('adminCenter').style.display = 'none';
    currentUser = null;
    localStorage.removeItem('currentUser');
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    showLoginScreen();
});

// Admin button
document.getElementById('adminBtn').addEventListener('click', function() {
    showAdminCenter();
});

// Back to calculator button
document.getElementById('backToCalcBtn').addEventListener('click', function() {
    document.getElementById('adminCenter').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
});

// Show admin center
function showAdminCenter() {
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('adminCenter').style.display = 'block';
    updateUsersList();
}

// Add new user
document.getElementById('addUserBtn').addEventListener('click', function() {
    const code = document.getElementById('newUserCode').value.trim();
    const name = document.getElementById('newUserName').value.trim() || 'User ' + (appUsers.length + 1);
    const messageDiv = document.getElementById('addUserMessage');
    
    if (!code || code.length !== 3 || !/^\d{3}$/.test(code)) {
        messageDiv.className = 'alert alert-danger';
        messageDiv.textContent = 'Please enter a valid 3-digit code.';
        messageDiv.style.display = 'block';
        return;
    }
    
    // Check if code already exists
    if (appUsers.find(u => u.code === code)) {
        messageDiv.className = 'alert alert-danger';
        messageDiv.textContent = 'This code already exists.';
        messageDiv.style.display = 'block';
        return;
    }
    
    // Add new user
    appUsers.push({ code: code, name: name });
    saveUsers();
    
    messageDiv.className = 'alert alert-success';
    messageDiv.textContent = 'User ' + name + ' (' + code + ') added successfully!';
    messageDiv.style.display = 'block';
    
    document.getElementById('newUserCode').value = '';
    document.getElementById('newUserName').value = '';
    
    updateUsersList();
    
    // Hide message after 3 seconds
    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 3000);
});

// Update users list in admin center
function updateUsersList() {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    appUsers.forEach(function(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.code}</td>
            <td>${user.name}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-user-btn" data-code="${user.code}">
                    Delete
                </button>
            </td>
        `;
        usersList.appendChild(row);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.delete-user-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            if (code === currentUser) {
                alert('Cannot delete the currently logged-in user.');
                return;
            }
            
            if (confirm('Are you sure you want to delete user ' + code + '?')) {
                appUsers = appUsers.filter(u => u.code !== code);
                saveUsers();
                updateUsersList();
            }
        });
    });
}

// ============== TAB NAVIGATION AND MEMORY ==============
// Setup tab change listeners to remember last tab
document.addEventListener('shown.bs.tab', function(e) {
    if (currentUser) {
        const activeTab = e.target.getAttribute('href').substring(1);
        localStorage.setItem('lastTab_' + currentUser, activeTab);
    }
});

// Restore last tab for user
function restoreLastTab() {
    if (!currentUser) return;
    
    const lastTab = localStorage.getItem('lastTab_' + currentUser);
    if (lastTab) {
        const tabLink = document.querySelector(`[data-bs-toggle="tab"][href="#${lastTab}"]`);
        if (tabLink) {
            const tab = new bootstrap.Tab(tabLink);
            tab.show();
        }
    }
}

// ============== CALCULATION HISTORY ==============
// Add calculation to history
function addToHistory(calculationType, inputs, outputs) {
    if (!currentUser) return;
    
    const historyKey = 'userHistory_' + currentUser;
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    
    const calculation = {
        id: Date.now(),
        type: calculationType,
        inputs: inputs,
        outputs: outputs,
        timestamp: new Date().toLocaleString()
    };
    
    history.push(calculation);
    localStorage.setItem(historyKey, JSON.stringify(history));
    
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    if (!currentUser) return;
    
    const historyKey = 'userHistory_' + currentUser;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    
    const historyEmpty = document.getElementById('historyEmpty');
    const historyTable = document.getElementById('historyTable');
    const historyList = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyEmpty.style.display = 'block';
        historyTable.style.display = 'none';
        return;
    }
    
    historyEmpty.style.display = 'none';
    historyTable.style.display = 'block';
    historyList.innerHTML = '';
    
    // Display in reverse order (newest first)
    history.slice().reverse().forEach(function(calc) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="history-checkbox" data-id="${calc.id}"></td>
            <td>${calc.timestamp}</td>
            <td>${calc.type}</td>
            <td>
                <button class="btn btn-info btn-sm view-history-btn" data-id="${calc.id}">View</button>
                <button class="btn btn-danger btn-sm delete-history-btn" data-id="${calc.id}">Delete</button>
            </td>
        `;
        historyList.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.delete-history-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            deleteHistoryItem(id);
        });
    });
    
    document.querySelectorAll('.view-history-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            viewHistoryItem(id);
        });
    });
}

// Delete history item
function deleteHistoryItem(id) {
    if (!currentUser) return;
    
    const historyKey = 'userHistory_' + currentUser;
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history = history.filter(h => h.id !== id);
    localStorage.setItem(historyKey, JSON.stringify(history));
    
    updateHistoryDisplay();
}

// Clear all history
document.getElementById('clearHistoryBtn').addEventListener('click', function() {
    if (!currentUser) return;
    
    if (confirm('Are you sure you want to clear all calculation history?')) {
        localStorage.removeItem('userHistory_' + currentUser);
        updateHistoryDisplay();
    }
});

// Delete selected history items
document.getElementById('deleteSelectedBtn').addEventListener('click', function() {
    if (!currentUser) return;
    
    const checkboxes = document.querySelectorAll('.history-checkbox:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one item to delete.');
        return;
    }
    
    if (confirm('Delete ' + checkboxes.length + ' selected item(s)?')) {
        const historyKey = 'userHistory_' + currentUser;
        let history = JSON.parse(localStorage.getItem(historyKey)) || [];
        
        const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute('data-id')));
        history = history.filter(h => !idsToDelete.includes(h.id));
        
        localStorage.setItem(historyKey, JSON.stringify(history));
        updateHistoryDisplay();
    }
});

// Select all checkbox
document.addEventListener('click', function(e) {
    if (e.target.id === 'selectAllCheckbox') {
        const checkboxes = document.querySelectorAll('.history-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
    }
});

// View history item (show values in alert)
function viewHistoryItem(id) {
    if (!currentUser) return;
    
    const historyKey = 'userHistory_' + currentUser;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    const calc = history.find(h => h.id === id);
    
    if (calc) {
        let details = `Type: ${calc.type}\nDate: ${calc.timestamp}\n\nInputs:\n`;
        for (let key in calc.inputs) {
            details += `${key}: ${calc.inputs[key]}\n`;
        }
        details += `\nOutputs:\n`;
        for (let key in calc.outputs) {
            details += `${key}: ${calc.outputs[key]}\n`;
        }
        alert(details);
    }
}

// ============== DOWNLOAD CALCULATION ==============
function downloadCalculation(formId, calculationType) {
    if (!currentUser) {
        alert('User not logged in');
        return;
    }
    
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Get all form inputs
    const inputs = {};
    form.querySelectorAll('input[type="number"]').forEach(input => {
        inputs[input.getAttribute('name') || input.id] = input.value;
    });
    
    // Get all results
    const results = {};
    const resultsDiv = form.closest('.results-section') || form.parentElement.querySelector('.results-section') || form.nextElementSibling;
    
    if (resultsDiv) {
        resultsDiv.querySelectorAll('input[readonly]').forEach(input => {
            results[input.getAttribute('name') || input.id] = input.value;
        });
    }
    
    // Check if any results exist
    const hasResults = Object.keys(results).length > 0 && Object.values(results).some(v => v);
    
    if (!hasResults) {
        alert('Please calculate first before downloading.');
        return;
    }
    
    // Create HTML content for PDF
    const user = appUsers.find(u => u.code === currentUser);
    const userName = user ? user.name : currentUser;
    const timestamp = new Date().toLocaleString();
    
    let htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="text-align: center; color: #A9C338;">Nina Interiors</h1>
            <h2 style="text-align: center;">Calculation Report</h2>
            <hr>
            
            <p><strong>Calculation Type:</strong> ${calculationType}</p>
            <p><strong>User:</strong> ${userName} (${currentUser})</p>
            <p><strong>Date & Time:</strong> ${timestamp}</p>
            
            <h3 style="color: #A9C338; margin-top: 30px;">Input Values</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #A9C338;">
                    <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Parameter</th>
                    <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Value</th>
                </tr>
    `;
    
    for (let key in inputs) {
        if (inputs[key]) {
            htmlContent += `
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">${key}</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">${inputs[key]}</td>
                </tr>
            `;
        }
    }
    
    htmlContent += `
            </table>
            
            <h3 style="color: #A9C338; margin-top: 30px;">Results</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #A9C338;">
                    <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Result</th>
                    <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Value</th>
                </tr>
    `;
    
    for (let key in results) {
        if (results[key]) {
            htmlContent += `
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">${key}</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">${results[key]}</td>
                </tr>
            `;
        }
    }
    
    htmlContent += `
            </table>
            
            <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
                Generated by Nina Interiors Calculator - ${new Date().getFullYear()}
            </p>
        </div>
    `;
    
    // Generate PDF
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    
    const opt = {
        margin: 10,
        filename: `${calculationType.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save();
    
    // Add to history
    addToHistory(calculationType, inputs, results);
}

// ============== CALCULATOR FUNCTIONS ==============
document.getElementById('nettingForm').addEventListener('submit', calculateNetting);

function calculateNetting(event) {
    event.preventDefault();

    // Get the width of the window
    let windowWidth = document.getElementById('WindowWidth').value;

    // Calculate the values
    let metresNet = (windowWidth * 3) /100;
    metresNet = Math.ceil(metresNet);
    let metresTape = metresNet;
    let numHooks = (windowWidth * 20) /100;
    let numRunners = numHooks;

    metresNet = Math.ceil(metresNet);
    metresTape = Math.ceil(metresTape);
    numHooks = Math.ceil(numHooks);
    numRunners = Math.ceil(numHooks);

    // Set the calculated values to the respective input fields
    document.getElementById('MetresNet').value = metresNet;
    document.getElementById('MetresTape').value = metresTape;
    document.getElementById('NumHooks').value = numHooks;
    document.getElementById('NumRunners').value = numRunners;
}

document.getElementById('curtainForm1').addEventListener('submit', calculateCurtain1);

function calculateCurtain1(event){
    event.preventDefault();
    
    let CwindowWidth1 = document.getElementById('CWindowWidth1').value;
    let CwindowHeight1 = document.getElementById('CWindowHeight1').value;

    let NumPFabric1 = (CwindowWidth1 *2) / 120;
    NumPFabric1 = Math.ceil(NumPFabric1);
    let MetresFabric1 = ((CwindowHeight1 + 25) * NumPFabric1) /10000;
    MetresFabric1 = Math.ceil(MetresFabric1);
    let MetresCurtainTape1 = (NumPFabric1 * 140) /100;
    MetresCurtainTape1 = Math.ceil(MetresCurtainTape1);
    let MetresCurtainLining1 = MetresCurtainTape1
    let MetresEyelets1 = MetresCurtainTape1 * 6

    NumPFabric1 = Math.ceil(NumPFabric1);
    MetresFabric1 = Math.ceil(MetresFabric1);
    MetresCurtainTape1 = Math.ceil(MetresCurtainTape1);
    MetresCurtainLining1 = Math.ceil(MetresCurtainLining1);
    MetresEyelets1 = Math.ceil(MetresEyelets1)

    document.getElementById('NumPFabric1').value = NumPFabric1;
    document.getElementById('MetresFabric1').value = MetresFabric1;
    document.getElementById('MetresCurtainTape1').value = MetresCurtainTape1;
    document.getElementById('MetresCurtainLining1').value = MetresCurtainLining1;
    document.getElementById('MetresEyelets1').value = MetresEyelets1

}

document.getElementById('curtainForm2').addEventListener('submit', calculateCurtain2);

function calculateCurtain2(event){
    event.preventDefault();
    
    let CwindowWidth2 = document.getElementById('CWindowWidth2').value;
    let CwindowHeight2 = document.getElementById('CWindowHeight2').value;

    let NumPFabric2 = (CwindowWidth2 *2) / 280;
    NumPFabric2 = Math.ceil(NumPFabric2);
    let MetresFabric2 = ((CwindowHeight2 + 25) * NumPFabric2) /10000;
    let MetresCurtainTape2 = (NumPFabric2 * 280) /100;
    MetresCurtainTape2 = Math.ceil(MetresCurtainTape2);
    let MetresCurtainLining2 = MetresFabric2;
    let MetresEyelets2 = MetresCurtainTape2 * 6;
    
    MetresFabric2 = Math.ceil(MetresFabric2);
    MetresCurtainTape2 = Math.ceil(MetresCurtainTape2);
    MetresCurtainLining2 = Math.ceil(MetresCurtainLining2);
    MetresEyelets2 = Math.ceil(MetresEyelets2)

    document.getElementById('NumPFabric2').value = NumPFabric2;
    document.getElementById('MetresFabric2').value = MetresFabric2;
    document.getElementById('MetresCurtainTape2').value = MetresCurtainTape2;
    document.getElementById('MetresCurtainLining2').value = MetresCurtainLining2;
    document.getElementById('MetresEyelets2').value = MetresEyelets2

}

document.getElementById('curtainForm3').addEventListener('submit', calculateCurtain3);

function calculateCurtain3(event){
    event.preventDefault();
    
    let CwindowWidth3 = document.getElementById('CWindowWidth3').value;
    let CwindowHeight3 = document.getElementById('CWindowHeight3').value;

    let NumPFabric3 = (CwindowWidth3 *2) / 120;
    NumPFabric3 = Math.ceil(NumPFabric3);
    let MetresFabric3 = ((CwindowHeight3 + 20) * NumPFabric3) /10000;
    MetresFabric3 = Math.ceil(MetresFabric3);
    let MetresCurtainLining3 = MetresFabric3;
    let MetresCurtainTape3 = (NumPFabric3 * 140) /100;
    let CNumHooks3 = CwindowWidth3 * 0.2;
    let CNumRunners3 = CNumHooks3;

    NumPFabric3 = Math.ceil(NumPFabric3);
    MetresFabric3 = Math.ceil(MetresFabric3);
    MetresCurtainLining3 = Math.ceil(MetresCurtainLining3);
    MetresCurtainTape3 = Math.ceil(MetresCurtainTape3);
    CNumHooks3 = Math.ceil(CNumHooks3);
    CNumRunners3 = Math.ceil(CNumRunners3);
    
    document.getElementById('NumPFabric3').value = NumPFabric3;
    document.getElementById('MetresFabric3').value = MetresFabric3;
    document.getElementById('MetresCurtainTape3').value = MetresCurtainTape3;
    document.getElementById('MetresCurtainLining3').value = MetresCurtainLining3;
    document.getElementById('CNumHooks3').value = CNumHooks3;
    document.getElementById('CNumRunners3').value = CNumRunners3;

}

document.getElementById('curtainForm4').addEventListener('submit', calculateCurtain4);

function calculateCurtain4(event){
    event.preventDefault();
    
    let CwindowWidth4 = document.getElementById('CWindowWidth4').value;
    let CwindowHeight4 = document.getElementById('CWindowHeight4').value;

    let NumPFabric4 = (CwindowWidth4 *2.5) / 120;
    NumPFabric4 = Math.ceil(NumPFabric4);
    let MetresFabric4 = ((CwindowHeight4 + 20) * NumPFabric4) /10000;
    let MetresCurtainTape4 = (NumPFabric4 * 140) /100;
    let MetresCurtainLining4 = MetresCurtainTape4;
    let CNumHooks4 = CwindowWidth4 * 0.15;
    let CNumRunners4 = CNumHooks4;

    NumPFabric4 = Math.ceil(NumPFabric4);
    // MetresFabric4 = Math.ceil(MetresFabric4);
    MetresCurtainLining4 = Math.ceil(MetresCurtainLining4);
    MetresCurtainTape4 = Math.ceil(MetresCurtainTape4);
    CNumHooks4 = Math.ceil(CNumHooks4);
    CNumRunners4 = Math.ceil(CNumRunners4);
    
    document.getElementById('NumPFabric4').value = NumPFabric4;
    document.getElementById('MetresFabric4').value = MetresFabric4;
    document.getElementById('MetresCurtainTape4').value = MetresCurtainTape4;
    document.getElementById('MetresCurtainLining4').value = MetresCurtainLining4;
    document.getElementById('CNumHooks4').value = CNumHooks4;
    document.getElementById('CNumRunners4').value = CNumRunners4;

}


document.getElementById('MnForm1').addEventListener('submit', calculateMn1);

function calculateMn1(event){
    event.preventDefault();
    
    let MnWidth1 = document.getElementById('MnWidth1').value;
    let MnHeight1 = document.getElementById('MnHeight1').value;
    let MnLength1 = document.getElementById('MnLength1').value;

    let NumPFabricM1 = ((((MnWidth1 *2) + (MnLength1 *2))+400)* 1.5) /280;
    NumPFabricM1 = Math.ceil(NumPFabricM1);
    let MetresFabricM1 = (MnHeight1 * NumPFabricM1) /100;
    let MetresTapeM1 = (NumPFabricM1 * 280) /100;
    let MetresTetronM1 = ((NumPFabricM1 * 150)) / 100; //add an input for the width of the tetron
    let MNumHooks1 = (((MnWidth1 + MnLength1) *2) * 0.4) /10000;
    let MNumRunners1 = MNumHooks1;

    NumPFabricM1 = Math.ceil(NumPFabricM1);
    MetresFabricM1 = Math.ceil(MetresFabricM1);
    MetresTapeM1 = Math.ceil(MetresTapeM1);
    MetresTetronM1 = Math.ceil(MetresTetronM1);
    MNumHooks1 = Math.ceil(MNumHooks1);
    MNumRunners1 = Math.ceil(MNumRunners1);
    
    document.getElementById('NumPFabricM1').value = NumPFabricM1;
    document.getElementById('MetresFabricM1').value = MetresFabricM1;
    document.getElementById('MetresTapeM1').value = MetresTapeM1;
    document.getElementById('MetresTetronM1').value = MetresTetronM1;
    document.getElementById('MNumHooks1').value = MNumHooks1;
    document.getElementById('MNumRunners1').value = MNumRunners1;
}

document.getElementById('MnForm2').addEventListener('submit', calculateMn2);

function calculateMn2(event){
    event.preventDefault();
    
    let MnWidth2 = document.getElementById('MnWidth2').value;
    let MnHeight2 = document.getElementById('MnHeight2').value;
    let MnLength2 = document.getElementById('MnLength2').value;

    // let NumPFabricM2 = ((((((MnLength2 + MnWidth2)*2)+400))/280) / 100) + 2;
    // NumPFabricM2 = Math.ceil(NumPFabricM2);
    let NumPFabricM2 = 0;
    let MetresFabricM2 = 0;
    let MetresTetronM2 = 0;
    //(((MnHeight2-10) * 6) + (MnLength2 + 10))/100
    if (MnWidth2 <= 120) {
        NumPFabricM2 = 7
        MetresFabricM2 = ((MnHeight2-10) * 6) + (+MnLength2 + 10)/100;
        MetresTetronM2 = (600 + (+MnHeight2) + (+MnLength2) + (+MnWidth2)) /100;
    }
    else if (MnWidth2 >= 120) {
        NumPFabricM2 = 9
        MetresFabricM2 = (((MnHeight2-10) * 8) + (+MnLength2 + 10))/100;
        MetresTetronM2 = (600 + (+MnHeight2) + (+MnLength2) + (+MnWidth2)) /100;
    }
    

    NumPFabricM2 = Math.ceil(NumPFabricM2);
    MetresFabricM2 = Math.ceil(MetresFabricM2);
    MetresTetronM2 = Math.ceil(MetresTetronM2);
    
    document.getElementById('NumPFabricM2').value = NumPFabricM2;
    document.getElementById('MetresFabricM2').value = MetresFabricM2;
    document.getElementById('MetresTetronM2').value = MetresTetronM2;
}

document.getElementById('PelmetForm1').addEventListener('submit', calculateP1);

function calculateP1(event){
    event.preventDefault();
    
    let PWidth1 = document.getElementById('PWidth1').value;
    let PHeight1 = document.getElementById('PHeight1').value;

    let NumPFabricP1 = (PWidth1 * 3) /120;
    NumPFabricP1 = Math.ceil(NumPFabricP1);
    let MetresFabricP1 = (PHeight1 +10) * NumPFabricP1;
    MetresFabricP1 = Math.ceil(MetresFabricP1);
    let MetresTapeP1 = (NumPFabricP1 * 140) /100;
    MetresFabricP1 = MetresFabricP1 /10000

    NumPFabricP1 = Math.ceil(NumPFabricP1);
    MetresTapeP1 = Math.ceil(MetresTapeP1);
    MetresFabricP1 = Math.ceil(MetresFabricP1);
    
    document.getElementById('NumPFabricP1').value = NumPFabricP1;
    document.getElementById('MetresFabricP1').value = MetresFabricP1;
    document.getElementById('MetresTapeP1').value = MetresTapeP1;
}

document.getElementById('PelmetForm2').addEventListener('submit', calculateP2);

function calculateP2(event){
    event.preventDefault();
    
    let PWidth2 = document.getElementById('PWidth2').value;
    let PHeight2 = document.getElementById('PHeight2').value;

    let NumPFabricP2 = (PWidth2 * 3) /120;
    NumPFabricP2 = Math.ceil(NumPFabricP2);
    let MetresFabricP2 = (PHeight2 + 10) * NumPFabricP2;
    MetresFabricP2 = Math.ceil(NumPFabricP2);
    let MetresTapeP2 = MetresFabricP2 * 140;
    let MetresVelcroP2 = PWidth2 /100;
    MetresTapeP2 = MetresTapeP2 /100;

    NumPFabricP2 = Math.ceil(NumPFabricP2);
    MetresFabricP2 = Math.ceil(NumPFabricP2);
    MetresVelcroP2 = Math.ceil(MetresVelcroP2);
    MetresTapeP2 = Math.ceil(MetresTapeP2);
    
    document.getElementById('NumPFabricP2').value = NumPFabricP2;
    document.getElementById('MetresFabricP2').value = MetresFabricP2;
    document.getElementById('MetresTapeP2').value = MetresTapeP2;
    document.getElementById('MetresVelcroP2').value = MetresVelcroP2;
}

document.getElementById('PelmetForm3').addEventListener('submit', calculateP3);

function calculateP3(event){
    event.preventDefault();
    
    let PWidth3 = document.getElementById('PWidth3').value;
    let PHeight3 = document.getElementById('PHeight3').value;

    let NumPFabricP3 = PWidth3 /120;
    NumPFabricP3 = Math.ceil(NumPFabricP3);
    let MetresFabricP3 = ((PHeight3 +10) * NumPFabricP3) /10000;
    let MetresCurtainLiningP3 = MetresFabricP3;
    let MetresBoardP3 = MetresFabricP3;
    let MetresBraidP3 = (PWidth3 * 1.5 * 2) /100;

    NumPFabricP3 = Math.ceil(NumPFabricP3);
    MetresFabricP3 = Math.ceil(MetresFabricP3);
    MetresCurtainLiningP3 = Math.ceil(MetresCurtainLiningP3);
    MetresBoardP3 = Math.ceil(MetresBoardP3);
    MetresBraidP3 = Math.ceil(MetresBraidP3);

    document.getElementById('NumPFabricP3').value = NumPFabricP3;
    document.getElementById('MetresFabricP3').value = MetresFabricP3;
    document.getElementById('MetresCurtainLiningP3').value = MetresCurtainLiningP3;
    document.getElementById('MetresBoardP3').value = MetresBoardP3;
    document.getElementById('MetresBraidP3').value = MetresBraidP3;
}

document.getElementById('BlindsForm1').addEventListener('submit', calculateB1);

function calculateB1(event){
    event.preventDefault();
    
    let BWidth1 = document.getElementById('BWidth1').value;
    let BLength1 = document.getElementById('BLength1').value;

    let MetresWindowB1 = (BLength1 * BWidth1) /10000;

    MetresWindowB1 = Math.ceil(MetresWindowB1);

    document.getElementById('MetresWindowB1').value = MetresWindowB1;
}

document.getElementById('BlindsForm2').addEventListener('submit', calculateB2);

function calculateB2(event){
    event.preventDefault();
    
    let BWidth2 = document.getElementById('BWidth2').value;
    let BLength2 = document.getElementById('BLength2').value;

    let MetresWindowB2 = (BLength2 * BWidth2) /10000;

    MetresWindowB2 = Math.ceil(MetresWindowB2);

    document.getElementById('MetresWindowB2').value = MetresWindowB2;
}

document.getElementById('BlindsForm3').addEventListener('submit', calculateB3);

function calculateB3(event){
    event.preventDefault();
    
    let BWidth3 = document.getElementById('BWidth3').value;
    let BLength3 = document.getElementById('BLength3').value;

    let MetresWindowB3 = (BLength3 * BWidth3) /10000;

    MetresWindowB3 = Math.ceil(MetresWindowB3);

    document.getElementById('MetresWindowB3').value = MetresWindowB3;
}

document.getElementById('BlindsForm4').addEventListener('submit', calculateB4);

function calculateB4(event){
    event.preventDefault();
    
    let BWidth4 = document.getElementById('BWidth4').value;
    let BLength4 = document.getElementById('BLength4').value;

    let MetresWindowB4 = (BLength4 * BWidth4) /10000;

    MetresWindowB4 = Math.ceil(MetresWindowB4);

    document.getElementById('MetresWindowB4').value = MetresWindowB4;
}