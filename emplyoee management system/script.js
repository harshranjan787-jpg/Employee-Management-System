const addBtn = document.getElementById("addBtn");
const employeeList = document.getElementById("employeeList");
const searchInput = document.getElementById("search");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = -1;

// Page load hote hi data dikhao
displayEmployees();

// Add / Update Employee
addBtn.addEventListener("click", addEmployee);

function addEmployee() {

    const name = document.getElementById("name").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const salary = document.getElementById("salary").value.trim();

    if(name === "" || designation === "" || salary === ""){
        if(salary <= 0){

    alert("Salary must be greater than zero");

    return;

}
        alert("Please fill all fields");
        return;
    }

    if(editIndex === -1){

        employees.push({
            name,
            designation,
            salary
        });

    }else{

        employees[editIndex] = {
            name,
            designation,
            salary
        };

        editIndex = -1;
        addBtn.innerText = "Add Employee";
    }

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

    document.getElementById("name").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("salary").value = "";
}

// Display Employees
function displayEmployees(){

    employeeList.innerHTML = "";

    employees.forEach((emp,index)=>{

        employeeList.innerHTML += `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.designation}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="action-btn edit"
                onclick="editEmployee(${index})">
                Edit
                </button>

                <button class="action-btn delete"
                onclick="deleteEmployee(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

}

// Delete
function deleteEmployee(index){

    let confirmDelete = confirm("Are you sure you want to delete this employee?");

    if(confirmDelete){

        employees.splice(index,1);

        localStorage.setItem("employees",JSON.stringify(employees));

        displayEmployees();

    }

}

// Edit
function editEmployee(index){

    document.getElementById("name").value = employees[index].name;
    document.getElementById("designation").value = employees[index].designation;
    document.getElementById("salary").value = employees[index].salary;

    editIndex = index;

    addBtn.innerText = "Update Employee";
}

// Search
searchInput.addEventListener("keyup", searchEmployee);

function searchEmployee(){

    const value = searchInput.value.toLowerCase();

    const rows = employeeList.getElementsByTagName("tr");

    for(let row of rows){

        const name = row.cells[0].textContent.toLowerCase();

        if(name.includes(value)){
            row.style.display = "";
        }else{
            row.style.display = "none";
        }
    }
document.getElementById("count").innerText = employees.length;
}