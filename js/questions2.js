var formElement = null;
var sol_text1 = null;
var sol_text2 = null;
var sol_select1 = null;
var sol_select2 = null;
var sol_chk1 = [];
var sol_chk2 = [];
var sol_multiple1 = [];
var sol_multiple2 = [];
var sol_radio1 = null;
var sol_radio2 = null;
var click = false;
var mensaje = '';
var test =0;
var checked1=false;
var checked2=false;
var checked3=false;
var checked4=false;
var checked5=false;
var checked6=false;
var xmlDoc=null;
var xslDoc=null;
var nota=0;
//******************************************************************************
//Al cargar pagina
window.onload = function()
{ /*CORREGIR al apretar el botón.*/
  formElement=document.getElementById("comprobar");
  formElement.onclick=function()
  {    
    corregir();
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      gestionarXml(this);
    }
  };
	xhttp.open("GET", "xml/questions2.xml", true);
	xhttp.send();

	//LEER XSL
	 var xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	xslDoc=this.responseXML;
	}
	};
	xhttp2.open("GET", "xml/questions.xsl", true);
	xhttp2.send();
 
};


function corregir() {
	comprobar();
	if (test==0){
	corregirRadio("UAP_HE1", "resp1", sol_radio1);
	corregirCheckbox("UAP_HE2", "resp2", sol_chk1);
	corregirText("UAP_HE3", "resp3", sol_text1);
	corregirMulti1("UAP_HE4", "resp4", sol_multiple1);
	corregirRadio("UAP_HE5", "resp5", sol_radio2);
	corregirSelect("UAP_HE6", "resp6", sol_select1);
	corregirMulti1("UAP_HE7", "resp7", sol_multiple2);
	corregirCheckbox("UAP_HE8", "resp8", sol_chk2);
	corregirSelect("UAP_HE9", "resp9", sol_select2);
	corregirText("UAP_HE10", "resp10", sol_text2);
	mensaje='';
	presentarNota();
		}return false;
		}

//inicio verificacion de check de todas las preguntas.
/*Se ha implementado que nos informe de todas las respuestas que faltan por contestar 
y nos diga cuales son*/

function comprobar(){
	var s1 = document.getElementById('resp1').elements["radio"];
	var s2 = document.getElementById('resp2').elements["checkbox"];
	var s3 = document.getElementById('resp3').getElementsByTagName("input")[0].value;
	var s4 = document.getElementById('resp4').getElementsByTagName("option");
	var s5 = document.getElementById('resp5').elements["radio"];
	var s6 = document.getElementById('resp6');
	var s7 = document.getElementById('resp7').getElementsByTagName("option");
	var s8 = document.getElementById('resp8').elements["checkbox"];
	var s9 = document.getElementById('resp9');
	var s10 = document.getElementById('resp10').getElementsByTagName("input")[0].value;
	checked1=false;
	checked2=false;
	checked3=false;
	checked4=false;
	checked5=false;
	checked6=false;
	
	for (i = 0; i < s1.length; i++) {  
      if (s1[i].checked) checked5=true;
	  }
   for (i = 0; i < s2.length; i++) {  
      if (s2[i].checked) checked3=true;
	  }
   for (i = 0; i < s4.length; i++) {  
   if (s4[i].selected) checked1=true;
   }
   for (i = 0; i < s5.length; i++) {  
      if (s1[i].checked) checked6=true;
	  }
   for (i = 0; i < s7.length; i++) {  
   if (s7[i].selected) checked2=true;
   }
   for (i = 0; i < s8.length; i++) {  
      if (s8[i].checked) checked4=true;
	  }
   if (!checked5) {
    mensaje=(mensaje+'falta la pregunta Radio Nº1\n');
    test=1+test;
   }
   if (!checked3) {
    mensaje=(mensaje+'falta la pregunta checkbox Nº2\n');
    test=1+test;
   }if (s3=="") {
    mensaje=(mensaje+ 'falta la pregunta texto Nº3\n');
    test=1+test;
   }if (!checked1) {
    mensaje=(mensaje+'falta la pregunta multiple Nº4\n');
    test=1+test;
   }if (!checked6) {
    mensaje=(mensaje+'falta la pregunta pregunta Radio Nº5\n');
    test=1+test;
   }if (s6.selectedIndex==0){
	   mensaje=(mensaje+'falta la pregunta select Nº6\n');
    test=1+test;
   }if (!checked2) {
    mensaje=(mensaje+'falta la pregunta multiple Nº7\n');
    test=1+test;
   }if (!checked4) {
    mensaje=(mensaje+'falta la pregunta checkbox Nº8\n');
    test=1+test;
   }if (s9.selectedIndex==0){
	   mensaje=(mensaje+'falta la pregunta select Nº9\n');
    test=1+test;
   }if (s10=="") {
    mensaje=(mensaje+'falta la pregunta texto Nº10\n');
    test=1+test;
   }if (mensaje !=''){
	alert('Falta/n la/s siguiente/s pregunta/s\n'+mensaje);
	mensaje ='';
   }else  {test=0;
   return false;
   }
  // fin verificacion de check de todas las preguntas
}
//Rellenamos la página con el contenido de esta.

