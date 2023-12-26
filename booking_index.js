var form=document.getElementById('addForm');
var itemsList=document.getElementById('items');
var del=document.querySelectorAll('#deleteBtn')
var countID=0;
var flag=null;
form.addEventListener('submit',addPerson);
itemsList.addEventListener('click',editPerson);

//itemsList.addEventListener('click',removePerson);

	//@CrossOrigin(origins = "http://localhost:8080")

function addPerson(e)
{
    e.preventDefault();

    // if(flag!==null)
    // {
    //     var li=e.target.parentElement;
    //     //var itemID=li.id;
    //     console.log(li);
    //     console.log(li.id);

    //     //CREATE NEW OBJ:
    //     const obj={
    //     name: document.getElementById('username').value,
    //     email:document.getElementById('email').value,
    //     phn: document.getElementById('phn').value
    //     };
    //     axios
    //           .delete(
    //            `https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData/${li.id}`
    //           )
    //           .then((res) => {
    //             console.log("object deleted");
    //             //ele.remove();
    //           })
    //           .catch((err) => console.log(err));
    //     //STORE IN CLOUD:
    //      axios.put(`https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData/${li.id}`,obj)
    //         .then((res)=>{
    //             console.log(res);
    //             flag=null;})
    //         .catch(err=>console.log(err));
    // }
    // else{
            //CREATE NEW OBJ:
    const obj={
        name: document.getElementById('username').value,
        email:document.getElementById('email').value,
        phn: document.getElementById('phn').value
    };
    //STORE IN CLOUD:
    axios.post('https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData',obj)
        .then((res)=>console.log(res))
        .catch(err=>console.log(err));

        showOutput(obj);

   // }
    
}

function showOutput(res) {

//create new person
    var li=document.createElement('li');
    console.log(res);
   // console.log(res.data._id);
//add class
    li.className='list-group-item';
    li.id=res._id;

//add text node
    var str= res.name +"-" +res.email + "-" +res.phn;
    li.textContent=str;
   
//create delete button
    var input=document.createElement('input');

//add class name for delete button
    input.type="button";
    input.className="btn btn-danger btn-sm float-right delete";
    input.id="deleteBtn";
    input.value="DELETE";

//CREATE EDIT BUTTON
    var edit=document.createElement('input');
    edit.type="button";
    edit.className="btn btn-danger btn-sm float-right edit";
    edit.id="editBtn";
    edit.value="EDIT";

//append button to li
    li.appendChild(input);
    li.appendChild(edit);
    itemsList.appendChild(li);

    console.log(li);
  }
  


function editPerson(e)
{
    console.log("in edit");
    if(e.target.classList.contains('edit'))
    {
        console.log("in edit2");

        //get the target li
        var li=e.target.parentElement;
        var itemID=li.id;
        console.log(document.getElementById(itemID).textContent);
        console.log("id is "+e.target.parentElement.id);

        //store the text in a string array
        var s=new Array();
        s=document.getElementById(itemID).textContent.split('-');
        console.log(s);

        //populate the input boxes
        document.getElementById('username').value=s[0];
        document.getElementById('email').value=s[1];
        document.getElementById('phn').value=s[2];


        //edit from the list
        flag=true;
        //addPerson(e);
       // removePerson(e);
       var li=e.target.parentElement;
       console.log(li.id);

       axios
       .delete(
        `https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData/${li.id}`
       )
       .then((res) => {
         console.log("object deleted");
         //ele.remove();
       })
       .catch((err) => console.log(err));

    }
    
}

//TO DELETE A PERSON
itemsList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete'))
    {
        //console.log(2);
        if(confirm('Are you sure?'))
        {
            var li=e.target.parentElement;
            console.log(li.id);
            axios
              .delete(
               `https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData/${li.id}`
              )
              .then((res) => {
                console.log("object deleted");
                //ele.remove();
              })
              .catch((err) => console.log(err));
        }

    }
});

function removePerson(e)
{

    if(e.target.classList.contains('delete'))
    {
        //console.log(2);
        if(confirm('Are you sure?'))
        {
            var li=e.target.parentElement;
            console.log(li.id);
            axios
              .delete(
               `https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData/${li.id}`
              )
              .then((res) => {
                console.log("object deleted");
                //ele.remove();
              })
              .catch((err) => console.log(err));
        }

    }
    
}

window.addEventListener("load", () => {
    //flag=false;
    axios
      .get(
        "https://crudcrud.com/api/cd0a7b7f713e4509abe0a7537538e7d2/bookingData"
      )
      .then((res) => {
        const data = res.data;
        data.forEach((val) => {
          showOutput(val);
        });
      })
      .catch((err) => console.log(err));
  });