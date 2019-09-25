
// POPOLA I SELECT -> OPTION
function populateList(arr, idSelect) {
  arr.forEach(element => {
    let option = document.createElement("OPTION");
    let testo = document.createTextNode(element);
    option.appendChild(testo);
    option.setAttribute("value", element);
    idSelect.insertBefore(option, idSelect.firstChild);
  });
}
// AGGIUNGE LAVORO NELL'ELENCO UL
function populateJob() {
  if (centrale.value == "") {
    alert("Inserire nome centrale");
  } else {
    oreDiurneValue = parseInt(oreDiurne.value);
    oreNotturneValue = parseInt(oreNotturne.value);
    let job = `<li id=${id}>
        <span class="commessaLi">${commessa.value}</span>
        <span>${centrale.value.toUpperCase()}</span>
        <span>${lavorazione.value} - </span>
        <span>${assistente.value} ore </span>
        <span class="oreLi">${oreDiurneValue + oreNotturneValue}</span>  
        <i onclick="removeJob(event);" class="fa fa-trash-alt"></i> 
        </li>`;
    lista.insertAdjacentHTML("beforeend", job);
  }
}

// PRENDE I DATI DI OGNI JOB
function getDatiJob() {
  let datiJob = {
    commessa: commessa.value,
    centrale: centrale.value,
    assistente: assistente.value,
    oreDiurne: oreDiurneValue,
    oreNotturne: oreNotturneValue,
    lavorazione: lavorazione.value
  }
  jobArray.push(datiJob);
}

// INVIA I DATI AL DATABASE
function inviaDati(event) {
  event.preventDefault();
  db.collection("ore-mensili").add({
      giorno: calendario.value,
      diaria: checkRadio(diaria),
      permessi: checkRadio(presenza),
      reperibilita: checkRadio(reperibilita),
      datiJob: jobArray
  });
}

// RIMUOVE LAVORO DALL'ELENCO UL
function removeJob(event) {
  event.target.parentNode.remove();
}

// RITORNA IL VALORE DEI RADIO 
function checkRadio(name) {
  for (element in name) {
    if (name[element].checked) return name[element].value;
  }
}





