function registerUser(e) {
    e.preventDefault();
    alert("form is submitted");

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone_no = document.getElementById('tel').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;


    var obj = {
        name, email, phone_no, date, time
    };

    axios.post("http://localhost:9000/user/add-user", obj)
        .then((response) => {
            DispUser(response.data);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong...<h4>"
            console.log(err)
        })
}
window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("http://localhost:9000/user/get-users")
        .then((response) => {
            //console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                DispUser(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(data)
})
function DispUser(obj) {
    var pElement = document.getElementById('list');
    var cElement = document.createElement('li');
    cElement.textContent = obj.name + " - " + obj.email + " - " + obj.phone_no + " - " + obj.date + " - " + obj.time + " ";

    var del = document.createElement('input');
    del.type = 'button';
    del.value = 'Delete';

    function deleteUser(userId) {
        axios.delete('http://localhost:9000/user/delete-user/'+userId)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    var edit = document.createElement('input');
    edit.type = 'button';
    edit.value = 'Edit';

    function editUser(userId) {
        /*axios.put('https://crudcrud.com/api/3792407b84f04114b5c676e1b789c1da/appointment_data/'+userId)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })*/
            console.log()
    }
    cElement.appendChild(edit);
    cElement.appendChild(del);

    del.onclick = () => {
        pElement.removeChild(cElement);
        deleteUser(obj._id);
    }
    edit.onclick = () => {

        pElement.removeChild(cElement);
        editUser(obj._id);
        deleteUser(obj._id);
        document.getElementById('name').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('tel').value = obj.phone_no;
        document.getElementById('date').value = obj.date;
        document.getElementById('time').value = obj.time;
    }

    pElement.appendChild(cElement);
}