function gestionarXml(contXml)
{
  var txt="";
  xmlDoc = contXml.responseXML;
  
  //Pregunta nº1  tipo radiobox
  
  question = xmlDoc.querySelector("#UAP_HE1");
  SelecResp = document.querySelector("#resp1");
  tituloSelect = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE1']/option";
  var ty = xmlDoc.getElementsByTagName("type")[0].innerHTML;
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosChb_Rad(q,sel,tituloSelect,nodes,ty);
  //Guardamos respuestas correctas para comprobación posterior.
  sol_radio1 = xmlDoc.getElementById("UAP_HE1").getElementsByTagName("answer")[0].innerHTML;
  
  //Pregunta nº2 tipo checkbox
  
  question = xmlDoc.querySelector("#UAP_HE2");
  SelecResp = document.querySelector("#resp2");
  tituloSelect = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE2']/option";
  var ty = xmlDoc.getElementsByTagName("type")[1].innerHTML;
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosChb_Rad(q,sel,tituloSelect,nodes,ty);
  //Guardamos respuesta/s correctas para comprobación posterior.
  nres = xmlDoc.getElementById("UAP_HE2").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    sol_chk1[i]=xmlDoc.getElementById("UAP_HE2").getElementsByTagName("answer")[i].innerHTML;
  }
  
  //Pregunta nº 3 tipo texto
  
  document.getElementById("UAP_HE3").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  select= document.getElementById("resp3");
  var entrada = document.createElement("input");
  entrada.type = xmlDoc.getElementsByTagName("type")[2].innerHTML;
  entrada.name = "text1";
  entrada.autocomplete="off";
  select.appendChild(entrada);
  /*Guardamos respuesta/s correctas para comprobación posterior.*/
  sol_text1 = xmlDoc.getElementById("UAP_HE3").getElementsByTagName("answer")[0].innerHTML.toUpperCase();

  //Pregunta nº 4 tipo multiple
  
  question = xmlDoc.querySelector("#UAP_HE4");
  SelecResp = document.querySelector("#resp4");
  SelecResp.setAttribute("multiple", "true");
  tituloSelect = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE4']/option";
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosSelect(q,sel,tituloSelect,nodes);
  //Guardamos respuesta/s correctas para comprobación posterior.
  var nres = xmlDoc.getElementById("UAP_HE4").getElementsByTagName("answer").length;
  for (i = 0; i < nres; i++)
  {
    sol_multiple1[i] = xmlDoc.getElementById("UAP_HE4").getElementsByTagName("answer")[i].innerHTML;
  }
  
  //Pregunta nº 5 tipo select
  
  question = xmlDoc.querySelector("#UAP_HE6");
  SelecResp = document.querySelector("#resp6");
  tituloSelect = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE6']/option";
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosSelect(q,sel,tituloSelect,nodes);
  //Guardamos respuesta/s correctas para comprobación posterior.
  sol_select1 = xmlDoc.getElementById("UAP_HE6").getElementsByTagName("answer")[0].innerHTML;
  
  //Pregunta nº 7 tipo multiple

  question = xmlDoc.querySelector("#UAP_HE7");
  SelecResp = document.querySelector("#resp7");
  SelecResp.setAttribute("multiple", "true");
  tituloSelect = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  nopciones = xmlDoc.getElementById("UAP_HE7").getElementsByTagName("option").length;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE7']/option";
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosSelect(q,sel,tituloSelect,nodes);
  //Guardamos respuesta/s correctas para comprobación posterior.
  for (i = 0; i < nres; i++)
  {
    sol_multiple2[i] = xmlDoc.getElementById("UAP_HE7").getElementsByTagName("answer")[i].innerHTML;
  }

  //Pregunta nº 8 tipo checkbox

  question = xmlDoc.querySelector("#UAP_HE8");
  SelecResp = document.querySelector("#resp8");
  tituloSelect = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE8']/option";
  var ty = xmlDoc.getElementsByTagName("type")[7].innerHTML;
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosChb_Rad(q,sel,tituloSelect,nodes,ty);
  //Guardamos respuesta/s correctas para comprobación posterior.
  nres = xmlDoc.getElementById("UAP_HE8").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    sol_chk2[i]=xmlDoc.getElementById("UAP_HE8").getElementsByTagName("answer")[i].innerHTML;
  }
  
  //Pregunta nº 9 tipo select

  question = xmlDoc.querySelector("#UAP_HE9");
  SelecResp = document.querySelector("#resp9");
  tituloSelect = xmlDoc.getElementsByTagName("title")[8].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE9']/option";
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosSelect(q,sel,tituloSelect,nodes);
  //Guardamos respuesta/s correctas para comprobación posterior.
  sol_select2 = xmlDoc.getElementById("UAP_HE9").getElementsByTagName("answer")[0].innerHTML;
  
  //Pregunta nº 10 tipo texto
  
  document.getElementById("UAP_HE10").innerHTML = xmlDoc.getElementsByTagName("title")[9].innerHTML;
  select= document.getElementById("resp10");
  entrada = document.createElement("input");
  entrada.type = xmlDoc.getElementsByTagName("type")[9].innerHTML;
  entrada.name = "text2";
  entrada.autocomplete="off";
  select.appendChild(entrada);
  //Guardamos respuesta/s correctas para comprobación posterior.
  sol_text2 = xmlDoc.getElementById("UAP_HE10").getElementsByTagName("answer")[0].innerHTML.toUpperCase();
  
  //Pregunta nº 5 tipo radiobox
