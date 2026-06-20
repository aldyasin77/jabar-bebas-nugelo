# Dokumentasi Bisnis Proses & Alur Fitur: Aplikasi Pelaporan ODGJ

Dokumen ini menjelaskan alur bisnis proses untuk modul pelaporan Orang Dengan Gangguan Jiwa (ODGJ) oleh masyarakat, pelacakan laporan, manajemen penanganan *multi-role* di *back office*, serta panduan *Design System* yang digunakan dalam pengembangan sistem.

---

## 1. Fitur: Pelaporan ODGJ Baru (Public Facing)

### Kondisi (Conditions)
* **Pre-conditions:** Masyarakat umum (pelapor) dapat mengakses halaman form pelaporan tanpa harus *login* (atau sesuai kebijakan sistem).
* **Post-conditions:** Halaman me-*refresh*, muncul *toast notification* sukses, pengguna mendapatkan **Nomor Tiket Laporan**, dan data laporan masuk ke dalam *dashboard* Dinsos Provinsi.

### Alur Proses (Flow)
1. **Membuka Halaman Form:** Sistem menampilkan antarmuka *Stepper* untuk memandu pengguna mengisi data secara bertahap.
2. **Step 1: Data Pelapor**
   Pengguna mengisi informasi identitas diri sebagai penanggung jawab laporan:
   * **NIK Pelapor** (Input Angka, 16 digit)
   * **Nama Pelapor** (Input Teks)
   * **No. Handphone/Whatsapp** (Input Angka)
   * *Aksi:* Pengguna menekan tombol **"Selanjutnya"** (*Primary Button*).
3. **Step 2: Data ODGJ**
   Pengguna mengisi informasi terkait ODGJ yang ditemukan:
   * **Nama Asli ODGJ** (Input Teks - Opsional/Bila ada)
   * **Nama Alias ODGJ** (Input Teks - Opsional/Bila ada)
   * **Jenis Kelamin** (Radio Button: Laki-laki, Perempuan) -> *Sesuai aturan: opsi ≤ 2 wajib menggunakan Radio Button.*
   * **Kisaran Usia** (Input Teks/Dropdown: Range usia)
   * **Tanggal Ditemukan** (Date Picker -> Format wajib: "MMM DD, YYYY")
   * **Lokasi Ditemukan:**
     * **Kabupaten/Kota** (Dropdown)
     * **Kecamatan** (Dropdown)
     * **Kelurahan/Desa** (Dropdown)
     * **Alamat Lengkap** (Textarea)
     * **Koordinat Lokasi** (Integrasi Maps/Input Teks)
   * **Foto ODGJ** (Input File: Kamera langsung atau *Upload* galeri)
   * **Status Tinggal ODGJ** (Dropdown Pilihan: Tuna Wisma, Rumah Sendiri, Rumah Bersama Keluarga, Rumah Bersama Orang Lain, Panti, Shelter, Lainnya, Tidak Diketahui)
   * *Aksi:* Pengguna menekan tombol **"Selanjutnya"** (*Primary Button*) atau **"Kembali"** (*Secondary Button*).
4. **Step 3: Kondisi ODGJ**
   Pengguna merinci kondisi dan perilaku ODGJ untuk penentuan skala prioritas penanganan:
   * **Perilaku** (Checkbox: Tenang, Gelisah, Agresif, Halusinasi, Mengamuk, Lainnya)
   * **Membahayakan diri sendiri?** (Radio Button/Switch: Ya, Tidak)
   * **Membahayakan orang lain?** (Radio Button/Switch: Ya, Tidak)
   * **Perlu penanganan darurat?** (Radio Button/Switch: Ya, Tidak)
   * **Kondisi Ekonomi** (Dropdown Pilihan: Bawah, Menengah Kebawah, Menengah Keatas, Atas)
   * *Aksi:* Pengguna menekan tombol **"Selanjutnya"**.
5. **Step 4: Ringkasan (Summary Data)**
   * Sistem menampilkan seluruh ringkasan data yang telah diisi pada *Step 1*, *Step 2*, dan *Step 3* secara *Read-Only*.
   * Pengguna memverifikasi kebenaran data.
   * *Aksi:* Pengguna menekan tombol **"Kirim Laporan"** (*Primary Button*).
6. **Konfirmasi & Penyimpanan:** Sistem menampilkan **"Modal Konfirmasi Penyimpanan"**. Jika disetujui, data disimpan ke *database* dan sistem menampilkan **Nomor Tiket Laporan** yang dapat disalin pengguna untuk melacak status.

---

## 2. Fitur: Cek Riwayat Laporan (Public Facing)

