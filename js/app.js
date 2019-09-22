// --- FOCUS PUNTATORE t0
window.onload = function () {
    txtVal.focus();
}

// --- var ELENCO
var listNode = document.getElementById('lista');
var txtVal = document.getElementById('txtVal');

// --- var BOTTONI
var clear = document.getElementById('btnClear');
var aggiungi = document.getElementById('btnAggiungi');
var invia = document.getElementById('btnInvia');

// --- var STEP 1
var calendario = document.getElementById('calendario');
var diaria = document.getElementsByName('diaria');
var reperibilita = document.getElementsByName('reperibilita');
var presenza = document.getElementsByName('presenza');

// --- var STEP 2
var assistente = document.getElementById('assistente');
var oreDiurne = document.getElementById('oreDiurne');
var oreNotturne = document.getElementById('oreNotturne');
var commessa = document.getElementById('commessa');
var centrale = document.getElementById('centrale');

// --- stringa DATA 
var data = new Date();
var todayData = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
var giorno = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'][new Date().getDay()];
document.getElementById('data').innerHTML = giorno + ' ' + todayData;

// --- CALENDARIO "today"
// calendario.valueAsDate = new Date();

// --- var EMAIL 
var assistArray = [];
var emailArray = [];
var emailUniqueArray = [];
var bodyMessage1 = [];
var oggetto = `Ore Giornaliere del ${calendario.value}`;

// --- ARRAY ORE punto 0
var oreArrayDiurne = [];
var oreArrayNotturne = [];

// --- var CONTATORE id
var id = 0;

// --- enter AGGIUNGE ATTIVITA' in elenco
aggiungi.addEventListener('click', function () {
    if (txtVal.value == "" || centrale.value == "") {
        alert("Inserire attività e nome centrale");
    } else {
        var oreDiurneVal = parseInt(oreDiurne.value);
        var oreNotturneVal = parseInt(oreNotturne.value);
        var item = `<li id=li-${id}>
        <span class="commessaLi">${commessa.value}</span>
        <span class="centraleLi">${centrale.value.toLowerCase()}:</span>
        <span class="textInputLi">${txtVal.value.toUpperCase()}.</span>     
        <span class="oreDiurneLi">Ore lavorate ${oreDiurneVal + oreNotturneVal}</span>  
        <span class="oreNotturneLi">di cui nott. ${oreNotturneVal}.</span>               
        <span class="rifLi">Rif. ${assistente.value}</span>
        <i id="${id}" onclick="removeNode(event);"class="fa fa-trash-alt"></i> 
        </li>`;
        listNode.insertAdjacentHTML('beforeend', item);

        // --- INSERISCE lavori dentro il BODY EMAIL
        var bodyMessage = `Assistente: ${assistente.value}%0ACommessa: ${commessa.value}%0ACentrale: ${centrale.value}%0ALavoro: ${txtVal.value}%0AOre Diurne: ${oreDiurneVal}%0AOre Notturne: ${oreNotturneVal}%0A%0A`;
        bodyMessage1.push(bodyMessage);

        // --- INSERISCE ORE, ASSISTENTI negli array
        oreArrayDiurne.push(oreDiurneVal);
        oreArrayNotturne.push(opremireNotturneVal);
        assistArray.push(assistente.value);

        // --- SVUOTA le textbox, FOCUS puntatore, INCREMENTA id
        txtVal.value = "";
        centrale.value = "";
        txtVal.focus();
        id++;
    }
});

// --- icon ELIMINA n°1 ATTIVITA' 
// --- icon SVUOTA ORE - EMAIL - ASSISTENTE 
function removeNode(event) {
    txtVal.focus();
    if (confirm("Premi OK per eliminare l'attività selezionata")) {
        const delNode = event.target;
        var index = delNode.getAttribute('id');
        oreArrayDiurne.splice(index, 1, 0);
        oreArrayNotturne.splice(index, 1, 0);
        assistArray.splice(index, 1, null);
        emailArray.splice(index, 1, null);
        emailUniqueArray.splice(index, 1, null);
        bodyMessage1.splice(index, 1, null);
        delNode.parentNode.remove();
    }
};

