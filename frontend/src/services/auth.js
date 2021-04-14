class Auth {
  key = 'lapiseira-token';

  hasToken() {
      return this.getToken() != null;
  }

  getId(){
    if(localStorage.getItem(this.key)){
      const {id} = JSON.parse(localStorage.getItem(this.key));

      return id;
    }
    return null;
  }

  getToken() {
    if(localStorage.getItem(this.key)){
      const {token} = JSON.parse(localStorage.getItem(this.key));

      return token;
    }
    return null;
  }

  setToken(info){
      localStorage.setItem(this.key, JSON.stringify(info));
  }

  destroyToken() {
      localStorage.removeItem(this.key);
  }

  isParent(){

    if(localStorage.getItem(this.key)){
      const {type} = JSON.parse(localStorage.getItem(this.key));
      
      if(type === "Parent"){
        return true;
      }else{
        return false;
      }
    }

    return null;
}
}
export default new Auth();