### Kondisi (Conditions)
* **Pre-conditions:** Masyarakat memiliki Nomor Tiket Laporan yang didapat setelah berhasil membuat laporan, atau menggunakan NIK pelapor.
* **Post-conditions:** Menampilkan rincian laporan dan status terkini (*tracing*).

### Alur Proses (Flow)
1. **Membuka Halaman Lacak Laporan:** Pengguna menavigasi ke menu "Cek Laporan".
2. **Form Pencarian:** * Sistem menampilkan input pencarian berupa **Nomor Tiket Laporan** atau **NIK Pelapor**.
   * *Aksi:* Pengguna menekan tombol **"Cari Laporan"** (*Primary Button*).
3. **Menampilkan Hasil Pencarian:** * Jika data ditemukan, sistem menampilkan ringkasan laporan (Waktu lapor, Lokasi, Tingkat Darurat).
   * **Status Laporan** ditampilkan secara visual menggunakan komponen *Timeline* yang merepresentasikan pergerakan laporan (Laporan Diterima -> Diteruskan ke Kab/Kota -> Penjemputan -> Perawatan RSJ -> Diserahkan ke Keluarga).
4. **Tindakan Lanjutan:** Pengguna dapat menekan tombol **"Lihat Detail"** (*Secondary Button*) untuk melihat rincian laporan yang mereka kirimkan sebelumnya.

---

## 3. Fitur: Dashboard Back Office - Dinsos Provinsi (Role: Dispatcher)

### Kondisi (Conditions)
* **Pre-conditions:** Pengguna telah *login* dengan role **Admin Dinsos Provinsi**.
* **Post-conditions:** Laporan baru divalidasi dan diteruskan ke Dinsos Kabupaten/Kota terkait.

### Alur Proses (Flow)
1. **Membuka Dashboard Utama:** Sistem menampilkan metrik (Total Laporan Masuk, Menunggu Diteruskan, dll) dan tabel Laporan Baru.
2. **Melihat Detail Laporan:** Petugas membuka laporan masyarakat yang baru masuk.
3. **Meneruskan Laporan (Disposisi):** Petugas menekan tombol **"Teruskan Laporan"**.
4. **Form Disposisi:** Sistem menampilkan modal berisi *Dropdown* **"Pilih Dinsos Kab/Kota Tujuan"** dan *Textarea* **"Catatan"**.
5. **Menyimpan Perubahan:** Petugas menekan tombol **"Kirim Tugas"** (*Primary Button*). Status laporan berubah, dan notifikasi dikirimkan ke *dashboard* Dinsos Kab/Kota yang dipilih.

---

## 4. Fitur: Dashboard Back Office - Dinsos Kab/Kota (Role: Eksekutor Lapangan)

### Kondisi (Conditions)
* **Pre-conditions:** Pengguna telah *login* dengan role **Admin/Petugas Dinsos Kab/Kota**.
* **Post-conditions:** Tim lapangan melakukan penjemputan, penyerahan ke RSJ, hingga evakuasi akhir.

### Alur Proses (Flow)
1. **Tugas Baru Masuk:** Petugas melihat daftar tugas pelaporan yang diteruskan oleh Dinsos Provinsi di *dashboard*.
2. **Proses Penjemputan:** Petugas menugaskan tim dan memperbarui status menjadi **"Dalam Penjemputan"**.
3. **Penyerahan ke RSJ:** Setelah ODGJ dijemput, tim membawanya ke RSJ Cisarua. Petugas memperbarui status di sistem menjadi **"Proses Perawatan RSJ"**. Data pasien otomatis masuk ke *dashboard* RSJ.
4. **Menunggu Surat Rekomendasi:** Laporan tertahan (*pending*) hingga ada pembaruan dari pihak RSJ Cisarua.
5. **Evakuasi Akhir:** * Setelah RSJ merilis Surat Rekomendasi (kondisi ODGJ sudah tenang), Dinsos Kab/Kota menerima notifikasi dan mengunduh surat tersebut.
   * Petugas menjemput ODGJ dari RSJ dan menyerahkannya ke Keluarga atau Panti.
   * Petugas mengklik tombol **"Selesaikan Kasus"** dan memilih opsi penyelesaian (Keluarga/Panti). Status laporan berubah menjadi **"Selesai"**.

---

## 5. Fitur: Dashboard Back Office - RSJ Cisarua (Role: Fasilitas Medis)

### Kondisi (Conditions)
* **Pre-conditions:** Pengguna telah *login* dengan role **Petugas Medis RSJ Cisarua**.
* **Post-conditions:** Pasien dievaluasi selama 14 hari, surat rekomendasi diterbitkan ke Dinsos Kab/Kota.

