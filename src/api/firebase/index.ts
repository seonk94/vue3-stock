import * as firebase from 'firebase/app';
import 'firebase/firestore';

class FirebaseClient {
  id = '';

  private checkId() {
    return Boolean(this.id);
  }

  public setId(id: string) {
    this.id = id;
  }

  public setStockDatum(data: StockPropertyType) {
    firebase.firestore().collection(this.id).doc(data.symbol).set(data);
  }

  public getStockDatum() {
    return firebase.firestore().collection(this.id).get();
  }

  public deleteStockDatum(symbol: string) {
    return firebase.firestore().collection(this.id).doc(symbol).delete();
  }
}

const firebaseClient = new FirebaseClient();

export default firebaseClient;
