function beliProduk(namaProduk) {
  const nomorWA = "6283894922074"; // Ganti dengan nomor admin kamu
  const pesan = `Halo saya ingin beli: ${namaProduk}`;
  const url = `https://wa.me/6283894922074${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

function tambahKeKeranjang(nama, harga) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.push({ nama, harga });
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert(`${nama} berhasil ditambahkan ke keranjang!`);
}

// Tampilkan isi keranjang saat halaman keranjang dibuka
document.addEventListener("DOMContentLoaded", tampilkanKeranjang);

function tampilkanKeranjang() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const container = document.getElementById("keranjang-list");
  const totalDiv = document.getElementById("total-harga");
  container.innerHTML = "";

  if (keranjang.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Keranjang kosong.</p>";
    totalDiv.innerHTML = "";
    return;
  }

  let total = 0;
  keranjang.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("product");
    itemDiv.innerHTML = `
      <h3>${item.nama}</h3>
      <p>Rp${item.harga.toLocaleString()}</p>
      <button onclick="hapusItem(${index})">Hapus</button>
    `;
    container.appendChild(itemDiv);
    total += item.harga;
  });

  totalDiv.innerText = `Total: Rp${total.toLocaleString()}`;
}

function hapusItem(index) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.splice(index, 1); // hapus 1 item dari posisi index
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  tampilkanKeranjang();
}

function filterProduk() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const produkList = document.querySelectorAll(".product");

  produkList.forEach(produk => {
    const nama = produk.querySelector("h3").textContent.toLowerCase();
    if (nama.includes(input)) {
      produk.style.display = "block";
    } else {
      produk.style.display = "none";
    }
  });
}
