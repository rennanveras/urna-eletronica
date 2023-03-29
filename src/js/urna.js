let seuVoto = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let numeros = document.querySelector(".d-1-3");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1--right");
let avisoGrande = document.querySelector(".aviso--grande");

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(i =0; i < etapa.numeros;i++ ){
        if(i===0){
            numeroHtml += '<div class="square-numbers blink"></div>';
        }else{
            numeroHtml += '<div class="square-numbers"></div>';
    }
    }

    seuVoto.style.display = "none"
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let  candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0 ){
        candidato = candidato[0]
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML= `Nome: ${candidato.nome}<br/>Partido:${candidato.partido}`
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-img small"><img src="src/img/${candidato.fotos[i].url}" alt=""><h2>${candidato.fotos[i].legenda}</h2></div>`;
            }else{
                fotosHtml += `<div class="d-1-img"><img src="src/img/${candidato.fotos[i].url}" alt=""><h2>${candidato.fotos[i].legenda}</h2></div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande blink">VOTO NULO</div>';
    }

}


function clickMe(c) {
    let elNumero = document.querySelector('.square-numbers.blink');
    if(elNumero !== null){
        elNumero.innerHTML = c;
        numero = `${numero}${c}`

        elNumero.classList.remove('blink');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('blink');
        }else{
            atualizaInterface();
        }
    }
}

function white(){
    if(numero === ''){
        votoBranco = true;
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande blink">VOTO EM BRANCO</div>';
        avisoGrande.style.textAlign = 'center';
    }else{
        alert("Para votar em BRANCO o campo de voto deve estar vazio.\nAperte CORRIGE para apagar o compo de voto.");

    }
}

function correct(){
    comecarEtapa();
}

function confirm() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:"Branco"
        })
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else{
            document.querySelector('.screen').innerHTML = '<div class="aviso--final blink">FIM</div>';          
        }
    }
}

comecarEtapa();