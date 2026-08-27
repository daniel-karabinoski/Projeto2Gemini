// 1. GERENCIAMENTO DO TAMANHO DA FONTE
let tamanhoAtual = 20;

function alterarFonte(valor) {
  tamanhoAtual += valor;
  
  // Limites para manter a legibilidade
  if (tamanhoAtual < 16) tamanhoAtual = 16;
  if (tamanhoAtual > 36) tamanhoAtual = 36;

  document.documentElement.style.setProperty('--tamanho-fonte', tamanhoAtual + 'px');
}

// 2. FUNÇÃO DE LEITURA EM VOZ ALTA
function lerTexto(texto) {
  if ('speechSynthesis' in window) {
    // Cancela leituras anteriores antes de iniciar uma nova
    window.speechSynthesis.cancel();

    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'pt-BR';
    mensagem.rate = 0.85; // Velocidade reduzida para maior clareza
    mensagem.pitch = 1;

    window.speechSynthesis.speak(mensagem);
  } else {
    alert("Desculpe, seu navegador não suporta a leitura em voz alta.");
  }
}

// 3. PARAR LEITURA
function pararVoz() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// 4. EVENTOS DOS BOTÕES (Escutadores)
document.addEventListener('DOMContentLoaded', () => {
  // Botões de fonte
  document.getElementById('btn-aumentar').addEventListener('click', () => alterarFonte(2));
  document.getElementById('btn-diminuir').addEventListener('click', () => alterarFonte(-2));
  
  // Botão de parar voz
  document.getElementById('btn-parar-voz').addEventListener('click', pararVoz);

  // Botões para ler cada dica
  const botoesOuvir = document.querySelectorAll('.btn-ouvir');
  botoesOuvir.forEach(botao => {
    botao.addEventListener('click', () => {
      const textoParaLer = botao.getAttribute('data-texto');
      lerTexto(textoParaLer);
    });
  });
});