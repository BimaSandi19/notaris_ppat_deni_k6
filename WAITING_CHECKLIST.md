# ✅ CHECKLIST SAMBIL MENUNGGU TEST SELESAI

**Test sedang berjalan**: 28 Nov 2025, 03:20 sampai 12:20 (9 jam)  
**Status saat ini**: ✅ Running smoothly di background

---

## ❌ HAL YANG TIDAK BOLEH DILAKUKAN

### 1. **JANGAN Shutdown/Restart Komputer**

- ❌ Jangan matikan komputer
- ❌ Jangan restart Windows
- ❌ Jangan sleep/hibernation
- ⚠️ Alasan: Test akan stop dan data hangus

✅ **Yang boleh**: Biarkan komputer menyala (bisa idle/lock)

---

### 2. **JANGAN Tutup PowerShell Terminal**

- ❌ Jangan close/kill terminal sekarang
- ❌ Jangan close VS Code sekaligus (jika membuka dari situ)
- ❌ Jangan kill process k6 manual
- ⚠️ Alasan: Test akan langsung stop

✅ **Yang boleh**: Minimize terminal, pergi jauh-jauh, tapi jangan tutup

---

### 3. **JANGAN Edit File Script**

- ❌ Jangan edit `scripts/availability-test.js` sekarang
- ❌ Jangan edit `.env` file
- ❌ Jangan ubah BASE_URL
- ⚠️ Alasan: Tidak akan berpengaruh ke test yang sedang jalan, tapi bisa bikin bingung nanti

✅ **Yang boleh**: Edit file after test selesai jika perlu

---

### 4. **JANGAN Ganti Network Connection**

- ❌ Jangan disconnect dari internet
- ❌ Jangan ganti WiFi/network
- ❌ Jangan batasi bandwidth
- ⚠️ Alasan: Test perlu internet untuk akses website

✅ **Yang boleh**: Biarkan koneksi stabil

---

### 5. **JANGAN Jalankan Test Lain**

- ❌ Jangan jalankan `k6 run` command lagi
- ❌ Jangan buka aplikasi berat yang consume resource
- ❌ Jangan stress test komputer yang sama
- ⚠️ Alasan: Bisa menganggu test yang sedang berjalan

✅ **Yang boleh**: Pekerjaan ringan di aplikasi lain

---

### 6. **JANGAN Khawatir Kalau Terminal Tidak Terlihat**

- ❌ Jangan panik kalau terminal minimize/backgrounded
- ❌ Jangan percaya orang yang bilang "test sudah stop"
- ❌ Jangan re-run test karena takut gagal
- ⚠️ Alasan: Test tetap berjalan di background

✅ **Yang boleh**: Check terminal status dengan command di bawah

---

## ✅ HAL YANG BOLEH DILAKUKAN

### 1. **BOLEH Minimize/Hide Terminal**

✅ Minimize terminal ke taskbar  
✅ Minimize VS Code  
✅ Pergi kerja, sekolah, main, tidur  
✅ Gunakan komputer untuk hal lain

**Catatan**: Terminal tetap berjalan di background

---

### 2. **BOLEH Buka Dokumentasi**

✅ Baca semua file dokumentasi  
✅ Persiapkan template laporan  
✅ Review penjelasan perbaikan script  
✅ Pahami metrik yang akan dihasilkan

**File yang bisa dibaca**:

- README.md
- QUICK_REFERENCE.md
- DOKUMENTASI.md
- PENJELASAN_PERBAIKAN.md

---

### 3. **BOLEH Mulai Persiapkan Laporan**

✅ Buka TEMPLATE_ANALISIS.md dan siapkan  
✅ Buat struktur bab Testing Results  
✅ Persiapkan template tabel  
✅ Buat draft penjelasan

**Catatan**: Data hasil akan di-fill setelah test selesai

---

### 4. **BOLEH Check Status Test (Sesekali)**

