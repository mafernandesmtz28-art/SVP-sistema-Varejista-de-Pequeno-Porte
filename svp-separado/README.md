# SVP — Sistema Varejista de Pequeno Porte

## Estrutura

- `public/index.html`: estrutura da interface.
- `public/css/style.css`: estilos CSS próprios. O Tailwind continua sendo carregado pelo CDN no HTML.
- `public/js/script.js`: lógica do sistema no navegador.
- `server.js`: servidor Node.js com Express que entrega os arquivos do frontend.
- `package.json`: dependências e comando para iniciar.

## Como executar

É necessário ter o Node.js instalado.

```bash
npm install
npm start
```

Depois, abra http://localhost:3000 no navegador.

A rota `http://localhost:3000/api/status` retorna o estado básico do servidor.

## Observação

Esta separação mantém a lógica original do sistema no JavaScript do navegador. O Node.js, nesta versão, serve a aplicação e disponibiliza uma rota de status; os dados ainda ficam em memória no navegador e não são persistidos em banco de dados.
