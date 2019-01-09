global.t = function verifTxt(champ)
{
   if(champ.value.length == 0)
   {
      champ.style.borderColor = "red";
   }
}

global.n = function verifNb(champ)
{
   if(champ.value.length == 0)
   {
      champ.style.borderColor = "red";
   }
}

global.g = function verifGenre(champ)
{
   if(champ.value.length == 0)
   {
      champ.style.borderColor = "red";
   }
}
/*
global.f = function verifForm(f)
{
   //console.log("Je suis dans verifForm");
   var txt = verifTxt(f.nom);
   var nb = verifNb(f.nombre);
   var gn = verifGenre(f.genre);
   if(txt && nb && gn){
      alert("Vous avez ajouté le jeu : "+f.nom.value);
      return true;
   }
   else
   {
      alert("Veuillez remplir tous les champs");
      return false;
   }
}
*/
