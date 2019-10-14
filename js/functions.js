
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
  oreDiurneValue = parseInt(oreDiurne.value);
  oreNotturneValue = parseInt(oreNotturne.value);
  oreTotaliValue = oreDiurneValue + oreNotturneValue;
  // HTML STRUCTURE FOR JOB
  let job =
    `<li id=${id}>
          <div>
            <span class="commessaLi"> >> ${commessa.value}</span>
            <span><i class="fas fa-long-arrow-alt-right"></i></span>
            <span class="oreTotaliLi">${oreTotaliValue}</span>  
            <span> ore di cui notturne </span>
            <span><i class="fas fa-long-arrow-alt-right"></i></span>
            <span class="oreNotturneLi">${oreNotturneValue}</span>  
          </div>
          <span">${centrale.value.toUpperCase()}</span">
          <span>${lavorazione.value}</span>
          <span class="assistenteLi">${assistente.value}</span>
          <i onclick="removeJob(event);" class="fa fa-trash-alt trash"></i>
        </li>`;
  lista.insertAdjacentHTML("beforeend", job);
}

// INVIA I DATI AL DATABASE
function inviaDati(event) {
  event.preventDefault();
  db.collection("ore-mensili").add({
    giorno: calendario.value,
    diaria: checkRadio(diaria),
    permessi: checkRadio(presenza),
    reperibilita: checkRadio(reperibilita)
  })
    .then(() => console.log('dati inviati correttamente'))
    .catch(err => console.log(err));
}

// PRENDE I DATI DAL DATABASE
function getDatiFirebase() {
  db.collection("ore-mensili").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let jobFirebase = doc.data();
        console.log(jobFirebase);
      })
    })
}

// PUSH ORE IN ARRAY --> DA MIGLIORARE <--
function pushOreInArray() {
  let oreTotaliLi = document.querySelectorAll('.oreTotaliLi');
  let oreNotturneLi = document.querySelectorAll('.oreNotturneLi');
  oreTotaliLi.forEach(element => oreTotaliArray.push(parseInt(element.textContent)));
  oreNotturneLi.forEach(element => oreNotturneArray.push(parseInt(element.textContent)));
  console.log(oreTotaliArray);
  console.log(oreNotturneArray);
}

// PUSH ASSISTENTE IN ARRAY --> DA MIGLIORARE <--
function pushAssistenteInArray() {
  let assistenteLi = document.querySelectorAll('.assistenteLi');
  assistenteLi.forEach(element => assistenteArray.push(element.textContent));
  console.log(assistenteArray);
}

// PUSH LAVORI IN ARRAY 
function pushJobInArray() {
  let testoMailLavoro = lista.textContent;
  //   `Assistente: ${assistente.value}%0A
  //   Commessa: ${commessa.value}%0A
  //   Centrale: ${centrale.value.toUpperCase()}%0A
  //   Lavoro: ${lavorazione.value}%0A
  //   Ore Diurne: ${oreDiurneValue}%0A
  //   Ore Notturne: ${oreNotturneValue}%0A%0A`;
  testoMailLavori.push(testoMailLavoro);
  console.log(testoMailLavori);
}

// PUSH EMAIL IN ARRAY
function pushEmailInArray() {
  console.log(assistenteArray);
  for (i = 0; i < assistenteArray.length; i++) {
    switch (assistenteArray[i]) {
      case 'Inverardi':
        emailArray.push('f.inverardi@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Iozzo':
        emailArray.push('m.iozzo@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Mattarini':
        emailArray.push('c.mattarini@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Di Dedda':
        emailArray.push('a.didedda@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Scicolone':
        emailArray.push('c.scicolone@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Amato':
        emailArray.push('f.amato@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Gerna':
        emailArray.push('f.amato@itafsrl.it');
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Castelli':
        emailArray.push('r.castelli@itafsrl.it');
        break;
      case 'Coltro':
        emailArray.push('r.coltro@itafsrl.it');
        break;
      case 'Liguori':
        emailArray.push('r.liguori@zelari.it');
        break;
    }
  }
}

// CONFERMA INVIO DATI
function confermaInvioDati() {
  if (confirm(
    `Premi OK per inviare Ore Giornaliere

    giorno: ${calendario.value}
    diaria: ${checkRadio(diaria)}
    permessi: ${checkRadio(presenza)}
    reperibilita: ${checkRadio(reperibilita)}
    ore: ${sommaArray(oreTotaliArray)}
    di cui notturne: ${sommaArray(oreNotturneArray)}`)){
    invioDati();
    }
    // ANNULLA ULTIMO INSERIMENTO
      oreTotaliArray = [];
      oreNotturneArray = [];
      assistenteArray = [];
      testoMailLavori = [];
}


// INVIO DATI VIA EMAIL
function invioDati() {
  let oggettoMail = `ore giornaliere del ${calendario.value}`;
  let testoMail =
    `INFORMAZIONI GLOBALI%0A%0A
  Data: ${calendario.value}%0A
  Diaria: ${checkRadio(diaria)}%0A
  Ore_Totali (Diurne + Notturne): ${sommaArray(oreTotaliArray)}%0A
  Ore_Notturne: ${sommaArray(oreNotturneArray)}%0A
  Ore_Permesso: ${checkRadio(presenza)}%0A
  Reperibilità: ${checkRadio(reperibilita)}%0A%0A

  INFORMAZIONI LAVORI%0A%0A
  ${testoMailLavori}`;

  window.location.href = 'mailto:' + noDuplicateArray + "?subject=" + oggettoMail + "&body=" + testoMail;
}

// SOMMA ARRAY
function sommaArray(array) {
  array = array.reduce((a, b) => a + b, 0);
  return array;
}

// ARRAY WITH NO DUPLICATES
function noDuplicates(array) {
  noDuplicateArray = [...new Set(array)];
}

// RIMUOVE LAVORO DALL'ELENCO UL-LI
function removeJob(event) {
  event.target.parentNode.remove();
}

// SET DEFAULT RADIO VALUE
function setSelectedRadio(select, value) {
  for (i = 0; i < select.options.length; i++) {
    if (select.options[i].value == value) {
      select.options[i].selected = true;
    }
  }
}

// RESTITUISCE IL VALORE DEI RADIO 
function checkRadio(name) {
  for (element in name) {
    if (name[element].checked) return name[element].value;
  }
}
