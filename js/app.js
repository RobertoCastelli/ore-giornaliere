
// GENERAL VARIABLES
const dataDiOggi = document.getElementById('data')

// STEP 1 VARIABLES
let calendario = document.getElementById('calendario');
let diaria = document.getElementsByName('diaria');
let presenza = document.getElementsByName('presenza');
let ferie = document.getElementsByName('ferie');
let reperibilita = document.getElementsByName('reperibilita');

// STEP 2 VARIABLES
let commessa = document.getElementById('commessa');
let centrale = document.getElementById('centrale');
let assistente = document.getElementById('assistente');
let oreDiurne = document.getElementById('oreDiurne');
let oreNotturne = document.getElementById('oreNotturne');
let lavorazione = document.getElementById('lavorazione');

// STEP 3 VARIABLES
let invia = document.getElementById('btnInvia');
let aggiungi = document.getElementById('btnAggiungi');
let lista = document.getElementById('lista');

// CONTAINERS
let oreDiurneValue = 0;
let oreNotturneValue = 0;
let id = 0;
let jobArray = [];

// DISPLAY TODAY'S DATE IN TITLE
let dataCompleta = new Date();
let giornoDellaSettimana = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'][dataCompleta.getDay()];
let formatDataDiOggi = dataCompleta.getDate() + '-' + (dataCompleta.getMonth() + 1) + '-' + dataCompleta.getFullYear();
dataDiOggi.innerHTML = giornoDellaSettimana + ' ' + formatDataDiOggi;

// DISPLAY TODAY'S DATE ON DATE PICKER
let datePicker = new Date().toISOString().substr(0, 10);
calendario.value = datePicker;

// POPULATE DROPDOWN LIST
populateList(commesse, commessa);
populateList(assistenti, assistente);
populateList(ore, oreDiurne);
populateList(ore, oreNotturne);
populateList(lavorazioni, lavorazione);

// POPULATE JOB LIST
aggiungi.addEventListener('click', () => {
    populateJob();
    getDatiJob(); 
    centrale.value = '';
    id++;
});

// INVIA DATI FIREBASE
invia.addEventListener('click', () => {
    if (confirm('Conferma invio dati al server')) inviaDati(event);
});




// // --- var EMAIL 
// var assistArray = [];
// var emailArray = [];
// var emailUniqueArray = [];
// var bodyMessage1 = [];
// var oggetto = `Ore Giornaliere del ${calendario.value}`;

// // --- ARRAY ORE punto 0
// var oreArrayDiurne = [];
// var oreArrayNotturne = [];


// // --- enter AGGIUNGE ATTIVITA' in elenco
// aggiungi.addEventListener('click', function () {
//     if (txtVal.value == "" || centrale.value == "") {
//         alert("Inserire attività e nome centrale");
//     } else {
//         var oreDiurneVal = parseInt(oreDiurne.value);
//         var oreNotturneVal = parseInt(oreNotturne.value);
//         var item = `<li id=li-${id}>
//         <span class="commessaLi">${commessa.value}</span>
//         <span class="centraleLi">${centrale.value.toLowerCase()}:</span>
//         <span class="textInputLi">${txtVal.value.toUpperCase()}.</span>     
//         <span class="oreDiurneLi">Ore lavorate ${oreDiurneVal + oreNotturneVal}</span>  
//         <span class="oreNotturneLi">di cui nott. ${oreNotturneVal}.</span>               
//         <span class="rifLi">Rif. ${assistente.value}</span>
//         <i id="${id}" onclick="removeNode(event);"class="fa fa-trash-alt"></i> 
//         </li>`;
//         listNode.insertAdjacentHTML('beforeend', item);

//         // --- INSERISCE lavori dentro il BODY EMAIL
//         var bodyMessage = `Assistente: ${assistente.value}%0ACommessa: ${commessa.value}%0ACentrale: ${centrale.value}%0ALavoro: ${txtVal.value}%0AOre Diurne: ${oreDiurneVal}%0AOre Notturne: ${oreNotturneVal}%0A%0A`;
//         bodyMessage1.push(bodyMessage);

//         // --- INSERISCE ORE, ASSISTENTI negli array
//         oreArrayDiurne.push(oreDiurneVal);
//         oreArrayNotturne.push(opremireNotturneVal);
//         assistArray.push(assistente.value);
//     }
// });