### Alur Proses (Flow)
1. **Menerima Pasien:** RSJ melihat daftar pasien baru yang dikirim oleh Dinsos Kab/Kota.
2. **Timer Perawatan:** Sistem menampilkan progres waktu perawatan 14 hari untuk masing-masing pasien di *dashboard*.
3. **Evaluasi Berkala:** Petugas medis memperbarui log kondisi harian.
4. **Evaluasi Akhir (Setelah 14 Hari):**
   * Petugas menekan tombol **"Evaluasi Kondisi"**.
   * Sistem menampilkan pertanyaan kondisional: **"Apakah kondisi sudah tenang?"** (Radio: Ya/Belum).
   * **Jika Belum:** Siklus perawatan dilanjutkan/diulang.
   * **Jika Ya:** Sistem memunculkan form untuk mengunggah **"Surat Rekomendasi Penanganan"** (PDF/JPG).
5. **Penerbitan Rekomendasi:** Petugas menekan tombol **"Kirim Rekomendasi"**. Surat terkirim ke Dinsos Kab/Kota dan status pasien di *dashboard* RSJ berubah menjadi **"Siap Dijemput"**.

--------------

# Design System Guidelines

Dokumen ini berisi panduan resmi sistem desain (Design System) yang wajib diikuti dalam pengembangan proyek. Panduan ini mencakup aturan dasar, token warna berbasis Material Design 3, tipografi Plus Jakarta Sans, serta spesifikasi komponen interaktif.

---

## 1. Aturan Umum Desain (General Rules)

* **Base Font Size:** Gunakan ukuran dasar (`font-size`) sebesar `14px` untuk konten teks standar (Body/Medium).
* **Format Tanggal:** Semua format tanggal di dalam aplikasi wajib menggunakan format `"MMM DD, YYYY"` (Contoh: `"Jun 10, 2026"`).
* **Bottom Toolbar:** Toolbar bagian bawah (jika digunakan) maksimal hanya boleh memiliki **4 item**.
* **Floating Action Button (FAB):** Jangan pernah menggunakan *Floating Action Button* secara bersamaan pada halaman yang memiliki *Bottom Toolbar*.
* **Chips:** Penggunaan komponen *Chips* harus selalu muncul dalam kelompok minimal **3 item** atau lebih. *(Contoh: Filter status di Dashboard Petugas: Semua, Menunggu, Ditangani, Selesai)*.
* **Dropdown:** Jangan menggunakan *Dropdown* jika opsi pilihan yang tersedia berjumlah **2 atau kurang**. Gunakan komponen *Radio Button* atau *Switch* sebagai gantinya. *(Contoh: Input "Membahayakan diri sendiri?" atau "Apakah kondisi sudah tenang?" yang hanya berisi Ya/Tidak/Belum wajib menggunakan Radio/Switch).*

> **Pengecualian:** Pemilihan entitas institusi (seperti daftar Kabupaten/Kota) wajib menggunakan **Dropdown**.

---

## 2. Palet Warna (Color System)
Sistem warna mengadopsi struktur token **Material Design 3** yang mendukung mode Terang (*Light*) dan Mode Gelap (*Dark*).

### Canvas & Primary
* **Canvas**
  * Light: `#FFFFFF` | Dark: `#121212`
* **Primary** (Warna utama untuk brand, elemen penting, dan status "Sedang Ditangani")
  * Light: `#1565C0` | Dark: `#90CAF9`
* **On-Primary** (Teks/ikon di atas warna Primary)
  * Light: `#FFFFFF` | Dark: `#0D47A1`
* **Primary-Container**
  * Light: `#D1E4FF` | Dark: `#1565C0`
* **On-Primary-Container**
  * Light: `#001B3D` | Dark: `#D1E4FF`

### Secondary & Tertiary
* **Secondary** (Warna pendukung untuk elemen sekunder)
  * Light: `#616161` | Dark: `#BDBDBD`
* **On-Secondary**
  * Light: `#FFFFFF` | Dark: `#212121`
* **Secondary-Container**
  * Light: `#E0E0E0` | Dark: `#424242`
* **On-Secondary-Container**
  * Light: `#1A1A1A` | Dark: `#E0E0E0`
* **Tertiary** (Warna aksen khusus, digunakan untuk status "Selesai/Sukses")
  * Light: `#00695C` | Dark: `#80CBC4`
  * On-Tertiary -> Light: `#FFFFFF` | Dark: `#00332D`
  * Tertiary-Container -> Light: `#B2DFDB` | Dark: `#00695C`
  * On-Tertiary-Container -> Light: `#00201C` | Dark: `#B2DFDB`

