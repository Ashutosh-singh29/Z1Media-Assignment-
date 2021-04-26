const username = document.getElementById("Username");
const btn = document.getElementById("btn");
const innerbox = document.getElementById("user-con")
const alertbox = document.getElementById("alert-box");



fetch('https://reqres.in/api/users?page=2').then((response) => {
    return response.json();
}).then((Data) => {
    console.log(Data.data);
    const Userdata = Data.data;
    btn.addEventListener("click", function Search(e) {
        e.preventDefault();
        if (!username.value) {
            Error_msg();
        } else {
            screendata(Userdata);
        }
    });
})

function screendata(Userdata) {

    let Filterdata = Userdata.filter(function (d) {
        if (d.first_name !== username.value) {
            Notfound_msg();
        } else if (d.first_name === username.value) {
            innerbox.classList.add('user-container')
            success_msg();
            return d;
        }
    })
    Finaldata = Filterdata.map(function (a) {
        return `<div class="user-inner">
           <h2 class="User-head" >USER DETAILS</h2>
           <h3>First Name:${a.first_name}</h3>
           <h3>Last Name: ${a.last_name}</h3>
           <h3>Email Id: ${a.email}</h3>

       </div>`;
    })
    const element = document.createElement("div");
    element.innerHTML = Finaldata;
    if(Finaldata.length){
        innerbox.appendChild(element);
    }
   // innerbox.innerHTML = Finaldata; If we want only one Div to show data of user 
    username.value = "";
}
function Error_msg() {
    alertbox.innerHTML = `<p>*Cannot leave the User name blank*</p>`;
    alertbox.classList.add('alert-red')

    setTimeout(() => {
        alertbox.innerHTML = "";
        alertbox.classList.remove('alert-red');
    }, 1000)
};
function Notfound_msg() {
    alertbox.innerHTML = `<p>*Data is not registered here*</p>`;
    alertbox.classList.add('alert-red')

    setTimeout(() => {
        alertbox.innerHTML = "";
        alertbox.classList.remove('alert-red');
    }, 1000)
};
function success_msg() {
    alertbox.innerHTML = `<p>*Data is Successfully Fetched*</p>`;
    alertbox.classList.add('alert-green');
    setTimeout(() => {
        alertbox.innerHTML = "";
        alertbox.classList.remove('alert-green');
    }, 1000)
}