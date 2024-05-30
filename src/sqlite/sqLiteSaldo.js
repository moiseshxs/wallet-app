import db from "./SQLiteDatabase";
import TransacoesDB from "./sqLiteTransacoes";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE Saldo;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  
  // Criação da tabela Saldo
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Saldo (
      id INTEGER PRIMARY KEY,
      saldo REAL NOT NULL
    );`
  );

  // Inserir saldo inicial se não existir
  tx.executeSql(
    `INSERT INTO Saldo (id, saldo)
     SELECT 1, 0.0
     WHERE NOT EXISTS (SELECT 1 FROM Saldo WHERE id = 1);`
  );
});

const create = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Saldo (id, saldo)
         SELECT 1, 0.0
         WHERE NOT EXISTS (SELECT 1 FROM Saldo WHERE id = 1);`,
        [],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject("Error inserting initial saldo"); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Saldo;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const update = (novoSaldo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Saldo SET saldo = ? WHERE id = 1;",
        [novoSaldo],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve();
          else reject("Error updating saldo: " + JSON.stringify(novoSaldo)); // update falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const byId = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT saldo FROM Saldo WHERE id = 1;",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array[0].saldo); // Retorna apenas o saldo
          } else {
            reject("Saldo não encontrado");
          }
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  all,
  update,
  byId,
};