✅ Cek process k6 dengan command (lihat di bawah)  
✅ Buka terminal sebentar untuk lihat progress  
✅ Confirm test masih berjalan

**Command untuk cek status**:

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*k6*"}
```

Output: Jika ada proses `k6`, berarti test masih berjalan ✅

---

### 5. **BOLEH Gunakan Komputer Normalmente**

✅ Browsing internet  
✅ Kerja/sekolah  
✅ Main game ringan  
✅ Buat dokumen lain  
✅ Dengarkan musik

**Catatan**: Jangan force-shutdown atau restart

---

### 6. **BOLEH Persiapkan Folder Results**

✅ Buka folder `d:\Applications\websitedn-k6\results\`  
✅ Persiapkan tempat untuk file hasil  
✅ Pastikan folder bisa diakses setelah test

**File yang akan muncul**:

```
results/
└── availability-test-20251128-031947.log  (created automatically)
```

---

### 7. **BOLEH Tidur/Istirahat**

✅ Test berjalan 9 jam, jadi aman tidur  
✅ Test akan complete sebelum Anda bangun (kalau tidur normal)  
✅ Biarkan komputer berjalan, jangan shutdown

**Estimasi finish**: 28 Nov 2025, ~12:20 siang  
**Jadi kalau sudah jalan pukul 03:20 pagi, selesai saat lunch time** ☀️

---

## 🔍 CARA CEK APAKAH TEST MASIH BERJALAN

### Cara 1: Buka Terminal Sebentar

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*k6*"}
```

**Hasil**:

- ✅ Jika ada output (process info) → Test masih berjalan
- ❌ Jika tidak ada output → Test sudah selesai

---

### Cara 2: Lihat Output di Terminal

Kalau buka terminal, seharusnya melihat:

```
running (0h05m08.0s), 1/1 VUs, 6 complete and 0 interrupted iterations
default   [   1% ] 1 VUs  0h05m08.0s/9h0m0s
```

**Artinya**: Test jalan ~5 menit, masih ~8h55m tersisa

---

### Cara 3: Cek File Results Folder

```powershell
Get-ChildItem d:\Applications\websitedn-k6\results\
```

**Hasil**:

- ✅ Ada file `.log` → Test selesai (atau sedang write output)
- ❌ Folder kosong → Test masih berjalan

---

## ⏱️ TIMELINE & EXPECTATIONS

| Waktu             | Status     | Apa yang Terjadi                            |
| ----------------- | ---------- | ------------------------------------------- |
| **03:20**         | ✅ START   | Test mulai berjalan                         |
| **03:20 - 12:20** | 🔄 RUNNING | Test berjalan 9 jam, request setiap 1 menit |
| **~06:20**        | 📊 30%     | ~3 jam berjalan                             |
| **~09:20**        | 📊 66%     | ~6 jam berjalan                             |
| **~12:20**        | ✅ FINISH  | Test selesai, output summary ditampilkan    |
| **~12:21**        | 💾 SAVED   | Hasil auto-saved ke file `.log`             |

---

## 📝 CHECKLIST SAMBIL MENUNGGU

### Baca Dokumentasi (30 menit)

- [ ] Baca EXECUTIVE_SUMMARY.md
- [ ] Baca README.md
- [ ] Baca QUICK_REFERENCE.md

### Persiapkan Laporan (1-2 jam)

- [ ] Buka TEMPLATE_ANALISIS.md
- [ ] Buat structure bab Testing Results
- [ ] Persiapkan template tabel metrik
- [ ] Tulis draft penjelasan rancangan test

### Persiapkan Folder (5 menit)

- [ ] Cek folder `results/` bisa diakses
- [ ] Persiapkan tempat untuk output file

### Baca Detail Teknis (1 jam - optional)

- [ ] Baca DOKUMENTASI.md untuk penjelasan lengkap
- [ ] Baca PENJELASAN_PERBAIKAN.md untuk detail improvements
- [ ] Review script `availability-test.js` kalau perlu

### Istirahat/Kerja

