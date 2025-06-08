/**
 * Database Manager para o Quiz usando Firebase Realtime Database
 */
class DatabaseManager {
    constructor() {
        this.db = null;
        this.initialized = false;
        this.rankingRef = null;
    }

    /**
     * Inicializa o Firebase e a conexão com o banco de dados
     */
    async init() {
        if (this.initialized) return;
        
        try {
            // Configuração do Firebase
            const firebaseConfig = {
                apiKey: "AIzaSyCtXWKLU_1oN-CmnJ7VuGac-WzeXt937Lw", // NOTA: Este é um exemplo, você deve substituir com sua própria chave
                authDomain: "quiz-foro.firebaseapp.com",
                databaseURL: "https://quiz-foro-default-rtdb.firebaseio.com",
                projectId: "quiz-foro",
                storageBucket: "quiz-foro.appspot.com",
                messagingSenderId: "226631921449",
                appId: "1:226631921449:web:2e91bfb57989ed40259138"
            };
            
            // Inicializa o Firebase
            firebase.initializeApp(firebaseConfig);
            
            // Referência para o banco de dados
            this.db = firebase.database();
            this.rankingRef = this.db.ref('ranking');
            
            // Verifica a conexão com o Firebase
            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', (snap) => {
                if (snap.val() === true) {
                    console.log('Conectado ao Firebase com sucesso!');
                } else {
                    console.log('Desconectado do Firebase.');
                }
            });
            
            this.initialized = true;
            console.log("Conexão com Firebase estabelecida com sucesso!");
        } catch (error) {
            console.error("Erro ao inicializar o Firebase:", error);
            throw error;
        }
    }

    /**
     * Verifica se um nome de jogador já existe
     * @param {string} name - Nome do jogador
     * @returns {Promise<boolean>} - true se o nome existe, false caso contrário
     */
    async playerExists(name) {
        if (!this.db || !name) return false;
        
        try {
            const snapshot = await this.rankingRef.orderByChild('name').equalTo(name).once('value');
            return snapshot.exists();
        } catch (error) {
            console.error("Erro ao verificar jogador:", error);
            return false;
        }
    }

    /**
     * Salva ou atualiza a pontuação de um jogador
     * @param {string} name - Nome do jogador
     * @param {number} score - Pontuação
     * @param {number} timeInSeconds - Tempo em segundos
     * @returns {Promise<boolean>} - true se salvo com sucesso, false caso contrário
     */
    async saveScore(name, score, timeInSeconds) {
        if (!this.db || !name) return false;
        
        try {
            const currentDate = new Date().toISOString();
            const playerData = {
                name: name,
                score: score,
                time: timeInSeconds,
                date: currentDate
            };
            
            // Verifica se o jogador já existe
            const exists = await this.playerExists(name);
            
            if (exists) {
                // Atualiza o jogador existente
                const snapshot = await this.rankingRef.orderByChild('name').equalTo(name).once('value');
                const playerKey = Object.keys(snapshot.val())[0];
                await this.rankingRef.child(playerKey).update(playerData);
            } else {
                // Insere novo jogador
                await this.rankingRef.push(playerData);
            }
            
            return true;
        } catch (error) {
            console.error("Erro ao salvar pontuação:", error);
            return false;
        }
    }

    /**
     * Obtém o ranking completo ordenado por pontuação (decrescente) e tempo (crescente)
     * @returns {Promise<Array>} - Array de objetos com os dados do ranking
     */
    async getRanking() {
        if (!this.db) return [];
        
        try {
            const snapshot = await this.rankingRef.orderByChild('score').once('value');
            const results = [];
            
            snapshot.forEach((childSnapshot) => {
                const player = childSnapshot.val();
                results.push({
                    name: player.name,
                    score: player.score,
                    time: player.time
                });
            });
            
            // Ordena por pontuação (decrescente) e tempo (crescente)
            results.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score; // Ordem decrescente de pontuação
                }
                return a.time - b.time; // Ordem crescente de tempo
            });
            
            return results;
        } catch (error) {
            console.error("Erro ao obter ranking:", error);
            return [];
        }
    }

    /**
     * Obtém a posição de um jogador específico no ranking
     * @param {string} name - Nome do jogador
     * @returns {Promise<number>} - Posição no ranking (1-based) ou -1 se não encontrado
     */
    async getPlayerRank(name) {
        if (!this.db || !name) return -1;
        
        try {
            const ranking = await this.getRanking();
            for (let i = 0; i < ranking.length; i++) {
                if (ranking[i].name === name) {
                    return i + 1;
                }
            }
            return -1;
        } catch (error) {
            console.error("Erro ao obter posição do jogador:", error);
            return -1;
        }
    }
}

// Instância global do gerenciador de banco de dados
const dbManager = new DatabaseManager();
