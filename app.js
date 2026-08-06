// ======================================
// BLACKVAULT V4
// APP.JS - PARTE 1
// ======================================

// CONFIG

const SENHA = "75740946";
const META = 6190;
const DEPOSITO = 770;

// TELAS

const boot = document.getElementById("boot-screen");
const login = document.getElementById("login-screen");
const hack = document.getElementById("hack-screen");
const dashboard = document.getElementById("dashboard");
const goal = document.getElementById("goal-screen");
const success = document.getElementById("success-screen");

// BOOT

const barra = document.getElementById("barra");
const bootPorcentagem = document.getElementById("bootPorcentagem");
const status = document.getElementById("status");

// LOGIN

const senha = document.getElementById("senha");
const entrar = document.getElementById("entrar");
const resetar = document.getElementById("resetar");
const mensagem = document.getElementById("mensagem");

// DASHBOARD

const saldoTexto = document.getElementById("saldo");
const popupMoney = document.getElementById("popup-money");

const metaFill = document.getElementById("meta-fill");
const percentual = document.getElementById("porcentagemMeta");
const restante = document.getElementById("restante");

const depositar = document.getElementById("depositar");
const bonus800 = document.getElementById("bonus800");

// CARDS

const cardSaldo = document.getElementById("cardSaldo");
const cardDepositos = document.getElementById("cardDepositos");
const cardMeta = document.getElementById("cardMeta");
const cardRestante = document.getElementById("cardRestante");

// DADOS

let saldo =
Number(localStorage.getItem("saldo")) || 0;

let quantidade =
Number(localStorage.getItem("depositos")) || 0;

// BOOT

const textos = [

"Initializing BlackVault...",
"Loading encrypted modules...",
"Decrypting files...",
"Bypassing firewall...",
"Access Granted..."

];

let progresso = 0;

const loading = setInterval(() => {

progresso++;

barra.style.width = progresso + "%";
bootPorcentagem.innerText = progresso + "%";

if(progresso < 20){

status.innerText = textos[0];

}else if(progresso < 40){

status.innerText = textos[1];

}else if(progresso < 60){

status.innerText = textos[2];

}else if(progresso < 80){

status.innerText = textos[3];

}else{

status.innerText = textos[4];

}

if(progresso >= 100){

clearInterval(loading);

setTimeout(()=>{

boot.style.display="none";
login.style.display="flex";

},700);

}

},45);// ======================================
// APP.JS - PARTE 2
// ======================================

// LOGIN

entrar.addEventListener("click", verificarSenha);

senha.addEventListener("keypress", (e)=>{

    if(e.key==="Enter"){

        verificarSenha();

    }

});

function verificarSenha(){

    if(senha.value !== SENHA){

        mensagem.style.color="#ff4444";
        mensagem.innerText="ACCESS DENIED";
        senha.value="";

        return;

    }

    mensagem.style.color="#00ff55";
    mensagem.innerText="ACCESS GRANTED";

    login.style.display="none";
    hack.style.display="flex";

    iniciarHack();

}

// RESET

resetar.addEventListener("click",()=>{

    if(!confirm("Deseja apagar todo o progresso?")){

        return;

    }

    localStorage.clear();

    location.reload();

});

// SYSTEM HACKED

function iniciarHack(){

    const hackFill=document.getElementById("hack-fill");

    let valor=0;

    const anim=setInterval(()=>{

        valor++;

        hackFill.style.width=valor+"%";

        if(valor>=100){

            clearInterval(anim);

            setTimeout(()=>{

                hack.style.display="none";

                dashboard.style.display="block";

                atualizarDashboard();

            },600);

        }

    },20);

}

// POPUP

function mostrarPopup(valor){

    popupMoney.innerText="+R$ "+valor;

    popupMoney.style.opacity="1";
    popupMoney.style.transform="translateY(-10px)";

    setTimeout(()=>{

        popupMoney.style.opacity="0";
        popupMoney.style.transform="translateY(0px)";

    },1200);

}// ======================================
// APP.JS - PARTE 3
// ======================================

