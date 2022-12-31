/**
 * verifie si la chaine renseigné est un email
 * check if email is valide
 * @param string emailAdress
 * @return bool
 */
export const isEmail = (emailAdress: string) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) return true;
  else return false;
};
