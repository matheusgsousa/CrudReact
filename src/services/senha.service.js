import firebase from "../firebase";

const db = firebase.ref("/senhas");

class SenhaDataService {
  getAll() {
    return db;
  }

  create(senha) {
    return db.push(senha);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new SenhaDataService();
