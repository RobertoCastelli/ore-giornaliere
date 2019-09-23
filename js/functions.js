function populateList(arr, idSelect) {
    arr.forEach(element => {
        let option = document.createElement('OPTION');
        let testo = document.createTextNode(element);
        option.appendChild(testo);
        option.setAttribute('value', element);
        idSelect.insertBefore(option, idSelect.firstChild);
    });
}

function populateJob() {
    if (centrale.value == "") {
        alert("Inserire nome centrale");
        } else {
        let oreDiurneValue = parseInt(oreDiurne.value);
        let oreNotturneValue = parseInt(oreNotturne.value);
        let job =
        `<li id=${id}>
        <span class="commessaLi">${commessa.value}</span>
        <span>${centrale.value}</span>
        <span class="oreLi">Ore ${oreDiurneValue + oreNotturneValue}</span>  
        <span>Rif. ${assistente.value}</span>
        <i onclick="removeJob(event);" class="fa fa-trash-alt fa-lg"></i> 
        </li>`;
        lista.insertAdjacentHTML('beforeend', job);
    }
}

function removeJob(event) {
    event.target.parentNode.remove();
}


function inviaDati() {
    console.log('PROVA');
}

