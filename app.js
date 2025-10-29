
 const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8081;

app.use(express.json());

app.post("/calculo", (req, res) => {
    try {
        const { numeros } = req.body;

        // Verificação de entrada
        if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
            return res.status(400).json({ erro: "É necessário enviar um array com números válidos!" });
        }

        // Verificação se todos os elementos são números
        const invalidos = numeros.some(num => isNaN(num));
        if (invalidos) {
            return res.status(400).json({ erro: "O array contém valores não numéricos!" });
        }

        // Cálculos
        const soma = numeros.reduce((acc, num) => acc + num, 0);
        const subtracao = numeros.reduce((acc, num) => acc - num);
        const multiplicacao = numeros.reduce((acc, num) => acc * num, 1);
        const divisao = numeros.reduce((acc, num) => acc / num);

        // Cria um objeto com os resultados
        const resultados = {
            soma,
            subtracao,
            multiplicacao,
            divisao
        };

        // (Opcional) salvar resultados em um arquivo
        fs.writeFileSync("resultado.json", JSON.stringify(resultados, null, 2));

        return res.status(200).json({
            mensagem: "Cálculos realizados com sucesso!",
            resultados
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno no servidor!" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});