// --- btn ELIMINA TUTTE LE ATTIVITA'
clear.addEventListener('click', function () {
    txtVal.focus();

    // --- SVUOTA gli array 
    oreArrayDiurne = [];
    oreArrayNotturne = [];
    assistArray = [];
    emailArray = [];
    emailUniqueArray = [];

    if (listNode.innerHTML == "") {
        alert("Tutte le attività sono state eliminate");
    } else if (confirm("Premi OK per eliminare TUTTE le attività")) {
        listNode.innerHTML = "";
    }
});

// --- btn INVIA I DATI
// --- CONTROLLO dei pulsanti RADIO
// --- CONTROLLO POPOLAZIONE li 
invia.addEventListener('click', function () {
    for (i = 0; i < diaria.length; i++) {
        if (diaria[i].checked) {
            diariaVal = diaria[i].value;
        }
    };
    for (i = 0; i < presenza.length; i++) {
        if (presenza[i].checked) {
            presenzaVal = presenza[i].value;
        }
    };
    for (i = 0; i < reperibilita.length; i++) {
        if (reperibilita[i].checked) {
            reperibilitaVal = reperibilita[i].value;
        }
    };

    // --- SOMMA TOTALE ORE notture e diurne
    var sommaTotaliDiurne = oreArrayDiurne.reduce((a, b) => a + b, 0);
    var sommaTotaliNotturne = oreArrayNotturne.reduce((a, b) => a + b, 0);

    // --- switch Assistente <--> EMAIL
    for (i = 0; i < assistArray.length; i++) {
        switch (assistArray[i]) {
            case 'Federico Inverardi':
                emailArray.push('f.inverardi@itafsrl.it');
                break;
            case 'Marco Iozzo':
                emailArray.push('m.iozzo@itafsrl.it');
                break;
            case 'Cesare Mattarini':
                emailArray.push('c.mattarini@itafsrl.it');
                break;
            case 'Angelo Di Dedda':
                emailArray.push('a.didedda@itafsrl.it');
                break;
            case 'Carmelo Scicolone':
                emailArray.push('c.scicolone@itafsrl.it');
                break;
            case 'Simone Lo Carmine':
                emailArray.push('s.locarmine@itafsrl.it');
                break;
            case 'Roberto Castelli':
                emailArray.push('r.castelli@itafsrl.it');
                break;
            case 'Roberto Coltro':
                emailArray.push('r.coltro@itafsrl.it');
                break;
            case 'Roberto Liguori':
                emailArray.push('r.liguori@zelari.it');
                break;
        };
    };
    // --- elimina DUPLICATI EMAIL 
    let emailUniqueArray = [...new Set(emailArray)];

    // --- RECAP DATI prima dell'INVIO E-MAIL  
    if (confirm(`Premi OK per inviare Ore Giornaliere
    
    ${calendario.value} 
    Diaria: ${diariaVal}
    Ore totali: ${sommaTotaliDiurne + sommaTotaliNotturne}, di cui nott. ${sommaTotaliNotturne}
    Ore permesso: ${presenzaVal}
    Reperibilità: ${reperibilitaVal}`)) {

        // --- BODY del messaggio EMAIL 
        var bodyMessage2 = `INFORMAZIONI GLOBALI%0A%0AData: ${calendario.value}%0ADiaria: ${diariaVal}%0AOre_Totali (Diurne + Notturne): ${sommaTotaliDiurne + sommaTotaliNotturne}%0AOre_Notturne: ${sommaTotaliNotturne}%0AOre_Permesso: ${presenzaVal}%0AReperibilità: ${reperibilitaVal}%0A%0AINFORMAZIONI LAVORI%0A%0A${bodyMessage1}`;
        window.location.href = 'mailto:' + emailUniqueArray + "?subject=" + oggetto + "&body=" + bodyMessage2;
        console.log(emailUniqueArray);
    }
});