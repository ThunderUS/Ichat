import * as fs from"fs";
class Log {

   getDataNow(type) {
    const date = new Date();
    if (type) {
      return `${date.getMonth()+1}_${date.getDate()}_${date.getFullYear()}`;
    }else{
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
  setLog(message){
    console.log(this.getDataNow() +" " + message);
    fs.appendFile(`logs/log_${this.getDataNow(15)}.txt`,"\n"+this.getDataNow(1)+"-"+this.getDataNow()+" "+message,(err)=>{
      if (err) {
        console.log(err)
      }
    })
  }
}

export default new Log();