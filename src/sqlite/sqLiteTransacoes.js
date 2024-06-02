import db from "./SQLiteDatabase";
import saldoDB from "./sqLiteSaldo";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE IF EXISTS Transacoes;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  
  // Criação da tabela Transacoes
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      valor REAL NOT NULL,
      dia TEXT DEFAULT (datetime('now', 'localtime')),
      descricao TEXT
    );`
  );
});

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Transacoes (tipo, valor, dia, descricao) values (?, ?, ?, ?);",
        [obj.tipo, obj.valor, obj.dia, obj.descricao],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
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
        "SELECT *, strftime('%d/%m', dia) AS data_formatada FROM Transacoes ORDER BY dia DESC;",
        [],
        (_, { rows }) => {
          const transacoes = rows._array.map(row => ({
            ...row,
            dia: row.data_formatada
          }));
          resolve(transacoes);
        },
        (_, error) => reject(error)
      );
    });
  });
};



const adicionarTransacao = (objTransacao) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Inserir a transação
      const transacaoId = await create(objTransacao);
      console.log("Transação inserida com ID:", transacaoId);
      
      // Obter o saldo atual
      const saldoAtual = await saldoDB.byId();
      console.log("Saldo atual:", saldoAtual);

      let novoSaldo = saldoAtual;

      // Atualizar o saldo com base na transação
      if (objTransacao.tipo === "Entrada") {
        novoSaldo += objTransacao.valor;
      } else if (objTransacao.tipo === "Saida") {
        novoSaldo -= objTransacao.valor;
      }

      console.log("Novo saldo calculado:", novoSaldo);

      // Atualizar o saldo no banco de dados
      await saldoDB.update(novoSaldo);

      console.log("Saldo atualizado com sucesso.");
      resolve(transacaoId);
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      reject("Erro ao adicionar transação: " + error);
    }
  });
};

const somarEntradas = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT SUM(valor) AS total FROM Transacoes WHERE tipo = ?;",
        ["Entrada"],
        (_, { rows }) => {
          const total = rows.item(0).total;
          resolve(total);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const somarSaidas = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT SUM(valor) AS total FROM Transacoes WHERE tipo = ?;",
        ["Saida"],
        (_, { rows }) => {
          const total = rows.item(0).total;
          resolve(total);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default {
  create,
  all,
  adicionarTransacao,
  somarEntradas,
  somarSaidas,
};
