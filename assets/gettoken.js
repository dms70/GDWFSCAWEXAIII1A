
import React,{useState,useEffect,useCallback} from 'react';

export default function gettoken() {

document.addEventListener('DOMContentLoaded', function () {

  let userRating = document.querySelector('.js-user-rating');
  console.log("tokenreceived",userRating);
  let token = userRating.dataset.isAuthenticated;
  sessionStorage.setItem("token",token);
  let tokentuse = sessionStorage.getItem("token");
  console.log("tokeninfunction",tokentuse);

});




}


