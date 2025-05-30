class ScoreService {
  constructor() {
    this.dbName = 'triviaScores';
    this.storeName = 'scores';
    this.version = 1;
    this.db = null;
    this.initializeDB();
  }

  initializeDB() {
    const request = indexedDB.open(this.dbName, this.version);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        const objectStore = db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('score', 'score', { unique: false });
        objectStore.createIndex('date', 'date', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
    };
  }

  async saveScore(name, score) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const scoreData = {
        name,
        score,
        date: new Date().toISOString(),
      };

      const request = objectStore.add(scoreData);

      request.onsuccess = () => {
        this.getTopScores().then(resolve);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async getTopScores(limit = 10) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.index('score');
      const request = index.getAll(null, limit);

      request.onsuccess = (event) => {
        const scores = event.target.result;
        // Sort scores in descending order
        scores.sort((a, b) => b.score - a.score);
        resolve(scores);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async clearScores() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
}

export default new ScoreService();
