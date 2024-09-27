var chemicals = [
  { id: 1, name: "Acetone", vendor: "ChemCorp", density: "0.791", viscosity: "0.32", packaging: "Can", packSize: "5", unit: "L", quantity: 50 },
  { id: 2, name: "Ethanol", vendor: "BioChem", density: "0.789", viscosity: "1.2", packaging: "Bottle", packSize: "2", unit: "L", quantity: 30 },
  { id: 3, name: "Sodium Hydroxide", vendor: "ChemTech", density: "2.13", viscosity: "78", packaging: "Barrel", packSize: "50", unit: "kg", quantity: 10 },
  { id: 4, name: "Benzene", vendor: "OrgChem", density: "0.876", viscosity: "0.65", packaging: "Bottle", packSize: "1", unit: "L", quantity: 60 },
  { id: 5, name: "Chloroform", vendor: "ChemSolutions", density: "1.489", viscosity: "0.563", packaging: "Can", packSize: "10", unit: "L", quantity: 20 },
  { id: 6, name: "Methanol", vendor: "PureChem", density: "0.791", viscosity: "0.547", packaging: "Drum", packSize: "200", unit: "L", quantity: 25 },
  { id: 7, name: "Hydrochloric Acid", vendor: "AcidSupply", density: "1.18", viscosity: "0.89", packaging: "Bottle", packSize: "1", unit: "L", quantity: 40 },
  { id: 8, name: "Sulfuric Acid", vendor: "AcidSolutions", density: "1.84", viscosity: "21", packaging: "Tank", packSize: "100", unit: "kg", quantity: 15 },
  { id: 9, name: "Formaldehyde", vendor: "ChemStore", density: "0.815", viscosity: "1.12", packaging: "Bottle", packSize: "500", unit: "mL", quantity: 35 },
  { id: 10, name: "Acetic Acid", vendor: "GreenChem", density: "1.05", viscosity: "1.1", packaging: "Bottle", packSize: "1", unit: "L", quantity: 45 },
  { id: 11, name: "Isopropyl Alcohol", vendor: "SafetyChem", density: "0.786", viscosity: "2.05", packaging: "Bottle", packSize: "1", unit: "L", quantity: 60 },
  { id: 12, name: "Toluene", vendor: "ChemHub", density: "0.866", viscosity: "0.59", packaging: "Can", packSize: "10", unit: "L", quantity: 30 },
  { id: 13, name: "Nitric Acid", vendor: "AcidTech", density: "1.41", viscosity: "1.2", packaging: "Bottle", packSize: "1", unit: "L", quantity: 20 },
  { id: 14, name: "Calcium Carbonate", vendor: "MineralSuppliers", density: "2.71", viscosity: "N/A", packaging: "Sack", packSize: "25", unit: "kg", quantity: 50 },
  { id: 15, name: "Potassium Chloride", vendor: "SaltWorks", density: "1.98", viscosity: "N/A", packaging: "Bag", packSize: "10", unit: "kg", quantity: 70 }
];


var tableBody = document.getElementById('tableBody');
var sortOrder = 1; // 1: Ascending, -1: Descending

function loadTableData() {
  updateChemicalList(); 
}
window.onload = function() {
  refreshData();  // Load from localStorage if available
  loadTableData();  // Populate the table
};

function refreshData() {
  var savedData = localStorage.getItem('chemicals');
  if (savedData) {
    chemicals = JSON.parse(savedData);  // Load data from localStorage
  } else {
    localStorage.setItem('chemicals', JSON.stringify(chemicals));  // Initialize with default data
  }
  loadTableData();  // Load the data into the table
}
function createTableRow(chemical) {
  var row = document.createElement('tr');
  row.setAttribute('data-id', chemical.id);
  row.innerHTML = `
    <td>
      <i class="bi bi-check-lg check-icon" onclick="toggleSelect(this)" style="color: gray;"></i>
    </td>
    <td>${chemical.id}</td>
    <td>${chemical.name}</td>
    <td>${chemical.vendor}</td>
    <td><input type="text" class="form-control" value="${chemical.density}" readonly></td>
    <td><input type="text" class="form-control" value="${chemical.viscosity}" readonly></td>
    <td>${chemical.packaging}</td>
    <td>${chemical.packSize}</td>
    <td>${chemical.unit}</td>
    <td><input type="text" class="form-control" value="${chemical.quantity}" readonly></td>
    <td>
      <button class="btn btn-warning" onclick="editChemical(${chemical.id})">Edit</button>
    </td>
  `;
  return row;
}

var sortDirection = 1; // 1 = ascending, -1 = descending

function sortTable(columnIndex) {
  var table = document.getElementById("chemicalTable");
  var tbody = table.tBodies[0];
  var rows = Array.from(tbody.rows);

  // Toggle sorting direction
  sortDirection *= -1;

  // Sort rows
  rows.sort((rowA, rowB) => {
    var cellA = rowA.cells[columnIndex].textContent.trim();
    var cellB = rowB.cells[columnIndex].textContent.trim();

    // Numeric sorting
    if (!isNaN(cellA) && !isNaN(cellB)) {
      return sortDirection * (parseFloat(cellA) - parseFloat(cellB));
    }

    // Text sorting
    return sortDirection * cellA.localeCompare(cellB);
  });

  // Append sorted rows
  rows.forEach(row => tbody.appendChild(row));
}


