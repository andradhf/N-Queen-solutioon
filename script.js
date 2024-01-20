class NQueenProblem {
  nQueen(n) {
    let column = new Set();
    let posDiagonal = new Set();
    let negDiagonal = new Set();

    let res = [];
    let board = Array.from({ length: n }, () => Array(n).fill("| . |"));

    function backtrack(r) {
      if (r === n) {
        let copy = board.map((row) => row.join(" "));
        res.push(copy);
        return;
      }

      for (let c = 0; c < n; c++) {
        if (column.has(c) || posDiagonal.has(r + c) || negDiagonal.has(r - c)) {
          continue;
        }

        column.add(c);
        posDiagonal.add(r + c);
        negDiagonal.add(r - c);
        board[r][c] = "| Q |";

        backtrack(r + 1);

        column.delete(c);
        posDiagonal.delete(r + c);
        negDiagonal.delete(r - c);
        board[r][c] = "| . |";
      }
    }

    backtrack(0);
    return res;
  }
}

// untuk tampil di html

function problemQueen() {
  const n = parseInt(document.getElementById("input").value);
  const inti_masalah = new NQueenProblem();
  const hasil = inti_masalah.nQueen(n);
  const hitung_solusi = document.querySelector(".hitung-solusi");
  const tampilkan = document.getElementById("untuk-menampilkan-solusi");
  tampilkan.innerHTML = " ";

  for (let i = 0; i < hasil.length; i++) {
    const header = document.createElement("h3");
    header.textContent = `Solusi ke ${i + 1} :`;
    tampilkan.appendChild(header);

    for (let row of hasil[i]) {
      const baris = document.createElement("div");
      baris.style =
        "border-top: 1px solid black; border-bottom: 1px solid black;";
      baris.textContent = row;
      tampilkan.appendChild(baris);
    }

    const tab = document.createElement("br");
    tampilkan.appendChild(tab);
  }

  if (n === 3 || n === 2) {
    const h2 = document.createElement("h2");
    h2.textContent = "Solusi Tidak Di Temukan";
    h2.style = "text-align: center; font-size: 2rem;";
    tampilkan.appendChild(h2);
    hitung_solusi.textContent = "";
    return;
  }

  alert(`Ada ${hasil.length} Solusi`.replace('this page says','AI Memperhitungkan'));
}