- [ ] ✅ Bebas lakukan hal lain
- [ ] ✅ Biarkan test berjalan di background

---

## 🎯 SETELAH TEST SELESAI (EST. 12:20)

### Step 1: Cek Output (2 menit)

```powershell
Get-ChildItem d:\Applications\websitedn-k6\results\
```

Seharusnya ada file: `availability-test-YYYYMMDD-HHMMSS.log`

---

### Step 2: Buka File Log (2 menit)

Cari dari akhir file ke atas, catat nilai-nilai:

- Error rate (%)
- Success rate (%)
- P95 response time (ms)
- Average response time (ms)
- Checks passed (%)

---

### Step 3: Isi Template (15 menit)

Buka `TEMPLATE_ANALISIS.md` dan isi tabel dengan data dari log file

---

### Step 4: Analisis (30 menit)

Baca `PENJELASAN_PERBAIKAN.md` dan tulis:

- Penjelasan hasil test
- Analisis performa per halaman
- Identifikasi masalah (jika ada)
- Rekomendasi improvement

---

### Step 5: Masukkan ke Laporan (1-2 jam)

- Copy tabel ke bab Testing Results
- Copy penjelasan rancangan dari DOKUMENTASI.md
- Screenshot output test
- Lampirkan full log file

---

## ⚠️ EMERGENCY PROCEDURES

### Jika Terjadi Masalah Sebelum Test Selesai

#### Kalau Komputer Mati Tiba-Tiba

- ❌ Test akan stop, data hilang
- ✅ Harus re-run dari awal

#### Kalau Internet Disconnect

- ⚠️ Test akan error beberapa menit
- ✅ Kemungkinan besar continue setelah reconnect
- 📊 Error rate akan naik, tapi test terus berjalan

#### Kalau Accidentally Close Terminal

- ❌ Test akan stop
- ✅ Output sudah tersimpan partial ke log file
- 📝 Silakan re-run test

#### Kalau Ada Error di Terminal

- ⚠️ Bukan masalah serius kalau hanya beberapa error
- ✅ Test akan tetap continue
- 📊 Error rate akan tercatat

---

## 🆘 TROUBLESHOOTING

### "Saya khawatir test sudah stop"

**Jangan khawatir!** Jalankan:

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*k6*"}
```

Jika ada output, test masih berjalan.

---

### "Terminal minimize, apakah test masih jalan?"

**Ya!** Terminal minimize tidak mengstop test.  
Test tetap berjalan di background.  
Anda bisa lihat nanti di terminal kalau minimize kembali.

---

### "Saya perlu shutdown komputer, apa yang harus dilakukan?"

**JANGAN SHUTDOWN!**

- Test akan langsung stop
- Data akan hilang
- Harus re-run dari awal

Jika sangat perlu:

1. Tekan Ctrl + C di terminal untuk stop test gracefully
2. Shutdown
3. Re-run test nanti

---

### "Berapa lama test selesai?"

**9 jam** dari start time (03:20) hingga selesai (12:20).  
Tidak ada cara untuk speed-up.

---

## 📞 REFERENCE

Jika ada pertanyaan:

- Baca QUICK_REFERENCE.md (Troubleshooting section)
- Baca DOKUMENTASI.md (untuk detail teknis)
- Jalankan command cek status (lihat di atas)

---

## ✅ FINAL CHECKLIST

Sebelum Anda pergi:

- [ ] ✅ Pastikan terminal tetap buka (minimize OK)
- [ ] ✅ Pastikan internet stabil
- [ ] ✅ Pastikan komputer tidak akan shutdown
- [ ] ✅ Sudah baca DO's dan DON'Ts ini
- [ ] ✅ Siap untuk menunggu 9 jam

**Semuanya done?** Anda siap go! 🚀

---

**Test Status**: ✅ Running smoothly  
**Estimated Finish**: 28 Nov 2025, 12:20  
**Next Action**: Wait & Prepare Laporan

Good luck! ☀️