### Error, Warning & Outline
* **Error** (Warna untuk status eror, laporan darurat, atau laporan ditolak)
  * Light: `#C62828` | Dark: `#EF9A9A`
  * On-Error -> Light: `#FFFFFF` | Dark: `#5F0000`
* **Warning** (Warna peringatan, evaluasi tertunda, atau kondisi belum tenang)
  * Light: `#FBC02D` | Dark: `#FFF59D`
  * On-Warning -> Light: `#3E2723` | Dark: `#3E2723`
* **Outline** (Warna border dan pembatas)
  * Light: `#BDBDBD` | Dark: `#424242`
  * Outline-Variant -> Light: `#E0E0E0` | Dark: `#303030`

### Surface (Permukaan & Latar Belakang Komponen)
* **Surface:** Light `#FAFAFA` | Dark `#121212`
* **On-Surface:** Light `#212121` | Dark `#E0E0E0`
* **Surface-Variant:** Light `#E0E0E0` | Dark `#424242` (Digunakan untuk status "Menunggu")
* **Surface-Bright:** Light `#FFFFFF` | Dark `#1A1A1A`
* **Surface-Dim:** Light `#F5F5F5` | Dark `#0C0C0C`
* **Surface-Container:** Light `#F0F0F0` | Dark `#161616`
* **Surface-Container-Low:** Light `#F5F5F5` | Dark `#141414`
* **Surface-Container-High:** Light `#EBEBEB` | Dark `#1C1C1C`
* **Surface-Container-Highest:** Light `#E0E0E0` | Dark `#222222`

---

## 3. Tipografi (Typography)
Font keluarga yang digunakan adalah **Plus Jakarta Sans** dengan pembagian skala sebagai berikut:

| Token | Font Style / Weight | Size | Line Height |
| :--- | :--- | :--- | :--- |
| **Display/Large** | Regular | 34px | 150.00% |
| **Display/Medium** | Regular | 32px | 150.00% |
| **Display/Small** | Regular | 30px | 150.00% |
| **Headline/Large** | Medium | 28px | 150.00% |
| **Headline/Medium** | Medium | 24px | 150.00% |
| **Headline/Small** | Medium | 20px | 150.00% |
| **Title/Large** | SemiBold | 18px | 150.00% |
| **Title/Medium** | SemiBold | 16px | 150.00% |
| **Title/Small** | SemiBold | 14px | 150.00% |
| **Body/Large** | Regular | 16px | 150.00% |
| **Body/Medium** | Regular | 14px | 125.00% |
| **Body/Small** | Regular | 12px | 125.00% |
| **Body/XSmall** | Regular | 10px | 125.00% |
| **Label/Large** | Medium | 14px | 150.00% |
| **Label/Medium** | Medium | 12px | 150.00% |
| **Label/Small** | Medium | 10px | 150.00% |

---

## 4. Komponen (Components)

### Button
Komponen Button adalah elemen interaktif fundamental dalam sistem desain kami, yang dirancang untuk memicu tindakan atau menavigasi pengguna melalui aplikasi.

#### Penggunaan (Usage)
Tombol harus digunakan untuk tindakan penting yang perlu diambil pengguna, seperti pengiriman formulir, mencari laporan, atau menyimpan pembaruan status di seluruh *dashboard* *multi-role*. Tombol harus mengomunikasikan interaktivitas dan memiliki label yang jelas.

#### Varian (Variants)
* **Primary Button**
  * **Purpose:** Digunakan untuk tindakan utama dalam suatu bagian atau halaman (Contoh: "Selanjutnya", "Kirim Laporan", "Teruskan Laporan", "Kirim Rekomendasi").
  * **Visual Style:** Tebal (*Bold*), diisi penuh dengan warna brand utama (*filled with primary brand color*).
  * **Usage:** Maksimal satu tombol primer per bagian untuk mengarahkan pengguna ke tindakan paling penting.
* **Secondary Button**
  * **Purpose:** Digunakan untuk tindakan alternatif atau pendukung (Contoh: "Kembali", "Lihat Detail", "Unduh Surat").
  * **Visual Style:** Memiliki garis tepi (*Outlined*) dengan warna utama, serta latar belakang transparan.
  * **Usage:** Dapat disandingkan di sebelah tombol primer untuk tindakan yang kurang mendesak.
* **Tertiary Button**
  * **Purpose:** Digunakan untuk tindakan yang paling tidak mendesak atau bersifat opsional (Contoh: "Batal").
  * **Visual Style:** Hanya berupa teks (*Text-only*) tanpa border, menggunakan warna utama.
  * **Usage:** Untuk tindakan yang harus tetap tersedia tetapi tidak ditekankan.