// // --- icon ELIMINA n°1 ATTIVITA' 
// // --- icon SVUOTA ORE - EMAIL - ASSISTENTE 
// function removeNode(event) {
//     txtVal.focus();
//     if (confirm("Premi OK per eliminare l'attività selezionata")) {
//         const delNode = event.target;
//         var index = delNode.getAttribute('id');
//         oreArrayDiurne.splice(index, 1, 0);
//         oreArrayNotturne.splice(index, 1, 0);
//         assistArray.splice(index, 1, null);
//         emailArray.splice(index, 1, null);
//         emailUniqueArray.splice(index, 1, null);
//         bodyMessage1.splice(index, 1, null);
//         delNode.parentNode.remove();
//     }
// };

// // --- btn ELIMINA TUTTE LE ATTIVITA'
// clear.addEventListener('click', function () {
//     txtVal.focus();

//     // --- SVUOTA gli array 
//     oreArrayDiurne = [];
//     oreArrayNotturne = [];
//     assistArray = [];
//     emailArray = [];
//     emailUniqueArray = [];

//     if (listNode.innerHTML == "") {
//         alert("Tutte le attività sono state eliminate");
//     } else if (confirm("Premi OK per eliminare TUTTE le attività")) {
//         listNode.innerHTML = "";
//     }
// });

// // --- btn INVIA I DATI
// // --- CONTROLLO dei pulsanti RADIO
// // --- CONTROLLO POPOLAZIONE li 
// invia.addEventListener('click', function () {
//     for (i = 0; i < diaria.length; i++) {
//         if (diaria[i].checked) {
//             diariaVal = diaria[i].value;
//         }
//     };
//     for (i = 0; i < presenza.length; i++) {
//         if (presenza[i].checked) {
//             presenzaVal = presenza[i].value;
//         }
//     };
//     for (i = 0; i < reperibilita.length; i++) {
//         if (reperibilita[i].checked) {
//             reperibilitaVal = reperibilita[i].value;
//         }
//     };

//     // --- SOMMA TOTALE ORE notture e diurne
//     var sommaTotaliDiurne = oreArrayDiurne.reduce((a, b) => a + b, 0);
//     var sommaTotaliNotturne = oreArrayNotturne.reduce((a, b) => a + b, 0);

//     // --- switch Assistente <--> EMAIL
//     for (i = 0; i < assistArray.length; i++) {
//         switch (assistArray[i]) {
//             case 'Federico Inverardi':
//                 emailArray.push('f.inverardi@itafsrl.it');
//                 break;
//             case 'Marco Iozzo':
//                 emailArray.push('m.iozzo@itafsrl.it');
//                 break;
//             case 'Cesare Mattarini':
//                 emailArray.push('c.mattarini@itafsrl.it');
//                 break;
//             case 'Angelo Di Dedda':
//                 emailArray.push('a.didedda@itafsrl.it');
//                 break;
//             case 'Carmelo Scicolone':
//                 emailArray.push('c.scicolone@itafsrl.it');
//                 break;
//             case 'Simone Lo Carmine':
//                 emailArray.push('s.locarmine@itafsrl.it');
//                 break;
//             case 'Roberto Castelli':
//                 emailArray.push('r.castelli@itafsrl.it');
//                 break;
//             case 'Roberto Coltro':
//                 emailArray.push('r.coltro@itafsrl.it');
//                 break;
//             case 'Roberto Liguori':
//                 emailArray.push('r.liguori@zelari.it');
//                 break;
//         };
//     };
//     // --- elimina DUPLICATI EMAIL 
//     let emailUniqueArray = [...new Set(emailArray)];

//     // --- RECAP DATI prima dell'INVIO E-MAIL  
//     if (confirm(`Premi OK per inviare Ore Giornaliere
    
//     ${calendario.value} 
//     Diaria: ${diariaVal}
//     Ore totali: ${sommaTotaliDiurne + sommaTotaliNotturne}, di cui nott. ${sommaTotaliNotturne}
//     Ore permesso: ${presenzaVal}
//     Reperibilità: ${reperibilitaVal}`)) {

//         // --- BODY del messaggio EMAIL 
//         var bodyMessage2 = `INFORMAZIONI GLOBALI%0A%0AData: ${calendario.value}%0ADiaria: ${diariaVal}%0AOre_Totali (Diurne + Notturne): ${sommaTotaliDiurne + sommaTotaliNotturne}%0AOre_Notturne: ${sommaTotaliNotturne}%0AOre_Permesso: ${presenzaVal}%0AReperibilità: ${reperibilitaVal}%0A%0AINFORMAZIONI LAVORI%0A%0A${bodyMessage1}`;
//         window.location.href = 'mailto:' + emailUniqueArray + "?subject=" + oggetto + "&body=" + bodyMessage2;
//         console.log(emailUniqueArray);
//     }
// });