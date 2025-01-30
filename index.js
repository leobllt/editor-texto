$(document).ready(function() {
    let $page = $('.page');

    // Ajuste para permitir tabulação no texto
    $page.on('keydown', function(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            document.execCommand('insertHTML', false, '&#009');
        }
    });

    // Ajuste para impedir que perca a seleção quando clica em botões
    $page.on('focusout', function() {
        salvarSelecao();
    });

    let range = null;
    function salvarSelecao() {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
        }
    }

    function restaurarSelecao() {
        $page.focus();
        if (range) {
            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    // Função geral para formatar
    function formatarTexto(comando, opcional) {
        restaurarSelecao();
        document.execCommand(comando, false, opcional);
    }

    // Função para cuidar só do alinhamento de texto
    let $atualAlinhamento = $('#btn-align-left');
    function alterarAlinhamento($btn, alinhamento) {
        $atualAlinhamento.toggleClass('active');
        $btn.toggleClass('active');
        $atualAlinhamento = $btn;
        $page.css('text-align', alinhamento);
    }


    // BOTÕES

    $('#btn-align-left').on('click', () => alterarAlinhamento($(this), 'left'));
    $('#btn-align-center').on('click', () => alterarAlinhamento($(this), 'center'));
    $('#btn-align-right').on('click', () => alterarAlinhamento($(this), 'right'));
    $('#btn-align-justify').on('click', () => alterarAlinhamento($(this), 'justify'));
    $('#btn-bold').on('click', () => formatarTexto('bold'));
    $('#btn-italic').on('click', () => formatarTexto('italic'));
    $('#btn-underline').on('click', () => formatarTexto('underline'));
    $('#btn-copy').on('click', () => formatarTexto('copy'));
    $('#btn-paste').on('click', () => {
        navigator.clipboard.readText().then((valor) => formatarTexto('insertText', valor)).catch(err => console.error('Erro ao colar:', err));
    });
    
    $('#btn-cut').on('click', () => formatarTexto('cut'));
    $('#select-color').on('change', (event) => console.log($(event.target).val()));

    $page.focus();
    console.log();

    /*document.querySelector('#btn-copy').addEventListener('click', function() {
				const selection = window.getRangeAt(0);
				
				selection

				// Copiar o texto selecionado
				navigator.clipboard.writeText("")
					.then(() => {
						alert("Texto copiado!");
						
						// Restaurar a seleção após a cópia
						selection.removeAllRanges();
						selection.addRange(range);
					})
					.catch(err => console.error("Erro ao copiar:", err));
			});*/
});