import { accountDbModel } from "../models/Index.js"

const Account = accountDbModel.accounts;

// Criando as rotas
// app.put('/deposito/:agencia/:conta/:valor',)
const deposito = async (req, res) => {
  const agencia = req.body.agencia;
  const conta = req.body.conta;
  const balance = req.body.balance;

  try {

    const filter = { agencia: agencia, conta: conta };
    const dataOld = await Account.findOne(filter);

    if (!dataOld) {

      // Mensagem de erro 
      res.status(404)

    } else {
      // Se existe no banco
      const update = { balance: dataOld.balance + balance }
      const dataNew = await Account.findOneAndUpdate(filter, update);
      res.json(dataNew.balance);
    }


  } catch (error) {
    res.status(500).send("Erro:" + error);
  }
};

// app.put('/saque/:agencia/:conta/:valor',)
const saque = async (req, res) => {
  const agencia = req.body.agencia;
  const conta = req.body.conta;
  const balance = req.body.balance;
  const taxaSaque = 1;

  try {
    const filter = { agencia: agencia, conta: conta };

    const dataOld = await Account.findOne(filter);
    if (!dataOld) {
      if (dataOld.balance > balance) {

        const update = { balance: dataOld.balance - balance - taxaSaque }
        const data = await Account.findOneAndUpdate(filter, update);
        res.send(data);
      }
      else {
        res.status(404).jason({ status: "Saldo insuficientes" })
      }
    }
    else {
      res.status(404).send("Erro:" + error);
    }

  } catch (error) {
    res.status(500).send("Erro:" + error);
  }
};

// app.get('/saldo/:agencia/:conta',)
const saldo = async (req, res) => {
  const agencia = req.body.agencia;
  const conta = req.body.conta;

  try {
    const data = await Account.findOne({ "agencia": agencia, "conta": conta })

    res.json(data.balance);

  } catch (error) {
    res.status(500).send("Erro:" + error);
  }
};

// app.delete('/conta/{:agencia/:conta}',)
const remove = async (req, res) => {
  const agencia = req.body.agencia;
  const conta = req.body.conta;

  try {
    const filter = { agencia: agencia, conta: conta };
    const filterCount = { agencia: agencia };
    const data = await Account.findOne(filter);

    if (!data) {
      res.status(404).json(data);
    }
    else {
      const data = await Account.deleteOne(filter);
      const data = await Account.find(filterCount).count();
      res.status(200).json(data);
    }

  } catch (error) {
    res.status(500).json("Erro:" + error);
  }
};

// app.get('/clientesricos/:agencia/:conta/:quality',)
const clientesricos = async (req, res) => {
  const { reqAgencia, reqConta, resQuality } = req.params;

  try {
    const data = await Account.Update
    res.send(data)
  } catch (error) {
    res.status(500).send("Erro:" + error);
  }
};

// app.get('/clientespobres/:agencia/:conta/:quality',)
const clientespobres = async (req, res) => {
  const { reqAgencia, reqConta, resQuality } = req.params;

  try {
    const data = await Account.Update
    res.send(data)
  } catch (error) {
    res.status(500).send("Erro:" + error);
  }
};

// app.post('/transferir/:contaOrigem/:contaDestino/:valor',)
const transferircliente = async (req, res) => {
  const { reqContaOrigem, reqContaDestino, reqValor } = req.params;
  try {
    const filterOrigem = { conta: reqContaOrigem };
    const filterDestino = { conta: reqContaDestino };
    const dataOrigem = await Account.findOne(filterOrigem);
    const dataDestino = await Account.findOne(filterDestino);

    if (dataOrigem.balance >= resValor) {
      // taxa de transferência
      const taxaTransferencia = .03;

      // Processo de subtração e adição de valores
      const updateOrigem = { balance: dataOrigem.balance - reqValor }
      const updateDestino = { balance: dataDestino.balance + reqValor }

      // Atualização dos saldos
      const dataOrigemNew = await Account.findOneAndUpdate(filterOrigem, updateOrigem);
      const dataDestinoNew = await Account.findOneAndUpdate(filterDestino, updateDestino);
    }
    else {

      response.status(500).send('Saldo insuficiente em conta para fazer transferência');
    }
    // Saldo atual da conta origem
    res.send(dataOrigemNew)

  } catch (error) {
    res.status(500).send("Erro:" + error);
  }
};

export default { deposito, saque, saldo, remove, clientesricos, clientespobres, transferircliente };

