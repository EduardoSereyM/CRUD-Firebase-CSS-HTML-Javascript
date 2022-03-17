import {
    saveTask,
    getTasks,
    onGetTask,
    deleteTask,
    updateTask,
    getTask
} from './firebase.js'



//   CARGAR DATOS -- READ

const taskform = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');

let editStatus = false;
let id = '';



window.addEventListener('DOMContentLoaded', async () => {


    

    // var querySnapshot = await getTasks();
    onGetTask((querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const task = doc.data(); // el .data() lo pasa a formato Javascript

            html += `

                <article class="message is-small messageTask">
                    <div class="message-header messageTaskHeader">
                    <p>${task.title}</p>
                    
                    <div class='btnsMessageTask'>
                    <button class='btn-edit' data-id='${doc.id}'>Edit</button> 
                    <button class="delete is-small btn-delete" aria-label="delete" data-id='${doc.id}'></button>
                    </div>

                    </div>
                    <div class="message-body">
                        ${task.description}
                    </div>
                </article>


                `
        })

        taskContainer.innerHTML = html;
        

        const elem = document.getElementById('.btnsMessageTask');
        if (html == "") {
            
            taskContainer.innerHTML = `
            <h3 class="avisoSE">Sin Elementos</h3>
            `
        }
        

        





        const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({
                target: {
                    dataset
                }
            }) => {
                let rc = confirm("¿Seguro que desea Eliminar?");
                if (rc) {
                    // se extraen las propiedades del objeto
                    deleteTask(dataset.id)
                }
            })
        })
        const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => { // se extraen las propiedades del objeto

                toglemodal();
                const title = document.querySelector('.tituloItem');
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()
                taskform['task-title'].value = task.title
                taskform['task-description'].value = task.description

                editStatus = true;
                // id = e.target.dataset.id;
                id = doc.id;

                title.innerHTML = "Update Item";

                // taskform['btn-task-save'].innerText = 'Update';

            })
        })
    })
})


taskform.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskform['task-title'];
    const description = taskform['task-description'];

    description.classList.remove("is-danger");
    document.querySelector('.taskDescriptionError').style.visibility = 'hidden';
    title.classList.remove("is-danger");
    document.querySelector('.taskTitleError').style.visibility = 'hidden';

    if (!editStatus) {

        if (title.value.length < 3) {
            title.classList.add("is-danger");
            document.querySelector('.taskTitleError').style.visibility = 'visible';


        } else if (description.value.length < 3) {
            description.classList.add("is-danger");
            document.querySelector('.taskDescriptionError').style.visibility = 'visible';


        } else {
            saveTask(title.value, description.value);

            editStatus = false;
            toglemodal();
            taskform.reset();
        }

    } else {
        if (title.value.length < 3) {
            title.classList.add("is-danger");
            document.querySelector('.taskTitleError').style.visibility = 'visible';


        } else if (description.value.length < 3) {
            description.classList.add("is-danger");
            document.querySelector('.taskDescriptionError').style.visibility = 'visible';


        } else {
            updateTask(id, {
                title: title.value,
                description: description.value

            });
            editStatus = false;
            toglemodal();

        }
    }

})

const btnModal = document.querySelector('.btnModal');
btnModal.addEventListener('click', () => {

    console.log(document.querySelector('#task-description'))
    document.querySelector('#task-title').value = '';
    document.querySelector('#task-description').value = '';
    toglemodal();

});

const activateModal = document.querySelector('.modal');
const btnDeleteModal = document.querySelector('.delete');
const btnCancelModal = document.querySelector('.btnCancelModal');

function toglemodal() {
    activateModal.classList.toggle('is-active');
}

btnDeleteModal.addEventListener('click', toglemodal);
btnCancelModal.addEventListener('click', toglemodal);