function getNewChemicalData() {
  var formData = new FormData(document.getElementById('chemicalForm'));

  var chemicalId = parseInt(formData.get('chemicalId'));
  var newChemical = {
    id: chemicalId || (chemicals.length + 1),
    name: formData.get('name'),
    vendor: formData.get('vendor'),
    density: formData.get('density'),
    viscosity: formData.get('viscosity'),
    packaging: formData.get('packaging'),
    packSize: formData.get('packSize'),
    unit: formData.get('unit'),
    quantity: formData.get('quantity') ? parseInt(formData.get('quantity')) : 0
  };

  if (Object.values(newChemical).every(val => (typeof val === 'string' ? val.trim() !== '' : val != null))) {
    if (chemicalId) {
      var index = chemicals.findIndex(chem => chem.id === chemicalId);
      if (index !== -1) {
        chemicals[index] = newChemical;
      }
    } else {
      chemicals.push(newChemical);
    }

    updateChemicalList();
    localStorage.setItem('chemicals', JSON.stringify(chemicals));
    alert('Chemical added/updated successfully');
    document.getElementById('chemicalForm').reset();
    var modal = bootstrap.Modal.getInstance(document.getElementById('chemicalModal'));
    modal.hide();
  } else {
    alert('Please fill in all the fields.');
  }
}
function updateChemicalList() {

  var tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = ''; 

  chemicals.forEach(chemical => {
    var row = document.createElement('tr');
    row.setAttribute('data-id', chemical.id);
    row.innerHTML = `
      <td>
        <i class="bi bi-check-lg check-icon" onclick="toggleSelect(this)" style="color: gray;"></i>
      </td>
      <td>${chemical.id}</td>
      <td>${chemical.name}</td>
      <td>${chemical.vendor}</td>
      <td><input type="text" class="form-control" value="${chemical.density}" readonly></td> <!-- Density Input -->
      <td><input type="text" class="form-control" value="${chemical.viscosity}" readonly></td> <!-- Viscosity Input -->
      <td>${chemical.packaging}</td>
      <td>${chemical.packSize}</td>
      <td>${chemical.unit}</td>
      <td><input type="text" class="form-control" value="${chemical.quantity}" readonly></td>
      <td>
     <button class="btn btn-info" onclick="editChemical(${chemical.id})"><i class="fas fa-edit text-white"></i></button>
      </td>
    `;
    tableBody.appendChild(row); 
  });
}
function editChemical(id) {
  var chemicaledit = chemicals.find(chem => chem.id === id);
  console.log("chemicaledit IDDD",chemicaledit)
  if (chemicaledit) {
    document.getElementById('chemicalId').value = chemicaledit.id; 
    document.getElementById('name').value = chemicaledit.name;
    document.getElementById('vendor').value = chemicaledit.vendor;
    document.getElementById('density').value = chemicaledit.density;
    document.getElementById('viscosity').value = chemicaledit.viscosity;
    document.getElementById('packaging').value = chemicaledit.packaging;
    document.getElementById('packSize').value = chemicaledit.packSize;
    document.getElementById('unit').value = chemicaledit.unit;
    document.getElementById('quantity').value = chemicaledit.quantity;
    
    var modaledit = new bootstrap.Modal(document.getElementById('chemicalModal'));
    modaledit.show();
  }
}

function deleteRow() {
  var selected = document.querySelector('.selected');
  
  if (selected) {
    var id = selected.getAttribute('data-id');
    
    var confirmed = confirm('Are you sure you want to delete this chemical?');
    
    if (confirmed) {
      chemicals = chemicals.filter(chemical => chemical.id != id);
      
      localStorage.setItem('chemicals', JSON.stringify(chemicals));
      
      updateChemicalList();
      
      alert('Chemical deleted successfully!');
    }
  } else {
    alert("No row selected! Please select a chemical to delete.");
  }
}


function toggleSelect(icon) {
  var row = icon.closest('tr');
  document.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
  row.classList.add('selected');
  if (icon.style.color === 'gray') {
    icon.style.color = 'blue'; // Change to blue ✔ (checked)
  } else {
    icon.style.color = 'gray'; // Change to gray ✔ (unchecked)
  }
}
function moveUp(button) {
  var selectedRow = document.querySelector('.selected');
  if (selectedRow && selectedRow.previousElementSibling) {
    selectedRow.parentNode.insertBefore(selectedRow, selectedRow.previousElementSibling);
  }
  toggleButtonColor(button);
}

function moveDown(button) {
  var selectedRow = document.querySelector('.selected');
  if (selectedRow && selectedRow.nextElementSibling) {
    selectedRow.parentNode.insertBefore(selectedRow.nextElementSibling, selectedRow);
  }
  toggleButtonColor(button); 
}

function toggleButtonColor(button) {
  var buttons = document.querySelectorAll('.icon-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  button.classList.add('active');
}

function saveData() {
  localStorage.setItem('chemicals', JSON.stringify(chemicals));
  alert("Data saved!");
}


loadTableData();
