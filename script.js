//Seletores e variaveis para escolher a palavra secreta:
let palavras = ["EMOJI", "ESTUDAR", "CONEXAO", "AMIGOS", "GRANOLA", "AGUA"] //usar maiusculo por causa do Canvas
let tabuleiro = document.getElementById("forca").getContext("2d") //getContext pra manipular o desenho no Canvas
let palavraSecreta = "";
let letras = [];
let palavraCorreta = "";
let erros = 10;
let letrasIncorretas = [];
let numeroDeErros = 10;
let letraEscolhida = [];

//Seletores e variaveis do jogo:
let tela = document.querySelector("canvas");
let botaoNovoJogo = document.getElementById("btn-novo-jogo");
let botaoSair = document.getElementById("btn-sair");
let botaoCancelar = document.getElementById("btn-cancelar");

// // captura o id "btn-guardar", salva a palavra adicionada
// document.getElementById("btn-salvar").onclick = () => {
//     salvarPalavra();
// }

//iniciar com a função do sorteio da palavra secreta:
function escolherPalavraSecreta(){
    let palavra = palavras[Math.floor(Math.random()*palavras.length)] // utiliza o floor pra arrendodar o random
    palavraSecreta = palavra
    return palavra
} //escolherPalavraSecreta() => usar para testar se tá aparecendo a palavra secreta

function desenharCanvas() {
    tabuleiro.lineWidth=8
    tabuleiro.lineCap="round"
    tabuleiro.lineJoin="round"
    tabuleiro.fillStyle= "#F3F5FC"
    tabuleiro.strokeStyle = "#0A3871"
    tabuleiro.fillRect(0,0,1200,800)
    tabuleiro.beginPath();
    tabuleiro.moveTo(650,500)
    tabuleiro.lineTo(900,500)
    tabuleiro.stroke()
    tabuleiro.closePath()
  }
//   desenharCanvas()

function desenharTracinhos(){
    tabuleiro.lineWidth = 6 //espessura da linha
    tabuleiro.lineCap = "round" //vai ajustar os cantinhos
    tabuleiro.lineJoin = "round" //vai unir os pontos
    tabuleiro.strokeStyle = "#0A3871"
    tabuleiro.beginPath ()
    let eixo = 600/palavraSecreta.length //600pixels
    for(let i=0; i < palavraSecreta.length; i++){ //loop for
        tabuleiro.moveTo(500+(eixo*i),640) //mover para: tamanho 500 + eixo / comprimento da palavra secreta?
        tabuleiro.lineTo(550+(eixo*i),640)
    }
    tabuleiro.stroke()
    tabuleiro.closePath()
}
desenharTracinhos(escolherPalavraSecreta())//chamar a função dentro de um parâmetro de uma função

function escreverLetraCorreta(index){
    tabuleiro.font = "bold 52px Inter"
    tabuleiro.lineWidth = 6
    tabuleiro.lineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.strokeStyle = "#0A3871"

    let eixo = 600/palavraSecreta.length
    tabuleiro.fillText(palavraSecreta[index],505+(eixo*index), 620)
    tabuleiro.stroke()
}

function escreverLetraIncorreta(letra, errorsLeft){
    tabuleiro.font = "bold 40px Inter"
    tabuleiro.lineWidth = 6
    tabuleiro.lineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.strokeStyle = "#0A3871"
    tabuleiro.fillText(letra, 535 + (40*(10-errorsLeft)), 710, 40)
}

function verificarLetraCorreta(key){
    
    if(!letras.includes(key)){
        console.log(key)
        letras.push(key)
        return false
    }
    else{
        letras.push(key.toUpperCase())
        return true
    }
}

function adicionarLetraCorreta(i){
    palavraCorreta += palavraSecreta[i].toUpperCase()
}

function adicionarLetraIncorreta(letter){
    if(palavraSecreta.indexOf(letter) <= 0){
        erros -= 1
    }
}

document.onkeydown = (e) => { //iron function ?
    let letra = e.key.toUpperCase()
    if(!letraEscolhida.includes(e.key)){
        letraEscolhida.push(e.key)
        console.log(letraEscolhida)
        
            if(palavraSecreta.includes(letra)){
                console.log("Acertou")
                adicionarLetraCorreta(palavraSecreta.indexOf(letra))
                for(let i=0; i < palavraSecreta.length; i++){
                    if(palavraSecreta[i] === letra){
                       escreverLetraCorreta(i)
                    }
                }
            }else{
                console.log("Errou")
                adicionarLetraIncorreta(letra)
                escreverLetraIncorreta(letra, erros)
            }
            
    }else{
        alert("Letra já digitada!")
    }
}

function desenharForca(pontos) {
    tabuleiro.lineWidth=8
    tabuleiro.lineCap="round"
    tabuleiro.lineJoin="round"
    tabuleiro.strokeStyle = "#0A3871"
    if (pontos===8){
        //poste lateral
        tabuleiro.moveTo(700,500)
        tabuleiro.lineTo(700,100)
    }
    if (pontos===7){//teto 
        tabuleiro.moveTo(850,100)
        tabuleiro.lineTo(700,100)
    }
    if (pontos===6){//corda
        tabuleiro.moveTo(850,100)
        tabuleiro.lineTo(850,171)
    }
    if (pontos===5){//para cara
        tabuleiro.moveTo(900,230)
        tabuleiro.arc(850,230,50,0,Math.PI*2)
    }
    if (pontos===4){//para corpo
        tabuleiro.moveTo(850,389)
        tabuleiro.lineTo(850,289)
    }
    if (pontos===3){//para perna esquerda
        tabuleiro.moveTo(850,389)
        tabuleiro.lineTo(800,450)
    }
    if (pontos===2){//para perna direita
        tabuleiro.moveTo(850,389)
        tabuleiro.lineTo(890,450)
    }
    if (pontos===1){//para mão esquerda
        tabuleiro.moveTo(850,330)
        tabuleiro.lineTo(800,389)
    }
    if (pontos===0){//para mão direita
        tabuleiro.moveTo(850,330)
        tabuleiro.lineTo(890,389)
    }
    
    tabuleiro.stroke()
    tabuleiro.closePath()
  }

  function exibirDerrota() {
    tabuleiro.font = ' bold 42px Inter';
    tabuleiro.lineWidth=6
    tabuleiro.lineCap="round"
    tabuleiro.lineJoin="round"
    tabuleiro.fillStyle="red"
    tabuleiro.fillText("Fim de jogo!",930,320)
  }

  function exibirVitoria() {
    tabuleiro.font = 'bold 42px Inter';
    tabuleiro.lineWidth=6
    tabuleiro.lineCap="round"
    tabuleiro.lineJoin="round"
    tabuleiro.fillStyle="green"
    tabuleiro.fillText("Ganhou,",950,320)
    tabuleiro.fillText("Parabéns!",930,360)
    setTimeout( recarregar , 1000)
  }   

//   function recarregar(){
//     location.reload(); 
//   }