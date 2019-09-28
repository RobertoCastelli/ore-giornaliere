
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
    let job = 
        `<li id=${id}>
          <div>
            <span class="commessaLi">${commessa.value}</span>
            <span class="oreTotaliLi"> - ore ${oreDiurneValue + oreNotturneValue}</span>  
          </div>
          <span">${centrale.value.toUpperCase()}</span">
          <span> - ${lavorazione.value}</span>
          <span> - ${assistente.value}</span>
          <i onclick="removeJob(event);" class="fa fa-trash-alt"></i> 
        </li>`;
    lista.insertAdjacentHTML("beforeend", job);
  }
}

// INVIA I DATI AL DATABASE
function inviaDati(event) {
  event.preventDefault();
  db.collection("ore-mensili").add({
      giorno: calendario.value,
      diaria: checkRadio(diaria),
      permessi: checkRadio(presenza),
      reperibilita: checkRadio(reperibilita),
      ore_130050: ore_130050.reduce((a, b)=> a + b, 0),
      ore_130055: ore_130055.reduce((a, b)=> a + b, 0),
      ore_140012: ore_140012.reduce((a, b)=> a + b, 0),
      ore_140013: ore_140013.reduce((a, b)=> a + b, 0),
      ore_160006: ore_160006.reduce((a, b)=> a + b, 0),
      ore_160031: ore_160031.reduce((a, b)=> a + b, 0),
      ore_170018: ore_170018.reduce((a, b)=> a + b, 0),
      ore_170038: ore_170038.reduce((a, b)=> a + b, 0),
      ore_170044: ore_170044.reduce((a, b)=> a + b, 0),
      ore_170062: ore_170062.reduce((a, b)=> a + b, 0),
      ore_170086: ore_170086.reduce((a, b)=> a + b, 0),
      ore_attrezzatura: ore_attrezzatura.reduce((a, b)=> a + b, 0),
      ore_notturne: oreNotturneArray.reduce((a, b)=> a + b, 0)
  })
    .then(() => {console.log('dati inviati correttamente')})
    .catch(err => console.log(err));
}

// PRENDE I DATI DAL DATABASE
function getDatiFirebase() {
  db.collection("ore-mensili").get().then(snapshot => {
    snapshot.forEach(doc => {
      let jobFirebase = doc.data();
      console.log(jobFirebase);
    })
  })
}

// PUSH ORE JOB IN COMMESSA
function pushOreInCommessa() {
  switch (commessa.value) {
    case "13-0050":
      ore_130050.push(oreDiurneValue + oreNotturneValue);
      break;
    case "13-0055":
      ore_130055.push(oreDiurneValue + oreNotturneValue);
      break;
    case "14-0012":
      ore_140012.push(oreDiurneValue + oreNotturneValue);
      break;
    case "14-0013":
      ore_140013.push(oreDiurneValue + oreNotturneValue);
      break;
    case "16-0006":
      ore_160006.push(oreDiurneValue + oreNotturneValue);
      break;
    case "16-0031":
      ore_160031.push(oreDiurneValue + oreNotturneValue);
      break;
    case "17-0018":
      ore_170018.push(oreDiurneValue + oreNotturneValue);
      break;
    case "17-0038":
      ore_170038.push(oreDiurneValue + oreNotturneValue);
      break;
    case "17-0044":
      ore_170044.push(oreDiurneValue + oreNotturneValue);
      break;
    case "17-0062":
      ore_170062.push(oreDiurneValue + oreNotturneValue);
      break;
    case "17-0086":
      ore_170086.push(oreDiurneValue + oreNotturneValue);
      break;
    case "attrezzatura":
      ore_attrezzatura.push(oreDiurneValue + oreNotturneValue);
      break;
  }
}

// PUSH ORE NOTTURNE
function pushOreNotturne() {
  oreNotturneArray.push(oreNotturneValue);
}

// RIMUOVE LAVORO DALL'ELENCO UL
function removeJob(event) {
  event.target.parentNode.remove();
}

// RESTITUISCE IL VALORE DEI RADIO 
function checkRadio(name) {
  for (element in name) {
    if (name[element].checked) return name[element].value;
  }
}
