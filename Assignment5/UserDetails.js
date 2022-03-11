var formData=JSON.parse(localStorage.getItem("formData"))  || [] ;
 const addData = (e) =>{
    e.preventDefault();

    // get all input
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const phnum = document.getElementById("phnum").value;

    

    // get data from local storage or set it empty
    // var formData=JSON.parse(localStorage.getItem("formData"))  || [] ;

    // console.log(formData)
    const index=formData.findIndex(data =>data.email===email);
    console.log(index);

    // check if phone number is greater than 10
    if((document.getElementById("phnum").value).length<10 ){
        alert("Invalid phone number!!....");
        return;
    }
    //check for duplicate mail address if found duplicate show message and return
    // if(index!=-1){
    //     alert("Email already exist please enter different Email");
    //     return;
    // }
   


    // get the ID value or set it to -1 if not exist ( if exist, it means that it is editing)
    var ID = document.getElementById("id").value || -1

    // Find the index of the id in the form
    objIndex = formData.findIndex((obj => obj.id == ID));
    
    // check if the index exist i.e equal to 0 or greater then update the value
    if(objIndex >= 0)
    {
        formData[objIndex].name = name;
        formData[objIndex].email = email;
        formData[objIndex].age = age;
        formData[objIndex].phnum = phnum;
        
    }
    else{
        // else insert new value
        formData.push({
            name: name,
            email: email,
            age: age,
            phnum: phnum,
            id: Math.floor(Math.random() * 10000) + 99999, 
            //generating a unique ID
        });
    }
    
    // set the local storage
    localStorage.setItem("formData",JSON.stringify(formData));
    
    // display the information
    dispData();

    // clear all input value
    clear();

}
function dispData(formData){
    // If data exist in the storage
    if(localStorage.getItem("formData")){
    
    var output = document.querySelector("tbody");
    output.innerHTML = "";   
    i=0;
    // loop through it and display the data
    JSON.parse(localStorage.getItem("formData")).forEach(data =>{
        output.innerHTML += `
                <tr>      
                <td>${data.name}</td>                  
                <td>${data.email}</td>                  
                <td>${data.age}</td>
                <td>${data.phnum}</td>
                <td><button type="button" id="btndt" onclick="deleteData(`+i+`);" class="btn btn-primary">Delete</button></td>
                <td><button type="button" id="btnEdit" onclick="editData(`+i+`);" class="btn btn-primary">Edit</button></td>
                </tr>
        `; 
        i++;
    });
}

}

// display data on page load
 dispData(); 

// delete data function
function deleteData(id){
    let formData=JSON.parse(localStorage.getItem('formData'));
    let delArr=[...formData];
    delArr.splice(id,1);
    formData=[...delArr]
    localStorage.setItem('formData',JSON.stringify(formData));
    dispData();
}

// clear input function
function clear(){
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("age").value="";
    document.getElementById("phnum").value="";
    document.getElementById("id").value="";
}

// edit data function
function editData(id){
    let arr=JSON.parse(localStorage.getItem('formData'));
    document.getElementById('name').value=arr[id].name;
    document.getElementById('email').value=arr[id].email;
    document.getElementById('age').value=arr[id].age;
    document.getElementById('phnum').value=arr[id].phnum;
    document.getElementById('id').value=arr[id].id; 
    // using id to edit and identify this editing
}

// //Search function for table based on name
// function myFunction(event) {
//    var table = document.getElementById("myTable");
   
//     let formData=JSON.parse(localStorage.getItem('formData'));
    
//     searchUser = event.target.value;
//     console.log(searchUser)
//     myUsers = formData.filter(user => user.name.includes(searchUser) || user.email.includes(searchUser));
//     console.log(myUsers)

//     // dispData(myUsers);

    


    function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            console.log(td)
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(tr[i])
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        
        }  
             
    }
   
    }