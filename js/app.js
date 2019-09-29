
// GENERAL VARIABLES
const dataDiOggi = document.getElementById('data')

// SELECT 1 VARIABLES
let calendario = document.getElementById('calendario');
let diaria = document.getElementsByName('diaria');
let presenza = document.getElementsByName('presenza');
let ferie = document.getElementsByName('ferie');
let reperibilita = document.getElementsByName('reperibilita');

// SELECT 2 VARIABLES
let commessa = document.getElementById('commessa');
let centrale = document.getElementById('centrale');
let assistente = document.getElementById('assistente');
let oreDiurne = document.getElementById('oreDiurne');
let oreNotturne = document.getElementById('oreNotturne');
let lavorazione = document.getElementById('lavorazione');

// BUTTON VARIABLE
let invia = document.getElementById('btnInvia');
let aggiungi = document.getElementById('btnAggiungi');

// OL-LI VARIABLES 
let lista = document.getElementById('lista');

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

// SET DEFAULT RADIO VALUE
setSelectedRadio(oreDiurne, 8);
setSelectedRadio(oreNotturne, 0);
setSelectedRadio(commessa, '13-0050');
setSelectedRadio(assistente, 'Amato');
setSelectedRadio(lavorazione, 'CRM');

// POPULATE JOB LIST 
aggiungi.addEventListener('click', () => {
    if (centrale.value == "") {
        alert("Inserire nome centrale");
    } else {
    populateJob();
    id++;
    }
});

// PUSH ORE 
// PUSH ASSISTENTI 
// PUSH EMAIL && DELETE DUPLICATES
// CONFIRM SEND && SEND EMAIL
invia.addEventListener('click', () => {
    pushOreInArray();
    pushAssistenteInArray();
    pushEmailInArray();
    noDuplicates(emailArray);
    confermaInvioDati();
    // if (confirm('Conferma invio dati al server')) inviaDati(event);
});

