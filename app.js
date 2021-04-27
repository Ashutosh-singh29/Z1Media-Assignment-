const username = document.getElementById("Username");
const btn = document.getElementById("btn");
const innerbox = document.getElementById("user-con")
const alertbox = document.getElementById("alert-box");



fetch('https://api.github.com/search/users?q=tom').then((response) => {
    if (response.status === 200) {
        return response.json();
    }
    throw ServerError_msg();
}).then((Data) => {
    console.log(Data.items);
    const Userdata = Data.items;
    btn.addEventListener("click", function Search(e) {
        e.preventDefault();
        if (!username.value) {
            Error_msg();
        } else {
            screendata(Userdata);
        }
    });
}).catch(error => {
    console.log("Problem on server side");
})

function screendata(Userdata) {

    let Filterdata = Userdata.filter(function (d) {
        if (d.login !== username.value) {
            Notfound_msg();
        } else if (d.login === username.value) {
            innerbox.classList.add('user-container')
            success_msg();
            return d;
        }
    })
    Finaldata = Filterdata.map(function (a) {
        return `<div class="user-inner">
           <h2 class="User-head" >USER DETAILS</h2>
           <a href="${a.html_url}"><img src="${a.avatar_url}" class="image"></a>
           <a href="${a.html_url}"><h3>Name:${a.login}</h3></a>

       </div>`;
    })
    const element = document.createElement("div");
    element.innerHTML = Finaldata;
    if (Finaldata.length) {
        innerbox.appendChild(element);
    }
    // innerbox.innerHTML = Finaldata; If we want only one Div to show data of user 
    username.value = "";
}
function ServerError_msg() {
    alertbox.innerHTML = `<p>*Server Mantenance is Underway*</p>`;
    alertbox.classList.add('alert-red')

    setTimeout(() => {
        alertbox.innerHTML = "";
        alertbox.classList.remove('alert-red');
    }, 1000)
};
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