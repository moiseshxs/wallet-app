import db from "./SQLiteDatabase";
import saldoDB from "./sqLiteSaldo";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE IF NOT EXISTS Transacoes;");
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
      // comando SQL modificável
      tx.executeSql(
        "INSERT INTO Transacoes (tipo, valor, dia, descricao) values (?, ?, ?, ?);",
        [obj.tipo, obj.valor, obj.dia, obj.descricao],
        //-----------------------função de callback
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
      // comando SQL modificável
      tx.executeSql(
        "SELECT * FROM Transacoes;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const adicionarTransacao = async (objTransacao) => {
  try {
    // Inserir a transação
    const transacaoId = await transacoesDB.create(objTransacao);
    
    // Atualizar o saldo com base na transação
    const saldoAtual = await saldoDB.byId();
    let novoSaldo = saldoAtual;

    if (objTransacao.tipo === "entrada") {
      novoSaldo += objTransacao.valor;
    } else if (objTransacao.tipo === "saida") {
      novoSaldo -= objTransacao.valor;
    }

    await saldoDB.update(novoSaldo);

    return transacaoId;
  } catch (error) {
    throw new Error("Erro ao adicionar transação: " + error);
  }
};

export default {
  create,
  all,
  adicionarTransacao,

  
};
