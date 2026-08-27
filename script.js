// ===================================================
// 1. GERENCIAMENTO DO TAMANHO DA FONTE
// ===================================================
let tamanhoAtual = 20;

function alterarFonte(delta) {
  tamanhoAtual += delta;

  // Define limites para a fonte (entre 16px e 38px)
  if (tamanhoAtual < 16) tamanhoAtual = 16;
  if (tamanhoAtual > 38) tamanhoAtual = 38;

  document.documentElement.style.setProperty('--tamanho-fonte', tamanhoAtual + 'px');
}

// ===================================================
// 2. GERENCIAMENTO DE TEMAS (CLARO, ESCURO, ALTO CONTRASTE)
// ===================================================
function aplicarTema(nomeTema) {
  // Remove classes anteriores
  document.body.classList.remove('tema-escuro', 'tema-contraste');

  if (nomeTema === 'escuro') {
    document.body.classList.add('tema-escuro');
  } else if (nomeTema === 'contraste') {
    document.body.classList.add('tema-contraste');
  }
  // Se for 'claro', não precisa adicionar classe
}

// ===================================================
// 3. SÍNTESE DE VOZ (LEITURA EM VOZ ALTA)
// ===================================================
function lerTexto(texto) {
  if ('speechSynthesis' in window) {
    // Cancela leituras anteriores em andamento
    window.speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.rate = 0.8; // Velocidade reduzida para 80% para maior clareza
    fala.pitch = 1;

    window.speechSynthesis.speak(fala);
  } else {
    alert("Seu navegador não suporta a leitura em voz alta.");
  }
}

function pararVoz() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// ===================================================
// 4. VINCULAÇÃO DOS EVENTOS (INICIALIZAÇÃO)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  // Eventos de alteração de fonte
  document.getElementById('btn-aumentar').addEventListener('click', () => alterarFonte(2));
  document.getElementById('btn-diminuir').addEventListener('click', () => alterarFonte(-2));

  // Eventos de alteração de tema
  document.getElementById('btn-tema-claro').addEventListener('click', () => aplicarTema('claro'));
  document.getElementById('btn-tema-escuro').addEventListener('click', () => aplicarTema('escuro'));
  document.getElementById('btn-tema-contraste').addEventListener('click', () => aplicarTema('contraste'));

  // Evento para parar a leitura de voz
  document.getElementById('btn-parar-voz').addEventListener('click', pararVoz);

  // Eventos para ler cada card de dica individualmente
  const botoesOuvir = document.querySelectorAll('.btn-ouvir');
  botoesOuvir.forEach(botao => {
    botao.addEventListener('click', () => {
      const textoParaLer = botao.getAttribute('data-texto');
      lerTexto(textoParaLer);
    });
  });
});