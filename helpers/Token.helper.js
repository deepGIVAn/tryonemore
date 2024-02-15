class TokenHelperClass {
  constructor() {
    this.accessToken = "panel-token";
    this.user = "user";
    this.role = "role";
  }
  getToken = () => {
    if (typeof window !== "undefined")
      return localStorage.getItem(this.accessToken);
  };
  createToken = (token) => {
    if (typeof window !== "undefined")
      return localStorage.setItem(this.accessToken, token);
  };
  deleteToken = () => {
    if (typeof window !== "undefined")
      return localStorage.removeItem(this.accessToken);
  };
  getUser = () => {
    if (typeof window !== "undefined") return localStorage.getItem(this.user);
  };
  createUser = (id) => {
    if (typeof window !== "undefined")
      return localStorage.setItem(this.user, id);
  };
  deleteUser = () => {
    if (typeof window !== "undefined")
      return localStorage.removeItem(this.user);
  };
  getRole = () => {
    if (typeof window !== "undefined") return localStorage.getItem(this.role);
  };
  createRole = (role) => {
    if (typeof window !== "undefined")
      return localStorage.setItem(this.role, role);
  };
  deleteRole = () => {
    if (typeof window !== "undefined")
      return localStorage.removeItem(this.role);
  };
}

const TokenHelper = new TokenHelperClass();
export default TokenHelper;
