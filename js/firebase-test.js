/**
 * Script de teste para verificar a conexão com o Firebase
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Iniciando teste de conexão com Firebase...');
    
    try {
        // Aguarda a inicialização do banco de dados
        await dbManager.init();
        
        // Tenta escrever dados de teste
        const testRef = firebase.database().ref('test');
        await testRef.set({
            timestamp: Date.now(),
            message: 'Teste de conexão bem-sucedido'
        });
        
        console.log('Teste de escrita no Firebase bem-sucedido!');
        
        // Tenta ler os dados de teste
        const snapshot = await testRef.once('value');
        const testData = snapshot.val();
        
        console.log('Dados lidos do Firebase:', testData);
        
        // Adiciona uma mensagem na página
        const testElement = document.createElement('div');
        testElement.style.position = 'fixed';
        testElement.style.bottom = '10px';
        testElement.style.left = '10px';
        testElement.style.backgroundColor = '#4CAF50';
        testElement.style.color = 'white';
        testElement.style.padding = '10px';
        testElement.style.borderRadius = '5px';
        testElement.style.zIndex = '1000';
        testElement.textContent = 'Conexão com Firebase estabelecida com sucesso!';
        
        document.body.appendChild(testElement);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            testElement.remove();
        }, 5000);
        
    } catch (error) {
        console.error('Erro no teste do Firebase:', error);
        
        // Adiciona uma mensagem de erro na página
        const errorElement = document.createElement('div');
        errorElement.style.position = 'fixed';
        errorElement.style.bottom = '10px';
        errorElement.style.left = '10px';
        errorElement.style.backgroundColor = '#F44336';
        errorElement.style.color = 'white';
        errorElement.style.padding = '10px';
        errorElement.style.borderRadius = '5px';
        errorElement.style.zIndex = '1000';
        errorElement.textContent = `Erro na conexão com Firebase: ${error.message}`;
        
        document.body.appendChild(errorElement);
    }
});