// DASHBOARD

function atualizarDashboard(){

    saldoTexto.innerText =
        "R$ " + saldo.toLocaleString("pt-BR");

    cardSaldo.innerText =
        "R$ " + saldo.toLocaleString("pt-BR");

    cardDepositos.innerText = quantidade;

    let porcento = Math.floor((saldo / META) * 100);

    if(porcento > 100){
        porcento = 100;
    }

    metaFill.style.width = porcento + "%";

    percentual.innerText = porcento + "%";

    cardMeta.innerText = porcento + "%";

    const falta = Math.max(0, META - saldo);

    restante.innerText =
        "Faltam R$ " + falta.toLocaleString("pt-BR");

    cardRestante.innerText =
        "R$ " + falta.toLocaleString("pt-BR");

    localStorage.setItem("saldo", saldo);
    localStorage.setItem("depositos", quantidade);

    verificarMeta();

}

// DEPÓSITO

depositar.addEventListener("click",()=>{

    if(saldo >= META){

        return;

    }

    saldo += DEPOSITO;

    quantidade++;

    mostrarPopup(DEPOSITO);

    atualizarDashboard();

});

// BÔNUS 800

if(localStorage.getItem("bonus800") === "usado"){

    bonus800.style.display = "none";

}

bonus800.addEventListener("click",()=>{

    saldo += 800;

    mostrarPopup(800);

    bonus800.style.display = "none";

    localStorage.setItem("bonus800","usado");

    atualizarDashboard();

});// ======================================
// APP.JS - PARTE 4
// ======================================

// CRONOGRAMA

const cronograma = document.getElementById("cronograma");

const meses = [

    { nome:"AGOSTO", meta:770 },
    { nome:"SETEMBRO", meta:1540 },
    { nome:"OUTUBRO", meta:2310 },
    { nome:"NOVEMBRO", meta:3080 },
    { nome:"DEZEMBRO", meta:3850 },
    { nome:"JANEIRO", meta:4620 },
    { nome:"FEVEREIRO", meta:6190 }

];

function atualizarCronograma(){

    if(!cronograma) return;

    cronograma.innerHTML = "<h2>CRONOGRAMA</h2>";

    meses.forEach((mes)=>{

        const concluido = saldo >= mes.meta;

        cronograma.innerHTML += `
        <div class="mes ${concluido ? "concluido" : ""}">
            <span>${mes.nome}</span>
            <strong>R$ ${mes.meta.toLocaleString("pt-BR")}</strong>
        </div>
        `;

    });

}

// META

function verificarMeta(){

    if(saldo < META){

        return;

    }

    const audio = new Audio("./assets/trofeu.mp3");

    audio.play().catch(()=>{});

    if(goal){

        goal.style.display = "none";

    }

    if(success){

        success.style.display = "flex";

    }

    const valorFinal = document.getElementById("valorFinal");

    if(valorFinal){

        valorFinal.innerText =
        "R$ " + saldo.toLocaleString("pt-BR");

    }

}// ======================================
// APP.JS - PARTE 5
// ======================================

// BOTÃO BACK TO TOP

const backTop = document.getElementById("backTop");

if(backTop){

    backTop.addEventListener("click",()=>{

        if(success){

            success.style.display = "none";

        }

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

// FECHAR META

const fecharMeta = document.getElementById("fecharMeta");

if(fecharMeta){

    fecharMeta.addEventListener("click",()=>{

        if(goal){

            goal.style.display = "none";

        }

    });

}

// ATUALIZAÇÃO

const atualizarDashboardOriginal = atualizarDashboard;

atualizarDashboard = function(){

    atualizarDashboardOriginal();

    atualizarCronograma();

};

// INICIAR

atualizarDashboard();

console.log("BLACKVAULT V4 ONLINE");