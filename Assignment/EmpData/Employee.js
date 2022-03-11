  let baseurl = "https://lwl-ems.herokuapp.com/api/ems";
let url="";
let edit = false;
let id = "";

getEmployees();

//get all the data
function getEmployees()
{
    var output = document.querySelector("tbody");
output.innerHTML = "";  
     url = baseurl+"/all";
    let element = document.querySelector("#details");
    //fetching all data 
        fetch(url).then(response => response.json()).then(result => {
            result.forEach(empl => {

                output.innerHTML += `
            <tr>   
            <th scope="row">${empl["id"]}</th>  
            <td>${empl.name}</td>                  
            <td>${empl.email}</td>                  
            <td>${empl.salary}</td>
            
            <td><button type="button" id="btndt" onclick="deleteData(this);" class="btn btn-primary">Delete</button></td>
            <td><button type="button" id="btnEdit" onclick="editData(this);" class="btn btn-primary">Edit</button></td>
            </tr>
    `;          
             });
                 element.innerHTML = output.innerHTML;
        });
}
function setEmps(){  
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let salary = document.querySelector("#salary").value;

    document.querySelector("#userData").reset();

    let data = {"name": name , "email": email , "salary":salary};
    
    url = baseurl+"/"
    //if the user is editing data
    if(!edit){

        fetch(url ,{
             method  :   "PUT",
            headers :   {
            'Content-Type' : 'application/json'
            },
            body    :   JSON.stringify(data)
            }).then(response => {
            console.log(response);
            getEmployees();
        })
    }
    //if user is adding new data
    else {
        data = {"id" : id , "name" : name , "email" : email , "salary" : salary};

        fetch(url ,{
            method  :   "POST",
           headers :   {
           'Content-Type' : 'application/json'
           },
           body    :   JSON.stringify(data)
           }).then(response => {
           console.log(response);
           getEmployees();
       })
    }
    edit = false; 
}

//for deleting
function deleteData(td) {
  
    let row = td.parentElement.parentElement;
    //to get the unique id in the first colume of table
     id = row.cells[0].innerHTML;
        row = td.parentElement.parentElement;
        document.getElementById("myTable").deleteRow(row.rowIndex);
        url = `${baseurl}/${id}`;
        fetch(url , {
            method  :   "DELETE"
        }).then(response => {
            console.log(response);
            getEmployees();
        })
    }


function editData(td) {
    let row = td.parentElement.parentElement;
    id  = row.cells[0].innerHTML;
    document.getElementById("name").value = row.cells[1].innerHTML;
    document.getElementById("email").value = row.cells[2].innerHTML;
    document.getElementById("salary").value = row.cells[3].innerHTML;
    edit = true;
}