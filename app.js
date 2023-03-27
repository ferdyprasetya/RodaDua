const displaysoal = document.querySelector('#pertanyaan')
const displayjawab = document.querySelector('#jawaban')

const pertanyaan = [
    {
        id: 0,
        text: "Merk motor apa yang anda inginkan?",
        jawaban:[
            {
                text: "yamaha",
                image: "anu",
                alt: "gambar yamaha"
            },
            {
                text : "honda",
                image: "anu",
                alt: "gambar honda"
            },
            {
                text : "bmw",
                image: "anu",
                alt: "gambar bmw"
            },
            {
                text : "daihatsu",
                image: "anu",
                alt: "gambar daihatsu"
            }
        ]
    },
    {
        id: 1,
        text: "range harga",
        jawaban:[
            {
                text: "125rebu",
                image: "anu",
                alt: "gambar yamaha"
            },
            {
                text : "225rebu",
                image: "anu",
                alt: "gambar honda"
            },
            {
                text : "325rebu",
                image: "anu",
                alt: "gambar bmw"
            },
            {
                text : "425rebu",
                image: "anu",
                alt: "gambar daihatsu"
            }
        ]
    },
    {
        id: 2,
        text: "cc?",
        jawaban:[
            {
                text: "2cc",
                image: "anu",
                alt: "gambar yamaha"
            },
            {
                text : "3cc",
                image: "anu",
                alt: "gambar honda"
            },
            {
                text : "4cc",
                image: "anu",
                alt: "gambar bmw"
            },
            {
                text : "5cc",
                image: "anu",
                alt: "gambar daihatsu"
            }
        ]
    }
]

const jawaban = [
    {
        combination: ["yamaha", "125rebu", "2cc"],
        text: "nmax trondol second minus kontol",
        image: "https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202202151255313503V70891.png",
        alt: "uwowow"
    },
    {
        combination: ["honda", "325rebu", "3cc"],
        text: "nmag trondol second minus kontol",
        image: "https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202202151255313503V70891.png",
        alt: "uwowow"
    },
    {
        combination: ["bmw", "425rebu", "4cc"],
        text: "nmay trondol second minus kontol",
        image: "https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202202151255313503V70891.png",
        alt: "uwowow"
    },
    {
        combination: ["daihatsu", "225rebu", "5cc"],
        text: "nmaz trondol second minus kontol",
        image: "https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202202151255313503V70891.png",
        alt: "uwowow"
    }
]

const gakepilih = []
const kepilih = []

const populatepertanyaan = () => {
    pertanyaan.forEach(soal => {
        const blockSoal = document.createElement('div')
        blockSoal.id = soal.id
        blockSoal.classList.add('block-soal')
        const judul = document.createElement('h2')
        judul.textContent = soal.text
        blockSoal.append(judul)
        displaysoal.append(blockSoal)

        const blockjawaban = document.createElement('div')
        blockjawaban.id = soal.id + "-jawaban"
        blockjawaban.classList.add('pilihan-jawaban')

        gakepilih.push(soal.id)

        soal.jawaban.forEach(jawab => {
            const blockjawab = document.createElement('div')
            blockjawab.classList.add('block-jawab')
            blockjawab.addEventListener('click', () => handleclick(soal.id, jawab.text))
            const gambarjawab = document.createElement('img')
            gambarjawab.setAttribute('src', jawab.image)

            const juduljawab = document.createElement('h3')
            juduljawab.textContent = jawab.text


            blockjawab.append(gambarjawab, juduljawab)

            blockjawaban.append(blockjawab)
        })

        displaysoal.append(blockjawaban)
    })
}

populatepertanyaan()
const handleclick = (soalId, jawabterpilih) => {
    if (gakepilih.includes(soalId))
    kepilih.push(jawabterpilih)
    const dihapus = gakepilih.indexOf(soalId)

    if (dihapus > -1) {
        gakepilih.splice(dihapus, 1)
    }
    console.log(kepilih)
    console.log(gakepilih)

   // terjawab(soalId, jawabanterpilih)
    const soalIdterkecil = Math.min(...gakepilih)
    location.href = '#' + soalIdterkecil

    if (!gakepilih.length) {
        jawabanmuncul()
    }
}

const jawabanmuncul = () => {
    let hasil
    jawaban.forEach(jawab => {
        if (
           kepilih.includes(jawab.combination[0]) + 
           kepilih.includes(jawab.combination[1]) +
           kepilih.includes(jawab.combination[2])   
        ) {
            hasil = jawab
            return
        } else if (!hasil) {
            //default jawaban pertama
            hasil = jawaban[0]
        }
    })

    console.log(hasil)

    const blockjawab = document.createElement('div')
    blockjawab.classList.add('block-hasil')
    const juduljawab = document.createElement('h3')
    juduljawab.textContent = hasil.text
    const jawabgambar = document.createElement('img')
    jawabgambar.setAttribute('src', hasil.image)
    jawabgambar.setAttribute('alt', hasil.alt)

    blockjawab.append(juduljawab, jawabgambar)
    displayjawab.append(blockjawab)

    const allblockjawab = document.querySelectorAll('.block-jawab')
    Array.from(allblockjawab).forEach(blockjawab => blockjawab.replaceWith(blockjawab.cloneNode(true)))
}

const disableQuestionBlock = (soalId, kepilih) => {
    const currentQuestionBlock = document.getElementById(soalId + "-pertanyaan")

    Array.from(currentQuestionBlock.children).forEach(block => {
        if (block.children.item(1).innerText !== kepilih) {
            block.style.opacity = "50%"
        }
    }
