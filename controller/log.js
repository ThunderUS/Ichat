
class Log {

  static #getDataNow(){
    const date= new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  setLog(message){
    console.log(Log.#getDataNow() +" " + message)
  }
}

export default new Log();