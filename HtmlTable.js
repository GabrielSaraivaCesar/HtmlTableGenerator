const { JSDOM } = require("jsdom");


class HtmlTable {
  _dom = new JSDOM(`<!DOCTYPE html><body></body>`);
  _window = this._dom.window;
  _document = this._window.document;
  _body = this._document.querySelector("body");

  _tableStyle = `font-family: arial, sans-serif; border-collapse: collapse; width: 100%;`;
  _thStyle = `background-color: #dddddd; border: 1px solid #dddddd; text-align: left; padding: 8px;`;
  _tdStyle = `border: 1px solid #dddddd; text-align: left; padding: 8px;`;
  _trStyle = ``;

  _json = {};

  constructor(json) {
    this._json = json;
  }

  _parseJsonToCss(json) {
    let result = "";
    Object.keys(json).map(key =>{
      let parsedKey = key;
      upperCases = parsedKey.match(/[A-Z]/g);
      if (upperCases) {
        upperCases.forEach(letter => {
          parsedKey = parsedKey.replace(letter, "-"+letter.toLowerCase());
        });
      }
      

      let parsedValue = json[key];
      if (typeof parsedValue === "number") parsedValue = parsedValue.toString() + "px";
      result += (parsedKey + ":" + parsedValue + ";")
    })
    return result;
  }

  _createTable() {
    let el = this._document.createElement("table");
    el.style = this._tableStyle;
    return el;
  }

  _createTr() {
    let el = this._document.createElement("tr");
    el.style = this._trStyle;
    return el;
  }
  _createTd(name, colspan) {
    let el = this._document.createElement("td");
    el.innerHTML = name || "";
    el.setAttribute("colspan", colspan || 1)
    el.style = this._tdStyle;
    return el;
  }
  _createTh(name, colspan) {
    let el = this._document.createElement("th");
    el.innerHTML = name || "";
    el.setAttribute("colspan", colspan || 1)
    el.style = this._thStyle;
    return el;
  }

  setTableStyle(json) {
    this._tableStyle = this._parseJsonToCss(json);
  }
  setThStyle(json) {
    this._thStyle = this._parseJsonToCss(json);
  }
  setTdStyle(json) {
    this._tdStyle = this._parseJsonToCss(json);
  }
  setTrStyle(json) {
    this._trStyle = this._parseJsonToCss(json);
  }

  generateHtml() {
    // Table
    const table = this._createTable();
    this._body.appendChild(table);

    // Cols
    const colsRow = this._createTr();
    table.appendChild(colsRow);
    this._json.cols.forEach(col => {
      const th = this._createTh(col.value, col.colspan);
      if (col.color) {th.style.color = col.color};
      if (col.background) {th.style.backgroundColor = col.background};
      colsRow.appendChild(th);
    })

    // Rows
    this._json.rows.forEach(row => {
      const tr = this._createTr();
      table.appendChild(tr);
      row.forEach(value => {
        const td = this._createTd(value.value, value.colspan);
        if (value.color) {td.style.color = value.color};
        if (value.background) {td.style.backgroundColor = value.background};
        tr.appendChild(td);
      })
    })

    return this._body.innerHTML;
  }
}

module.exports = HtmlTable;