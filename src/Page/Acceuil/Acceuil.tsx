import userService from "../../service/user/userService";
const Acceuil: React.FC= () => {
  const token: any = localStorage.getItem('token');
  return userService.getExactRoutes(token);
}
export default Acceuil;
