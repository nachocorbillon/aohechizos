
  document.getElementById("cargarHechizo").addEventListener("click", function() {
    var hechizoArray = document.getElementById("hechizoArray").value.trim();
    if (hechizoArray === "") {
      alert("Por favor, ingrese el hechizo en formato de arreglo.");
      return;
    }
    try {
      var hechizos = JSON.parse(hechizoArray);
      if (!Array.isArray(hechizos)) {
        alert("El valor ingresado no es un arreglo válido.");
        return;
      }
      mostrarHechizoEnTabla(hechizos);
    } catch (error) {
      alert("Ocurrió un error al procesar el hechizo: " + error.message);
    }
  });

function mostrarHechizoEnTabla(hechizo) {
    document.querySelector('input[name="id"]').value = hechizo[0];
    document.querySelector('input[name="nombre"]').value = hechizo[1];
    document.querySelector('textarea[name="desc"]').value = hechizo[2];
    document.querySelector('input[name="palabras_magicas"]').value = hechizo[3];
    document.querySelector('input[name="hechizero_msg"]').value = hechizo[4];
    document.querySelector('input[name="propio_msg"]').value = hechizo[5];
    document.querySelector('input[name="target_msg"]').value = hechizo[6];
    document.querySelector('input[name="tipo"]').value = hechizo[7];
    document.querySelector('select[name="wav"]').value = hechizo[8]; 
    document.querySelector('input[name="fx_grh"]').value = hechizo[9];
    document.querySelector('input[name="loops"]').value = hechizo[10];
    document.querySelector('input[name="min_skill"]').value = hechizo[11];
    document.querySelector('input[name="mana_requerido"]').value = hechizo[12];
    document.querySelector('input[name="sta_requerido"]').value = hechizo[13];
    document.querySelector('input[name="target"]').value = hechizo[14];
    document.querySelector('input[name="sube_hp"]').value = hechizo[15];
    document.querySelector('input[name="min_hp"]').value = hechizo[16];
    document.querySelector('input[name="max_hp"]').value = hechizo[17];
    document.querySelector('input[name="sube_mana"]').value = hechizo[18];
    document.querySelector('input[name="min_mana"]').value = hechizo[19];
    document.querySelector('input[name="max_mana"]').value = hechizo[20];
    document.querySelector('input[name="sube_sta"]').value = hechizo[21];
    document.querySelector('input[name="min_sta"]').value = hechizo[22];
    document.querySelector('input[name="max_sta"]').value = hechizo[23];
    document.querySelector('input[name="sube_ham"]').value = hechizo[24];
    document.querySelector('input[name="min_ham"]').value = hechizo[25];
    document.querySelector('input[name="max_ham"]').value = hechizo[26];
    document.querySelector('input[name="sube_sed"]').value = hechizo[27];
    document.querySelector('input[name="min_sed"]').value = hechizo[28];
    document.querySelector('input[name="max_sed"]').value = hechizo[29];
    document.querySelector('input[name="sube_ag"]').value = hechizo[30];
    document.querySelector('input[name="min_ag"]').value = hechizo[31];
    document.querySelector('input[name="max_ag"]').value = hechizo[32];
    document.querySelector('input[name="sube_fu"]').value = hechizo[33];
    document.querySelector('input[name="min_fu"]').value = hechizo[34];
    document.querySelector('input[name="max_fu"]').value = hechizo[35];
    document.querySelector('input[name="sube_ca"]').value = hechizo[36];
    document.querySelector('input[name="min_ca"]').value = hechizo[37];
    document.querySelector('input[name="max_ca"]').value = hechizo[38];
    document.querySelector('input[name="invisibilidad"]').value = hechizo[39];
    document.querySelector('input[name="paraliza"]').value = hechizo[40];
    document.querySelector('input[name="inmoviliza"]').value = hechizo[41];
    document.querySelector('input[name="remover_paralisis"]').value = hechizo[42];
    document.querySelector('input[name="remover_estupidez"]').value = hechizo[43];
    document.querySelector('input[name="remueve_invisibilidad_parcial"]').value = hechizo[44];
    document.querySelector('input[name="cura_veneno"]').value = hechizo[45];
    document.querySelector('input[name="envenena"]').value = hechizo[46];
    document.querySelector('input[name="revivir"]').value = hechizo[47];
    document.querySelector('input[name="ceguera"]').value = hechizo[48];
    document.querySelector('input[name="estupidez"]').value = hechizo[49];
    document.querySelector('input[name="invoca"]').value = hechizo[50];
    document.querySelector('input[name="num_npc"]').value = hechizo[51];
    document.querySelector('input[name="cant"]').value = hechizo[52];
    document.querySelector('input[name="mimetiza"]').value = hechizo[53];
    document.querySelector('input[name="materializa"]').value = hechizo[54];
    document.querySelector('input[name="itemindex"]').value = hechizo[55];
    document.querySelector('input[name="staff_affected"]').value = hechizo[56];
    document.querySelector('input[name="need_staff"]').value = hechizo[57];
    document.querySelector('input[name="resis"]').value = hechizo[58];
}
/*********FUNCIONES DE AUDIO**********/
  for (var i = 1; i <= 175; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    document.querySelector('select[name="wav"]').appendChild(option);
  }

  function reproducirSonido() {
    var seleccionado = document.getElementById("wav").value;
   
 var audio = new Audio("./WAV/" + seleccionado + ".wav");
    // Reproducir el sonido
    audio.play();
  }

  document.getElementById("play").addEventListener("click", reproducirSonido);