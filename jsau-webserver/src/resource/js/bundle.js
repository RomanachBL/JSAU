(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
