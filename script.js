function getpilihanComputer() {
    const comp = Math.random();
    if(comp < 0.34) return 'batu';
    if(comp >= 0.34 && comp < 0.67) return 'gunting';
    return 'kertas';
}

function getHasil(comp, player) {
   if(player == comp) return 'SERI!';
   if(player == 'batu') return (comp == 'gunting') ? 'MENANG!' : 'KALAH!';
   if(player == 'gunting') return (comp == 'batu') ? 'KALAH!' : 'MENANG!';
   if(player == 'kertas') return (comp == 'gunting') ? 'KALAH!' : 'MENANG!';
}

function putar(){
    const imgComputer = document.querySelector('.img-computer');
    const namaGambar = ['batu', 'gunting', 'kertas'];
    let index = 0;
    const waktuMulai = new Date();
    setInterval(function(){
        if(new Date().getTime() - waktuMulai > 1000){
            clearInterval;
            return;
        }
        imgComputer.setAttribute('src', 'img/' + namaGambar[index++] + '.jfif');
        if(index == namaGambar.length) index = 0;
    }, 100);
}

const pilihan = document.querySelectorAll('.body-player img');
let skorComputer = 0;
let skorPlayer = 0;
pilihan.forEach(function(pil){
    pil.addEventListener('click', function(){
        const pilihanComputer = getpilihanComputer();
        const pilihanPlayer = pil.className;
        const hasil = getHasil(pilihanComputer, pilihanPlayer);
        putar();
        setTimeout(function(){
            const imgComputer = document.querySelector('.img-computer');
            imgComputer.setAttribute('src', 'img/' + pilihanComputer + '.jfif');
            document.getElementById('hasil').innerHTML = hasil;
            if(hasil == 'MENANG!') skorPlayer++;
            if(hasil == 'KALAH!') skorComputer++;
            document.getElementById('skorComputer').innerHTML = skorComputer;
            document.getElementById('skorPlayer').innerHTML = skorPlayer;
            if(skorComputer == 5){
                Swal.fire({
                    title: "Computer",
                    text: "Yahahaha Ezz nih bos!",
                    icon: "error"
                });
                skorComputer = 0;
                skorPlayer = 0;
            }else if(skorPlayer == 5){
                Swal.fire({
                    title: "Berhasil",
                    text: "Selamat anda telah mengalahkan",
                    icon: "success"
                });
                skorComputer = 0;
                skorPlayer = 0;
            }
        }, 1000);
    });
});