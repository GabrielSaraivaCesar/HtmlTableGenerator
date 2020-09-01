const HtmlTable =  require('./HtmlTable');

const json = {
  cols: [
    {value: "QUESTIONARIO ESTILOS PARENTAIS", background: "black", color: 'white'},
    {value: "MAE"},
    {value: "PAI"}
  ],
  rows: [
    [{value: "DESCONEXAO E REJEICAO", colspan: 3, background: 'red'}],
    [{value: "Privacao Emocional"}, {value: ""}, {value: ""}],
    [{value: "Abandono"}, {value: ""}, {value: ""}],
    [{value: "Desconfianca abuso"}, {value: ""}, {value: ""}],
  ]
}
const table = new HtmlTable(json)
const html = table.generateHtml();
console.log(html)