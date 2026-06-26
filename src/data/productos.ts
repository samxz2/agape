export interface Producto {
  id: number
  nombre: string
  categoria: 'caballero' | 'dama' | 'unisex' | 'sets'
  precio: number
  oldPrice: number | null
  precioOferta: number | null
  enOferta: boolean
  estadoEnvio: 'disponible' | 'proximamente' | 'agotado'
  descripcion: string
  intensidad: string
  imagen: string
}

export const productos: Producto[] = [
    {
    id: 1,
    nombre: "ARMAF ODYSSEY MANDARIN SKY EDP 200ML MEN",
    categoria: "caballero",
    precio: 59,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Alta",
    imagen: "https://i.ibb.co/FLfHbMrZ/3c8fd7a440947e819ff4bfe89cdd835b.jpg"
  },
  {
    id: 2,
    nombre: "ARMAF CLUB DE NUIT INTENSE 105ML MEN",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/RkqHG4DV/15c1c77c3e00c0a0be37899f19bfacb7.jpg"
  },
  {
    id: 48,
    nombre: "ISSEY MIYAKE EDT 125ML",
    categoria: "caballero",
    precio: 55,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/1YK9ybwW/aa72bbaa89d27c501cee03f5a9508937.jpg"
  },
   {
    id: 49,
    nombre: "ISSEY MIYAKE EDT 200ML",
    categoria: "caballero",
    precio: 75,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/YFFMJyNT/482f2e30cbefef7b629deb40077a81b2.jpg"
  },
   {
    id: 50,
    nombre: "ISSEY MIYAKE EDT 75ML",
    categoria: "caballero",
    precio: 45,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/Y7JG9MLm/fddf1564537abb660b332cfea6ee8c1e.jpg"
  },
  {
    id: 3,
    nombre: "DUMONT NITRO RED EDP 100ML CABALLERO",
    categoria: "caballero",
    precio: 45,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Alta",
    imagen: "https://i.ibb.co/Lh9gTPGZ/fec78789ecaf969e3b3feb7c71cfaa8c.jpg"
  },
  {
    id: 4,
    nombre: "BENETTON COLD 100ML CABALLERO",
    categoria: "caballero",
    precio: 19,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/DPYdY3Jf/db52204e8266eee900959d286d0c4c51.jpg"
  },
  {
    id: 5,
    nombre: "AB BLUE SEDUCTION EDT 100ML CABALLERO",
    categoria: "caballero",
    precio: 29,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Muy Alta",
    imagen: "https://i.ibb.co/5gsDHq0r/8700e287874a8034867eed5b4dcabed6.jpg"
  },
  {
    id: 6,
    nombre: "AFNAN 9PM EDP 100ML CABALLERO",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/Xr4hWpCk/84f64447a3b7ad811809910c566cc9a6.jpg"
  },
  {
    id: 7,
    nombre: "AL HARAMAIN AMBER OUD GOLD EDP 60ML",
    categoria: "unisex",
    precio: 60,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Alta",
    imagen: "https://i.ibb.co/GfjVdg2b/44622b203dc42ef9d2e1ac403e540acf.jpg"
  },
  {
    id: 8,
    nombre: "ARMAF ODYSSEY SPECTRA EDP 100ML UNISEX",
    categoria: "unisex",
    precio: 39,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/99TMz5y3/48f2399f0c377a80a9a8f2653a70df7a.jpg"
  },
  {
    id: 9,
    nombre: "ARMAF ODYSSEY BAHAMAS TROPICAL EDP 100ML UNISEX",
    categoria: "unisex",
    precio: 49,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/TB6vDcNF/0d9eac32d3608c46a0dc3a65e7810af9.jpg"
  },
  {
    id: 10,
    nombre: "AFNAN 9AM 100ML EDP WOMEN",
    categoria: "dama",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/tTw2NPB3/6a37133b89582f53fcbef4e6b0d9d1e8.jpg"
  },
  {
    id: 11,
    nombre: "AFNAN 9AM DIVE UNISEX 100ML EDP SPRAY",
    categoria: "unisex",
    precio: 36,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/Gfv8GNsL/47c003ecccbc8c91d0e3c2e880ae26cf.jpg"
  },
  {
    id: 12,
    nombre: "ARMAF CLUB DE NUIT EDP 105ML WOMEN",
    categoria: "dama",
    precio: 37,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/CKV8K7Gj/a5e9c0ce1cbe7a1f8bf7eaf15094673b.jpg"
  },
  {
    id: 13,
    nombre: "ARMAF CLUB DE NUIT UNTOLD EDP 105ML UNISEX",
    categoria: "unisex",
    precio: 47,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/84GqyzJf/88a1df79760eb311b0dc66622c802cea.jpg"
  },
  {
    id: 14,
    nombre: "ARMAF ODYSSEY CANDEE 100ML EDP WOMEN",
    categoria: "dama",
    precio: 29,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/0yZ175qj/bd774ffba7c8a8875834ed3e4c31a619.jpg"
  },
  {
    id: 15,
    nombre: "ARMAF ODYSSEY MANDARIN SKY VINTAGE EDITION 100ML EDP SPR MEN",
    categoria: "caballero",
    precio: 45,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/WWY1CGC1/268b8fa4316b9a4a5f2e5d183c3dca59.jpg"
  },
  {
    id: 16,
    nombre: "ARMAF CLUB DE NUIT BLING EDP 105ML SPR MEN",
    categoria: "caballero",
    precio: 54,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/7JRC4nT2/fd504946ede24eacb819f5f1dbc6db65.jpg"
  },
  {
    id: 17,
    nombre: "BHARARA ROME POUR FEMME 100ML EDP FOR WOMEN",
    categoria: "dama",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/355NnjSG/91f8d09e182b7ece3b3a9158ea4a1f42.jpg"
  },
  {
    id: 18,
    nombre: "MAST ROME POUR HOMME 100ML EDP FOR MEN",
    categoria: "caballero",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/SDbDgg6V/31e78d8d9744da850a3c5b8168676e1d.jpg"
  },
  {
    id: 19,
    nombre: "BHARARA MAST PERFUME ROME EXTRADOSE (VALENTINO) MEN 100ML",
    categoria: "caballero",
    precio: 39,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/k2bG6hBJ/8755f198e1e15451bb291f4bfe7060cf.jpg"
  },
  {
    id: 20,
    nombre: "BHARARA KING 100ML EDP MEN",
    categoria: "caballero",
    precio: 59,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/20Z57x53/d187c52c49893fefbf9db3fc0b9b9f7b.jpg"
  },
  {
    id: 21,
    nombre: "BS FANTASY 100ML EDP WOMEN",
    categoria: "dama",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/RG7XLjpz/185017aeab0515b50f7a629de604707f.jpg"
  },
   {
    id: 22,
    nombre: "STALLION 53 100ML UNISEX",
    categoria: "unisex",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/HpxG3xw6/c8112daff96ac40619139b8a9f3c7f81.jpg"
  },
   {
    id: 23,
    nombre: "AL HARAMAIN AMBER OUD GOLD 120ML EDP UNISEX",
    categoria: "unisex",
    precio: 59,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/d48pTBFp/8af966bbb694251f31db991c7272f0ec.jpg"
  },
   {
    id: 24,
    nombre: "SET LATTAFA ASAD COLLECTION 4X25ML C/U MEN",
    categoria: "sets",
    precio: 44,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/6ccRvS6W/8da2b33f95f1449b48eb738cf75906c0.jpg"
  },
   {
    id: 25,
    nombre: "LATTAFA ECLAIRE 100ML EDP SPRAY",
    categoria: "dama",
    precio: 39,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/ycTPB2Sk/95b24dc9c726faf6b049d40547e9bbed.jpg"
  },
   {
    id: 26,
    nombre: "MINI SET LATTAFA YARA 4X5ML",
    categoria: "sets",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/YFNp6NxB/f2f6571c892ec88c4d44f8a0841cc0df.jpg"
  },
   {
    id: 27,
    nombre: "SET LATTAFA YARA COLLECTION 4X25ML",
    categoria: "sets",
    precio: 44,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/hJ8RLjcM/4d6313d37fbcb6047d1669c2a0c08f7c.jpg"
  },
   {
    id: 28,
    nombre: "LATTAFA YARA ELIXIR 100ML EDP",
    categoria: "dama",
    precio: 40,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/PGT2PkKN/0c6b5ee868435c314960c60ee3e15ba1.jpg"
  },
   {
    id: 29,
    nombre: "SET YARA 3PCS WITH 100ML EDP 12ML TRAVEL SPRAY 50ML HAIRMIST",
    categoria: "sets",
    precio: 47,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/pr2vkS7p/fb6531fba1f99b8e96feea9669d9d5fe.jpg"
  },
   {
    id: 30,
    nombre: "LATTAFA ASAD BOURBON 3PCS WITH 100ML EDP 12ML TRAVEL SPR 100ML SHOWER GEL",
    categoria: "sets",
    precio: 47,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/bRyZXwFm/d95788b8d9e85b4c4994d07dbda96fc4.jpg"
  },
   {
    id: 31,
    nombre: "LATTAFA QIMMAH 100ML EDP WOMEN",
    categoria: "dama",
    precio: 29,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/zhjYYFbs/ea481b4feabf8286c611752bbb7ae751.jpg"
  },
   {
    id: 32,
    nombre: "LATTAFA QAED AL FURSAN 90ML UNISEX",
    categoria: "unisex",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/bMhdC4wb/78262e9499e6d3c5a809372d394d6d02.jpg"
  },
   {
    id: 33,
    nombre: "LATTAFA FAKHAR 100ML EDP WOMEN",
    categoria: "dama",
    precio: 34,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/N4JvsR1/90776caed51071bcc18030b7a29cf970.jpg"
  },
   {
    id: 34,
    nombre: "LATTAFA RAVE NOW BLACK 100ML EDP",
    categoria: "caballero",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/jd405QP/6873affbb39ffb57439b3e357eaf0afd.jpg"
  },
   {
    id: 35,
    nombre: "LATTAFA YARA MOI 100ML EDP",
    categoria: "dama",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/HLr62mMq/b080ccf4e5eecaa499a96e0ad3d31e4d.jpg"
  },
   {
    id: 36,
    nombre: "LATTAFA BADEE AL OUD HONOR AND GLORY 100ML",
    categoria: "unisex",
    precio: 34,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/CK9Qd4G5/93d8b5e8826042c9a1cebb52b6e8c2d9.jpg"
  },
   {
    id: 37,
    nombre: "LATTAFA BADEE AL OUD SUBLIME 100ML EDP",
    categoria: "unisex",
    precio: 34,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/nNB8nxRV/509457bd58ab77d7e804a4b34b020d6f.jpg"
  },
  {
    id: 38,
    nombre: "LATTAFA HAMBRA MUSAMAM WHITE INTENSE 100ML EDP",
    categoria: "dama",
    precio: 45,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/kg14ZFZZ/58d66a5d405c1d1f1c8da5668a1f9f20.jpg"
  },
  {
    id: 39,
    nombre: "LATTAFA NOW RAVE PINK 100ML EPD WOMEN",
    categoria: "dama",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/TxRvPdLq/d4277f0d86871fab80a4a2124ea4aa9c.jpg"
  },
  {
    id: 40,
    nombre: "LATTAFA YARA TOUS 100ML EDP WOMEN",
    categoria: "dama",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/Lh8b0T16/63e376524475db2922311ec09ab4fe26.jpg"
  },
    {
    id: 41,
    nombre: "LATTAFA YARA CANDY 100ML EDP WOMEN",
    categoria: "dama",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/nMf9424d/b405fbac68cd195b14dedfb6715f5059.jpg"
  },
    {
    id: 42,
    nombre: "LATTAFA BADEE AL OUD NOBLE BLUSH 100ML EDP WOMEN",
    categoria: "dama",
    precio: 32,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/h1MKMRmb/65cfa0c5db2592cdd4f9974fabc1b790.jpg"
  },
    {
    id: 43,
    nombre: "LATTAFA YARA 100ML EDP WOMEN",
    categoria: "dama",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/fVKc8W53/699a0b2a53163d2fae51a83751082f4b.jpg"
  },
    {
    id: 44,
    nombre: "LATTAFA BADEE AL OUD AMETHYST 100ML EDP UNISEX",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/4n7rmcT3/61d2ab7478190444e147c8d79fee3165.jpg"
  },
    {
    id: 45,
    nombre: "LATTAFA KHAMRAH 100ML EDP UNISEX",
    categoria: "unisex",
    precio: 36,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/jkLys5cC/406012bf503ff02287027e75242a4ce7.jpg"
  },
    {
    id: 46,
    nombre: "LATTAFA QAED AL FURSAN UNLIMITED 90ML EDP UNISEX",
    categoria: "unisex",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/v4Ysfjtn/272f0522444bb6c7aea60f299878f606.jpg"
  },
  {
    id: 47,
    nombre: "LATTAFA YARA 2PCS 100ML EDP 200ML SPR",
    categoria: "sets",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/0yTPHy4h/2f28ce12df8618169f806549a2112497.jpg"
  },
  {
    id: 51,
    nombre: "ISSEY MIYAKE 2PCS 125ML AND 40ML",
    categoria: "sets",
    precio: 55,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/r27jvm90/6f5ee4e01726a35fbd8bef78889a308b.jpg"
  },
    {
    id: 52,
    nombre: "LATTAFA ATLAS EDP 55ML CABALLERO",
    categoria: "caballero",
    precio: 45,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/d4M3WqKK/c05f9429fa4a739d76c3337b5fd47a28.jpg"
  },
    {
    id: 53,
    nombre: "CIEL JACQUES SAINT PRES EDP 100 ML DAMA",
    categoria: "dama",
    precio: 20,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "disponible",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/NdwtdxzN/b1815ba2d48b5e17b339285500ffc2c5.jpg"
  },
  {
    id: 54,
    nombre: "AFNAN 9PM NIGHT OUT UNISEX 100ML",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/35R63cCq/6c9b32a2767cdcef0ce269de51b46023.jpg"
  },
  {
    id: 55,
    nombre: "ARMAF TAG HIM EDP 100ML",
    categoria: "caballero",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/234zqHhS/8c05e5cd9d8ec0a3b8391cf4bf906ceb.jpg"
  },
  {
    id: 56,
    nombre: "ARMAF VENTANA EDP 100ML",
    categoria: "caballero",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/ZpnrXWXK/9da01ac1923695cc41d43b86a60d3fa8.jpg"
  },
  {
    id: 57,
    nombre: "ARMAF CLUB DE NUIT URBAN EDP 105ML",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/b5mbSFRm/35347d3a90f46c8d6e274bdac1d7ff29.jpg"
  },
  {
    id: 58,
    nombre: "ARMAF ODYSSEY HOMME EDP 100ML",
    categoria: "caballero",
    precio: 40,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/vvCcGMFq/47f96819e60771e37afd2e06a718c80a.jpg"
  },
  {
    id: 59,
    nombre: "ARMAF CLUB DE NUIT URBAN ELIXIR EDP 105ML",
    categoria: "caballero",
    precio: 40,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/R4P1YDLb/e2b52843b162cb5e40ce3d821beaaa6d.jpg"
  },
  {
    id: 60,
    nombre: "ARMAF CLUB DE NUIT ICONIC BLUE EDP 105ML",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/f3fZR3G/65bfd5bd0c7f326e5f79316aa64ba8da.jpg"
  },
  {
    id: 61,
    nombre: "ARMAF ODYSSEY AQUA EDITION EDP 200ML",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/jvJDdSvV/bd474b8d8e38f10a27edd0f21689855d.jpg"
  },
  {
    id: 62,
    nombre: "ARMAF ODYSSEY ARTISTO EDP 100ML",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/gYxgwkq/fd8601a04f3fecc8bbace140c7df12ec.jpg"
  },
  {
    id: 63,
    nombre: "ARMAF BEACH PARTY EDP 100ML",
    categoria: "unisex",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/21wyCB88/b4d6388276e366e2ca8d67320f88b4e6.jpg"
  },
  {
    id: 64,
    nombre: "ARMAF ODYSSEY MANDARIN SKY ELIXIR LIMITED EDITION EDP 100ML",
    categoria: "caballero",
    precio: 55,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Alta",
    imagen: "https://i.ibb.co/Sz4YZcM/1eed70197776c6e17cf8c677a7677013.jpg"
  },
  {
    id: 65,
    nombre: "ARMAF TAG UOMO ROSSO EDP 100ML",
    categoria: "caballero",
    precio: 28,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/KjvrxKgP/f2982f11d9bbbdb00e301b646dd1afbb.jpg"
  },
  {
    id: 66,
    nombre: "ARMAF DELIGHTS BON BON EDP 100ML WOMEN",
    categoria: "dama",
    precio: 32,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/0RSr6TMj/b02f1e43f4ca4ab9c0d2f53bc1359a37.jpg"
  },
  {
    id: 67,
    nombre: "SET ARMAF ODYSSEY MANDARIN SKY LTD 3.4 EDP 10 ML TRAVEL SPR 3.4 SG 6.8 BODY SPR MAN",
    categoria: "unisex",
    precio: 55,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/ymB7f0vx/a4681d222ee1faae94b4767d990e759e.jpg"
  },
  {
    id: 68,
    nombre: "ARMAF DUNESCAPE EDP 100ML",
    categoria: "unisex",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/gbYpzqSD/d142ccc41219b3296560b52f3fa2c00c.jpg"
  },
  {
    id: 69,
    nombre: "ROME LA BOMBA EDP 100ML MEN",
    categoria: "caballero",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/xxkLZFk/fb0fb9732b05accfe45f8c1062443df1.png"
  },
  {
    id: 70,
    nombre: "AMOR AMOR EDT 100ML WOMEN",
    categoria: "dama",
    precio: 20,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/Kzc87TnD/d24c22b4888e3632ce3ffddb3e0ba243.jpg"
  },
  {
    id: 71,
    nombre: "CK ONE EDT 100ML UNISEX",
    categoria: "unisex",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/Gh7Nmt0/f9b216a0448a13ecebd9caa9d65e99d8.jpg"
  },
  {
    id: 72,
    nombre: "CAROLINA CH LA BOMBA EDP 100ML WOMEN",
    categoria: "dama",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/nNmcPPc4/3e46c1cbec9fae67a626c1c9482c9d34.jpg"
  },
  {
    id: 73,
    nombre: "CLINIQUE HAPPY EDP 100ML MEN",
    categoria: "caballero",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/chCVJgqZ/5bad4aeca30e9b38c644dc8abf60fba6.jpg"
  },
  {
    id: 74,
    nombre: "DUMONT NITRO BLACK EDP 100ML CABALLERO",
    categoria: "caballero",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Alta",
    imagen: "https://i.ibb.co/Wpy73XyK/4911f1b958ee9639f6bb94e84451632d.jpg"
  },
  {
    id: 75,
    nombre: "DUMONT NITRO WHITE EDP 100ML CABALLERO",
    categoria: "caballero",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/8nWKWfSD/d66bb68a38c69587f9e67e820eaf37b6.jpg"
  },
  {
    id: 76,
    nombre: "DUMONT NITRO RED INTENSELY EDP 100ML CABALLERO",
    categoria: "caballero",
    precio: 40,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Alta",
    imagen: "https://i.ibb.co/Y4sDzmwX/b8ab6fb0d40cbba265572b46a7ff4890.jpg"
  },
  {
    id: 77,
    nombre: "FRENCH AVENUE VULCAN BAIE EDP 100ML",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/h57KSvC/b7e503660cee7b1a312d5afb61f2495e.jpg"
  },
  {
    id: 78,
    nombre: "FRENCH AVENUE LIQUID BRUN BROWN EDP 100ML",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/PZ8RFfY4/6d7c86a8b99aec1466c3715c69570ec4.jpg"
  },
  {
    id: 79,
    nombre: "FRENCH AVENUE VULCAN FEU EDP 100ML",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/gFXZJtNZ/a9a00bfa87f3fbda4bdcd4b2e8500246.jpg"
  },
  {
    id: 80,
    nombre: "GIVENCHY PI EDT 100ML MEN",
    categoria: "caballero",
    precio: 40,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/5WjPDRpY/ed04b7ce3414e4bfce69a7cc4d9e09bb.jpg"
  },
  {
    id: 81,
    nombre: "GIVENCHY PI TESTER EDT 100ML MEN",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/VcVz1wdC/6ed5fcb1e096423777a72c8e2c484aa0.jpg"
  },
  {
    id: 82,
    nombre: "LATTAFA HAYAATI EDP 100ML",
    categoria: "unisex",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/fYj1drJh/313dc8402ed56564b15d3d3fb56d8987.jpg"
  },
  {
    id: 83,
    nombre: "LATTAFA PRIDE ART OF UNIVERSE EDP 100ML",
    categoria: "unisex",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/Q39M3V2k/afb4263c918865b9b1722752ba0b0899.jpg"
  },
  {
    id: 84,
    nombre: "LATTAFA ANGHAM EDP 100ML",
    categoria: "unisex",
    precio: 28,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/0RFvHLkP/3539b4eddb6c463d92a413557bc29015.jpg"
  },
  {
    id: 85,
    nombre: "LATTAFA MAYAR CHERRY INTENSE EDP 100ML WOMEN",
    categoria: "dama",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/z1YB2bq/63a14f08fd4eaa27b091d8fb77e79c0f.jpg"
  },
  {
    id: 86,
    nombre: "LATTAFA MAYAR NATURAL INTENSE EDP 100ML WOMEN",
    categoria: "dama",
    precio: 30,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/DDK9cxGd/31a569c36d9ddfe01a2f8c11a8279efb.jpg"
  },
  {
    id: 87,
    nombre: "LATTAFA PRIDE ISHQ AL SHUYUKH GOLD EDP 100ML",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/tM3bvQZQ/04a8a1c5dc1c9198123da6aa36944edd.jpg"
  },
  {
    id: 88,
    nombre: "LATTAFA PRIDE ISHQ AL SHUYUKH SILVER EDP 100ML",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/v6GvqXtG/bf50f0b2bb04f9cf3fc18ed4f517a858.jpg"
  },
  {
    id: 89,
    nombre: "NAUTICA VOYAGE EDT 100ML MEN",
    categoria: "caballero",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/k2ZbZH6X/12fbdabef01f706f3539df9c0092f200.jpg"
  },
  {
    id: 90,
    nombre: "NAUTICA VOYAGE SPORT EDT 100ML MEN",
    categoria: "caballero",
    precio: 25,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/r8yhcs6/650d40a9a218c76c4d637522acdfbe65.jpg"
  },
  {
    id: 91,
    nombre: "PARIS HILTON EDP 100ML WOMEN",
    categoria: "dama",
    precio: 20,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/hxhgbgBX/35c7d148131b48f689107ef5a64c3234.jpg"
  },
  {
    id: 92,
    nombre: "360 RED EDP 100ML MEN",
    categoria: "caballero",
    precio: 22,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/5HbP3w9/d25cec57b8d87ce3fae6923c3ee31545.jpg"
  },
  {
    id: 93,
    nombre: "RASASI HAWAS EDP 100ML MEN",
    categoria: "caballero",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media-Alta",
    imagen: "https://i.ibb.co/VYz89HJP/8a11c19c1e6f9bba97595d5183ba2e29.jpg"
  },
  {
    id: 94,
    nombre: "RASASI HAWAS ICE EDP 100ML",
    categoria: "unisex",
    precio: 38,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/KzrNwqB5/7cae35622a8cdc0144d5db1ec75e4484.jpg"
  },
  {
    id: 95,
    nombre: "RASASI HAWAS DIVA EDP 100ML WOMEN",
    categoria: "dama",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/nNdyjt7K/a8c7bfab19999e7c8f724790a4371848.jpg"
  },
  {
    id: 96,
    nombre: "RASASI HAWAS TROPICAL EDP 100ML",
    categoria: "unisex",
    precio: 35,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Baja-Media",
    imagen: "https://i.ibb.co/BV9HTxQw/ae9352948b0184f34339bdf122a28fec.jpg"
  },
  {
    id: 97,
    nombre: "BLUE JEANS EDT 100ML MEN",
    categoria: "caballero",
    precio: 20,
    oldPrice: null,
    precioOferta: null,
    enOferta: false,
    estadoEnvio: "proximamente",
    descripcion: `· Consulta precios al mayor para emprendedores.
· Para pagos en bolívares consultar precio.`,
    intensidad: "Media",
    imagen: "https://i.ibb.co/N2n0VXHQ/e4d743724b10c1708fc6274aa172c106.jpg"
  }
]