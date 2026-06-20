// Reference data for the public report form.

export const AGE_RANGES = [
  'Balita (0-5)',
  'Anak (6-12)',
  'Remaja (13-17)',
  'Dewasa Muda (18-30)',
  'Dewasa (31-45)',
  'Paruh Baya (46-60)',
  'Lansia (60+)',
  'Tidak Diketahui',
]

export const LIVING_STATUSES = [
  'Tuna Wisma',
  'Rumah Sendiri',
  'Rumah Bersama Keluarga',
  'Rumah Bersama Orang Lain',
  'Panti',
  'Shelter',
  'Lainnya',
  'Tidak Diketahui',
]

export const BEHAVIORS = [
  'Tenang',
  'Gelisah',
  'Agresif',
  'Halusinasi',
  'Mengamuk',
  'Lainnya',
]

export const ECONOMY_LEVELS = [
  'Bawah',
  'Menengah Kebawah',
  'Menengah Keatas',
  'Atas',
]

// Simplified Jawa Barat region tree (mock data).
export const REGIONS: Record<string, Record<string, string[]>> = {
  'Kota Bandung': {
    Coblong: ['Dago', 'Lebakgede', 'Sadang Serang', 'Cipaganti'],
    Cidadap: ['Hegarmanah', 'Ledeng', 'Ciumbuleuit'],
    Sukajadi: ['Sukawarna', 'Pasteur', 'Cipedes'],
  },
  'Kota Bekasi': {
    'Bekasi Selatan': ['Marga Jaya', 'Pekayon Jaya', 'Jaka Mulya'],
    'Bekasi Timur': ['Bekasi Jaya', 'Margahayu', 'Aren Jaya'],
    Rawalumbu: ['Bojong Rawalumbu', 'Sepanjang Jaya', 'Pengasinan'],
  },
  'Kota Bogor': {
    'Bogor Tengah': ['Pabaton', 'Kebon Kelapa', 'Babakan'],
    'Bogor Utara': ['Bantarjati', 'Tegal Gundil', 'Tanah Baru'],
    Tanahsareal: ['Kedung Badak', 'Kebon Pedes', 'Sukaresmi'],
  },
  'Kota Depok': {
    Beji: ['Beji', 'Kemiri Muka', 'Pondok Cina'],
    Pancoranmas: ['Depok', 'Depok Jaya', 'Mampang'],
    Cimanggis: ['Tugu', 'Mekarsari', 'Curug'],
  },
  'Kabupaten Bandung': {
    Soreang: ['Soreang', 'Pamekaran', 'Sadu'],
    Margahayu: ['Sayati', 'Sukamenak', 'Margahayu Tengah'],
    Baleendah: ['Baleendah', 'Andir', 'Manggahang'],
  },
  'Kabupaten Bogor': {
    Cibinong: ['Cibinong', 'Pakansari', 'Sukahati'],
    Gunungputri: ['Bojongkulur', 'Wanaherang', 'Tlajung Udik'],
    Cileungsi: ['Cileungsi', 'Cileungsi Kidul', 'Limusnunggal'],
  },
  'Kabupaten Garut': {
    'Garut Kota': ['Pakuwon', 'Kota Wetan', 'Sukamentri'],
    'Tarogong Kidul': ['Sukagalih', 'Jayaraga', 'Haurpanggung'],
    Banyuresmi: ['Banyuresmi', 'Sukaraja', 'Sukamukti'],
  },
}

export const CITIES = Object.keys(REGIONS)
