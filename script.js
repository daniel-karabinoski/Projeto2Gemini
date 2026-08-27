// CONTROLE DO TAMANHO DA FONTE
let tamanhoAtual = 20;

function alterarFonte(delta) {
  tamanhoAtual += delta;

  // Garante limites mínimo e máximo para não quebrar a tela
  if (tamanhoAtual < 18) tamanhoAtual = 18;
  if (tamanhoAtual > 38) tamanhoAtual = 38;

  document.documentElement.style.setProperty('--tamanho-fonte', tamanhoAtual + 'px');
}

// SÍNTESE DE VOZ DA WEB
function lerTexto(texto) {
  if ('speechSynthesis' in window) {
    // Parar qualquer leitura anterior
    window.speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.rate = 0.8; // Velocidade ajustada para 80% para fala mais clara
    fala.pitch = 1;  // Tom de voz padrão

    window.speechSynthesis.speak(fala);
  } else {
    alert("Seu navegador não tem suporte para leitura por voz.");
  }
}

function pararVoz() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// CONFIGURAÇÃO DOS EVENTOS QUANDO A PÁGINA CARREGAR
document.addEventListener('DOMContentLoaded', () => {
  // Eventos de fonte
  document.getElementById('btn-aumentar').addEventListener('click', () => alterarFonte(2));
  document.getElementById('btn-diminuir').addEventListener('click', () => alterarFonte(-2));

  // Evento de interromper leitura
  document.getElementById('btn-parar-voz').addEventListener('click', pararVoz);

  // Eventos para leitura individual das dicas
  const botoesOuvir = document.querySelectorAll('.btn-ouvir');
  botoesOuvir.forEach(botao => {
    botao.addEventListener('click', () => {
      const textoParaLer = botao.getAttribute('data-texto');
      lerTexto(textoParaLer);
    });
  });
});