/*Por alguna razón que no he llegado a descubir tengo que poner esta pregunta en ultimo
lugar para que funcione el programa correctamente*/
 
  question = xmlDoc.querySelector("#UAP_HE5");
  SelecResp = document.querySelector("#resp5");
  tituloSelect = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  var sel = SelecResp.getAttribute("id");
  var q = question.getAttribute("id");
  var xpath = "/questions/question[@id='UAP_HE5']/option";
  var ty = xmlDoc.getElementsByTagName("type")[4].innerHTML;
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosChb_Rad(q,sel,tituloSelect,nodes,ty);
  //Guardamos respuesta/s correctas para comprobación posterior.
  sol_radio2 = xmlDoc.getElementById("UAP_HE5").getElementsByTagName("answer")[0].innerHTML;
}

/*Implementación de la corrección de cada pregunta. 
se ha creado una funcion con parametros para ahorrar codigo*/

//corregir tipo text

function corregirText(preg, pregtext, soltext) {
	var s = document.getElementById(pregtext).getElementsByTagName("input")[0].value;
	if (s.toUpperCase() == soltext.toUpperCase()) {
		nota += 1;
	} 
  var useranswer = xmlDoc.createElement("useranswer");   
  useranswer.innerHTML = s.toUpperCase();
  xmlDoc.getElementById(preg).appendChild(useranswer);
}

//corregir select

function corregirSelect(preg, pregselect, solselect) {
	var sel = document.getElementById(pregselect);
	if (sel.selectedIndex-1 == solselect) {
		nota += 1;
	} 
    var useranswer = xmlDoc.createElement("useranswer");   
    useranswer.innerHTML = sel.selectedIndex;
    xmlDoc.getElementById(preg).appendChild(useranswer);
	}

