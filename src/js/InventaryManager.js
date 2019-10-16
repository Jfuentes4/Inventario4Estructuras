import Article from './Article.js';

class InventaryManager {
  constructor () {
    this._first = null;
  }

  addArticle = (dataArticle) => {
    if (this._ifDontExist(dataArticle.code)) {
      if(this._setArticleToArrayAndLS(dataArticle)){
        window.alert('el articulo ha sido añadido correctamente');
      }
    } else {
      window.alert('este Articulo ya esta actualmente registrado');
    }
    console.log(this._first);
  }

  _setArticleToArrayAndLS = (dataArticle) => {
    let success = false;
    console.log(dataArticle);
    if (this._first === null) {
      this._first = {data: new Article(dataArticle), next: null, prev: null};
    } else if (dataArticle.code < this._first.data.code) {
      let temp = this._first;
      this._first = {data: new Article(dataArticle), next: temp, prev: null};
    } else {
      this._add(dataArticle, this._first);
    }

    return success;
  }

  _add = (newElement, lastElement) => {
    if (lastElement.next === null || lastElement.next.data.code > newElement.code) {
      let temp = {data: new Article(newElement), next: lastElement.next, prev: lastElement}
      lastElement.next = temp;
    } else {
      this._add(newElement, lastElement.next);
    }
  }

  /*_insertInPos = (newElement, pos) => {
    let current = this._first;
    for (let i = 1; i < pos - 1 && current.next !== null; i++) {
      current = current.next;
    }
    let tmp = current.next;
    current.next = {data: new Article(newElement), next: tmp};
  }*/

  deleteArticle = (code) => {
    let found = this.findArticle(Number(code));
    if (found){
      this._myRemove(code);
      window.alert('Se ha eliminado el producto ' + code + ' correctamente.');
    } else {
      window.alert('no se encontro el producto con el codigo ' + code);
    }
  }

  _myRemove = (code) => {
    let deleted = false,
    current = this._first;
    if (current.data.code === code) {
      this._first = current.next;
    } else {
      while (current !== null && current.next !== null && !deleted) {
        if (current.next.data.code === code) {
          current.next = current.next.next;
          if (current.next !== null) {
            current.next.prev = current;
          }
          deleted = true;
        }
        current = current.next;
      }
    }
    return deleted;
  }

  searchArticles = (str) => {
    let result = this.findArticle(Number(str));
    console.log(result);
    if (result){
      window.alert(result.data.toString());
    } else {
      window.alert('no se encontro el producto con el indice ' + str);
    }
  }

  report = (report) => {
    let reportstr = '<h3>Reporte de Inventario</h3> <br><br>',
    sumArticles = 0,
    current = this._first,
    noArticlesD = 0;

    while (current !== null){
      noArticlesD++;
      sumArticles += current.data.quantity;
      reportstr += current.data.toString() + '<br>';
      current = current.next;
    }

    reportstr += '<br>Total de Articulos Distintos: ' + noArticlesD + ' Total de Articulos en inventario: ' + sumArticles;
    report.innerHTML = reportstr;
  }

  inverseReport = (report) => {
    let reportstr = '<h3>Reporte de Inventario</h3> <br><br>',
    current = this._first,
    sumArticles = 0,
    noArticlesD = 0;

    while (current.next !== null){
      current = current.next;
    }

    while (current !== null){
      noArticlesD++;
      sumArticles += current.data.quantity;
      reportstr += current.data.toString() + '<br>';
      current = current.prev;
    }

    reportstr += '<br>Total de Articulos Distintos: ' + noArticlesD + ' Total de Articulos en inventario: ' + sumArticles;
    report.innerHTML = reportstr;
  }


  _ifDontExist = (code) => {
    let dontExist = true;
    if (this.findArticle(Number(code))) {
      dontExist = false;
    }
    return dontExist;
  }

  findArticle = (pCode) => {
    let found = false,
    current = this._first;
    pCode = Number(pCode);
    while (current !== null && !found) {
      console.log(current.data.code);
      if (current.data.code === pCode) {
        found = current;
      } else {
        current = current.next;
      }
    }
    return found;
  }

}

export default InventaryManager;
