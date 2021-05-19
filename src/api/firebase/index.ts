import * as firebase from 'firebase/app';
import 'firebase/firestore';

class FirebaseClient {
  public setStockDatum(id: string, data: StockPropertyType) {
    return firebase.firestore().collection(id).doc(data.symbol).set(data);
  }

  public getStockDatum(id: string) {
    return firebase.firestore().collection(id).get();
  }

  public deleteStockDatum(id: string, symbol: string) {
    return firebase.firestore().collection(id).doc(symbol).delete();
  }
}

const firebaseClient = new FirebaseClient();

export default firebaseClient;
