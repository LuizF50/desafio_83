document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const findButton = document.getElementById('findButton');
    const resetButton = document.getElementById('resetButton');
    const planetInput = document.getElementById('planetInput');
    const resultOutput = document.getElementById('resultOutput');
    
    // Adiciona event listeners aos botões
    findButton.addEventListener('click', handleFindPlanets);
    resetButton.addEventListener('click', handleReset);
    
    /**
     * Função principal que lida com o clique do botão "Encontrar Planetas"
     */
    function handleFindPlanets() {
        // Obtém o valor do input e limpa espaços em branco
        const inputValue = planetInput.value.trim();
        
        // Verifica se o input está vazio
        if (!inputValue) {
            showResult('Por favor, insira as séries de planetas.', false);
            return;
        }
        
        // Divide a string de input em um array de strings
        const planetSeries = inputValue.split(',').map(serie => serie.trim());
        
        // Verifica se há pelo menos uma série de planetas
        if (planetSeries.length === 0) {
            showResult('Formato inválido. Use: abcd,bcf,bcefg', false);
            return;
        }
        
        // Encontra os planetas comuns
        const commonPlanets = findPlanets(planetSeries);
        
        // Exibe o resultado
        if (commonPlanets.length > 0) {
            showResult(commonPlanets, true);
        } else {
            showResult('Nenhum planeta comum encontrado nas séries fornecidas.', false);
        }
    }
    
    /**
     * Função que encontra planetas comuns em todas as séries
     * @param {Array} planetSeries - Array de strings representando séries de planetas
     * @returns {Array} - Array de planetas (letras) comuns a todas as séries
     */
    function findPlanets(planetSeries) {
        // Verifica se não há séries de planetas
        if (planetSeries.length === 0) return [];
        
        // Pega a primeira série como base para comparação
        const baseSeries = planetSeries[0];
        const commonPlanets = [];
        
        // Itera sobre cada letra da primeira série
        for (const planet of baseSeries) {
            // Verifica se a letra está presente em todas as outras séries
            const isCommon = planetSeries.every(series => series.includes(planet));
            
            // Se for comum e ainda não foi adicionada, adiciona ao array
            if (isCommon && !commonPlanets.includes(planet)) {
                commonPlanets.push(planet);
            }
        }
        
        // Retorna os planetas comuns ordenados
        return commonPlanets.sort();
    }
    
    /**
     * Função para exibir o resultado na tela
     * @param {Array|string} result - Resultado a ser exibido
     * @param {boolean} isSuccess - Indica se o resultado é um sucesso
     */
    function showResult(result, isSuccess) {
        resultOutput.innerHTML = '';
        
        if (isSuccess) {
            // Se for um array de planetas, cria elementos para cada um
            result.forEach(planet => {
                const planetElement = document.createElement('span');
                planetElement.className = 'planet';
                planetElement.textContent = planet;
                resultOutput.appendChild(planetElement);
            });
        } else {
            // Se for uma mensagem de erro, exibe como texto
            resultOutput.textContent = result;
            resultOutput.style.color = '#ff1867';
        }
    }
    
    /**
     * Função para resetar o formulário
     */
    function handleReset() {
        planetInput.value = '';
        resultOutput.innerHTML = '';
        resultOutput.style.color = '';
    }
});