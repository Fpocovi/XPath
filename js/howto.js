function nuevoexamen1() {
	var texto = null;
	texto = document.getElementById("nuevoexamen").selectedIndex;
	if (texto == 0) {
		window.location.href = "examen.html"
	} else {
		window.location.href = "examen2.html"
	}
}