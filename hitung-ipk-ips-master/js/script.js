$("#calculate-ipk").on("click", () => {
  let ip = [];
  let ips;
  let text = "";

  for (let index = 1; index <= 8; index++) {
    ips = $(`#ips${index}`).val();

    if (ips != "") {
      text += "<li>IPS " + index + ": " + ips + "</li>";
      ip.push(parseFloat(ips));
    }
  }

  let total = 0;

  for (index = 0; index < ip.length; index++) {
    total += ip[index];
  }

  if (ip.length != 0) {
    let ipk = total / ip.length;
    let html = /*html */ `
      <div class="vin-card">
        <h3>Prediksi IPK Akhir hingga semester ${ip.length}</h3>
        <h6 class="card-subtitle mb-3 text-muted">
          Prediksi IPK: ${ipk.toFixed(
            2
          )} jika rincian IP Semester sebagai berikut
        </h6>
        <p>Rincian nilai ips:</p>
        <ul>
        ${text}
        </ul>
      </div>
    `;

    $("#result").html(html);
  } else {
    alert("Field masih kosong semua!");
  }
});

$("#generate").on("click", function () {
  let n_matkul = parseInt($("#n-matkul").val());
  $("#total-matkul").val(n_matkul);

  let html = /*html */ `
  <div class="form-group row">
    <div class="col-md-12">
      <label for="jumlah-matkul" class="col-md-5 col-form-label">Jumlah Matkul yang diambil:</label>
      <input type="text" id="n-matkul" class="col-md-3 form-control" style="display: inline;"
        placeholder="  e.g. 8">
    </div>
  </div>
  <hr>`;

  for (let iteration = 1; iteration <= n_matkul; iteration++) {
    html +=
      /*html*/
      `
    <div class ="mt-4 mb-4">
      <b class = "mb-1">Mata Kuliah ${iteration}</b>
      <div class="form-group row pl-2 pr-3">
        <label for="matkul${iteration}" class="col-md-3 col-form-label">Nama Matkul</label>
        <input type="text" id='matkul${iteration}' class="form-control col-md-9" placeholder="nama matkul">
      </div>
      <div class="form-group row pl-2 pr-3">
        <label for="na${iteration}" class="col-md-3 col-form-label">Nilai Akhir</label>
        <input type="text" id='na${iteration}' class="form-control col-md-4"
          placeholder="Angka pesimis (e.g. 72 -> B+)">
        <label for="sks${iteration}" class="col-md-2 col-form-label">SKS</label>
        <input type="text" id='sks${iteration}' class="form-control col-md-3" placeholder="n sks">
      </div>
      <hr>
    </div>`;
  }

  $("#form-set").html(html);
});

$("#calculate-ips").on("click", () => {
  let na = [];
  let sks = [];
  let matkul = [];
  let na_ke;
  let n_matkul = parseInt($("#total-matkul").val());

  for (let item = 1; item <= n_matkul; item++) {
    na_ke = $(`#na${item}`).val();

    if (na_ke != "") {
      na.push(parseFloat(na_ke));
      sks.push(parseInt($(`#sks${item}`).val()));
      matkul.push($(`#matkul${item}`).val());
    }
  }

  let idx = [];
  let alphabet = [];
  //hitung index akhir
  for (index = 0; index < na.length; index++) {
    if (na[index] >= 80) {
      idx.push(4.0);
      alphabet.push("A");
    } else if (na[index] >= 76) {
      idx.push(3.7);
      alphabet.push("A-");
    } else if (na[index] >= 72) {
      idx.push(3.4);
      alphabet.push("B+");
    } else if (na[index] >= 68) {
      idx.push(3.0);
      alphabet.push("B");
    } else if (na[index] >= 64) {
      idx.push(2.7);
      alphabet.push("B-");
    } else if (na[index] >= 60) {
      idx.push(2.4);
      alphabet.push("C+");
    } else if (na[index] >= 56) {
      idx.push(2);
      alphabet.push("C");
    } else if (na[index] >= 41) {
      idx.push(1);
      alphabet.push("D");
    } else {
      idx.push(0);
      alphabet.push("E");
    }
  }

  // hitung IPS
  let total = 0;
  let total_sks = 0;
  let detail = "";

  for (index = 0; index < idx.length; index++) {
    total += idx[index] * sks[index];
    total_sks += sks[index];

    detail += /*html */ `
        <div class = "col-md-4 mb-3">
          <p>Mata Kuliah: ${matkul[index]}</p>
          <ul>
            <li>Nilai AKhir : ${na[index]}</li>
            <li>Jumlah SKS  : ${sks[index]}</li>
            <li>Index       : ${alphabet[index]}</li>
            <li>Angka       : ${idx[index]}</li>
          </ul>
        </div>
    `;
  }

  if (total_sks != 0) {
    let ips = total / total_sks;
    let html = /*html */ `
      <div class="vin-card">
        <h3>Prediksi IPS</h3>
        <h6 class="card-subtitle mb-3 text-muted">
          Prediksi IPS: ${ips} jika rincian nilai akhir sebagai berikut
        </h6>
        <p>Rincian nilai per matakuliah:</p><hr>
        <div class = "row">
          ${detail}
        </div>
      </div>
    `;

    $("#result-ips").html(html);
  }
});