//corregir multiple

function corregirMulti1(preg, pregmulti, solmulti) {
	var v = [];
	var corr = 0;
	var opt = document.getElementById(pregmulti).getElementsByTagName("option");
	for (i = 0; i < opt.length; i++) {
		if (opt[i].selected) {
			v[i] = false;
			for (j = 0; j < solmulti.length; j++) {
				if (i == solmulti[j]) {
					v[i] = true;
				}
				  var useranswer = xmlDoc.createElement("useranswer");   
				 useranswer.innerHTML = i+1;
				 xmlDoc.getElementById(preg).appendChild(useranswer);
				
			}
		}
	}
	for (i = 0; i < opt.length; i++) {
		if (opt[i].selected) {
			if (v[i]) {
				nota += 1.0 / solmulti.length;
			} else {
				nota -= 1.0 / solmulti.length;
			}
		}
	}
}

//Corregir checkbox

function corregirCheckbox(preg, pregchk, solchk) {
	var v = [];
	var opt = document.getElementById(pregchk).elements["checkbox"];
	for (i = 0; i < opt.length; i++) {
		if (opt[i].checked) {
		  var useranswer = xmlDoc.createElement("useranswer");   
          useranswer.innerHTML = i+1;
          xmlDoc.getElementById(preg).appendChild(useranswer);
			v[i] = false;
			for (j = 0; j < solchk.length; j++) {
				if (i == solchk[j]) {
					v[i] = true;
				}
			}
		}
	}
	for (i = 0; i < opt.length; i++) {
		if (opt[i].checked) {
			if (v[i]) {
				nota += 1.0 / solchk.length;
			} else {
				nota -= 1.0 / solchk.length;
			}
		}
	}
}
//Corregir radio

function corregirRadio(preg, pregradio, solradio) {
	var r = null;
	var opt = document.getElementById(pregradio).elements["radio"];
	for (i = 0; i < opt.length; i++) {
		if (opt[i].checked) {
			r = i;
			var useranswer = xmlDoc.createElement("useranswer");   
            useranswer.innerHTML = i+1;
            xmlDoc.getElementById(preg).appendChild(useranswer);
		}
	}
	if (r == solradio) {
		nota += 1;
	}
}

//fin correccion de datos

//Gestionar la presentación de las respuestas.

//Ponemos datos de tipo Select y multiple
function ponerDatosSelect(q,sel,t,nodes)
{
  document.getElementById(q).innerHTML=t;
  var select = document.getElementById(sel);
  var result = nodes.iterateNext();
  i=0;
  while (result)
  {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i; i++;
    select.add(option);
    result = nodes.iterateNext();
  }  
}

//Ponemos datos de tipo Checkbox Radio box

function ponerDatosChb_Rad(q,sel,t,nodes,ty)
{
  document.getElementById(q).innerHTML = t;
  var checkboxContainer=document.getElementById(sel);
  var result = nodes.iterateNext();
  i=0;
  while (result)
  {
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    input.type=ty;
    input.name=ty;
    input.value=i; i++;
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
    result = nodes.iterateNext();
  }
}

function darRespuestaHtml(r) {
  var p = document.createElement("p");
  p.innerHTML=r;
  document.body.appendChild(p);
}

function presentarNota() {
  //bloquear formulario (recargar para volver a empezar)
  document.body.innerHTML="";
  document.body.style.display = "block";
  //Código transformación xslt con xmlDoc y xslDoc
  if (document.implementation && document.implementation.createDocument)
  {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xslDoc);
    resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
    document.body.appendChild(resultDocument);
  }
}

//***************
//*********
function ponerDatosSelect(q,sel,t,nodes)
{
  document.getElementById(q).innerHTML=t;
  var select = document.getElementById(sel);
  var result = nodes.iterateNext();
  i=0;
  while (result)
  {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i; i++;
    select.add(option);
    result = nodes.iterateNext();
  }  
}
//********
//*********************************************************************************************