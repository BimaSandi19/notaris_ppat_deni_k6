# ⚡ Quick Reference - Pengujian Availability k6

## 🎯 Intisari Pengujian

| Item                    | Keterangan                                   |
| ----------------------- | -------------------------------------------- |
| **Jenis Test**          | Non-Functional - Availability (Ketersediaan) |
| **Tool**                | k6 v1.4.2                                    |
| **VUs**                 | 1 (admin keuangan)                           |
| **Duration**            | 9 jam (08:00-17:00)                          |
| **Interval**            | 1 menit per cycle                            |
| **Halaman Test**        | Login, Dashboard, Reminder, History          |
| **Success Rate Target** | ≥ 95%                                        |
| **Error Rate Target**   | ≤ 5%                                         |
| **Response Time P95**   | < 1000ms                                     |
| **Response Time Avg**   | < 500ms                                      |

---

## 📁 File Structure

```
d:\Applications\websitedn-k6\
├── scripts/
│   └── availability-test.js          ← SCRIPT UTAMA
├── results/                          ← OUTPUT TEST (auto-generated)
├── .env                              ← ENVIRONMENT VARIABLES
├── DOKUMENTASI.md                    ← Penjelasan lengkap
├── PENJELASAN_PERBAIKAN.md          ← Detail perbaikan dari original
├── TEMPLATE_ANALISIS.md             ← Template untuk analisis
├── RINGKASAN_SETUP.txt              ← Ringkasan setup
└── QUICK_REFERENCE.md               ← File ini
```

---

## 🚀 Command Cheat Sheet

### 1. Test Singkat (untuk verifikasi script)

```powershell
k6 run --duration 1m --vus 1 scripts/availability-test.js
```

### 2. Test Actual 9 Jam (sudah dijalankan)

```powershell
k6 run scripts/availability-test.js
```

### 3. Test dengan Custom URL

```powershell
$env:BASE_URL="https://your-domain.com"
k6 run scripts/availability-test.js
```

### 4. Test dengan HTML Report Output

```powershell
k6 run --out web scripts/availability-test.js
```

Akses: http://localhost:5565

### 5. Stop Test yang Sedang Berjalan

```powershell
# Tekan Ctrl + C di terminal
# Test akan gracefully stop dan show hasil
```

---

## 📊 Output Files

Setelah test selesai, hasil akan tersimpan di:

```
d:\Applications\websitedn-k6\results\availability-test-YYYYMMDD-HHMMSS.log
```

Format nama file: `availability-test-20251128-031947.log`

---

## 📈 Interpretasi Hasil

### ✅ PASS - Sistem Tersedia

```
✓ http_req_failed: rate<=0.05              ← Error rate ≤ 5%
✓ http_req_duration: p(95)<1000            ← P95 < 1000ms
✓ http_req_duration: avg<500               ← Average < 500ms
✓ checks: rate>0.95                        ← 95% checks passed
```

### ⚠️ WARNING - Perlu Perhatian

```
⚠️  http_req_duration{url:login}: p(99)<2000  ← P99 login > 2000ms
⚠️  checks: rate>0.95                          ← < 95% checks passed
```

### ❌ FAIL - Sistem Tidak Tersedia

```
✗ http_req_failed: rate<=0.05              ← Error rate > 5%
✗ http_req_duration: p(95)<1000            ← P95 > 1000ms
✗ checks: rate>0.95                        ← < 95% checks passed
```

---

## 📋 Key Metrics Penjelasan

| Metric           | Penjelasan                  | Contoh                          |
| ---------------- | --------------------------- | ------------------------------- |
| **Error Rate**   | % request yang failed       | 2% error = 98% success          |
| **P95 Response** | 95% request < timing ini    | P95=850ms = 95% req < 850ms     |
| **P99 Response** | 99% request < timing ini    | P99=1200ms = 99% req < 1200ms   |
| **Avg Response** | Rata-rata response time     | avg=350ms                       |
| **Checks**       | Jumlah validasi yang passed | 95% of 1000 checks = 950 passed |
| **Iterations**   | Jumlah cycle yang selesai   | 540 iterations = 9 jam ÷ 1 min  |

---

## 🔧 Troubleshooting

### Test Macet/Hang

- **Penyebab**: Koneksi internet lambat, website down, atau request timeout
- **Solusi**:
  - Cek koneksi internet
  - Ping website `ping notarisdeni.web.id`
  - Buka website manual di browser

### Error Rate Tinggi

- **Penyebab**: Website sering error, server overload, atau timeout
- **Solusi**:
  - Cek log server
  - Tingkatkan timeout di script
  - Cek performa server saat test berjalan

### Response Time Lambat

- **Penyebab**: Server slow, database query lambat, atau network latency
- **Solusi**:
  - Cek performa database
  - Optimize query
  - Check network latency ke server

### Test Stop Sebelum 9 Jam

- **Penyebab**: User menekan Ctrl+C atau ada error kritis
- **Solusi**:
  - Jalankan ulang test
  - Periksa error message di console

---

## 💾 Copy Hasil Test ke Laporan

### Step 1: Buka File Log

```
d:\Applications\websitedn-k6\results\availability-test-YYYYMMDD-HHMMSS.log
```

### Step 2: Copy Output

```
Mulai dari: "THRESHOLDS" section
Sampai ke: Akhir output (setelah "EXECUTION")
```

### Step 3: Paste ke Word/PDF

- Paste di bagian "Testing Results" atau "Appendix"
- Format: Gunakan "Courier New" font untuk alignment

### Step 4: Screenshot Summary

- Screenshot bagian "THRESHOLDS" dan "TOTAL RESULTS"
- Gunakan untuk visual di laporan

---

## 📝 Contoh Output untuk Laporan

```
THRESHOLDS:
  ✓ checks
    'rate>0.95' rate=96.50% ← 96.5% checks passed, > target 95%
  ✓ http_req_duration
    'avg<500' avg=345ms ← Avg 345ms, < target 500ms
    'p(95)<1000' p(95)=850ms ← P95 850ms, < target 1000ms
  ✓ http_req_failed
    'rate<=0.05' rate=2.3% ← 2.3% error rate, < target 5%

TOTAL RESULTS:
  checks_total.......: 540
  checks_succeeded...: 96.50% 522 out of 540
  checks_failed......: 3.50% 18 out of 540
  http_req_duration..: avg=345ms  min=48ms  med=295ms  max=2100ms  p(90)=650ms  p(95)=850ms
  http_req_failed....: 2.30% 12 out of 520
  http_reqs..........: 2080  0.064/s
  iterations.........: 540    0.016/s
  vus................: 1
```

---

## 📚 File yang Harus Dibaca

### Untuk Pemula:

1. Baca file ini (QUICK_REFERENCE.md)
2. Baca RINGKASAN_SETUP.txt
3. Jalankan test dan lihat hasil

### Untuk Detail Teknis:

1. DOKUMENTASI.md - Penjelasan lengkap setiap bagian
2. PENJELASAN_PERBAIKAN.md - Detail perbaikan dari script original
3. availability-test.js - Script actual dengan komentar

### Untuk Analisis:

1. TEMPLATE_ANALISIS.md - Template untuk tulis laporan
2. Log file di folder results/ - Raw output test

---

## ✅ Checklist Sebelum Submit Laporan

- [ ] Test sudah dijalankan selama 9 jam
- [ ] File log tersimpan di folder `results/`
- [ ] Copy output test ke laporan
- [ ] Analisis hasil di TEMPLATE_ANALISIS.md
- [ ] Penjelasan perbaikan script ada di laporan (copy dari PENJELASAN_PERBAIKAN.md)
- [ ] Screenshot hasil test ada di laporan
- [ ] Kesimpulan ketersediaan sistem sudah ditulis
- [ ] Rekomendasi sudah ditulis

---

## 📞 Reference Links

- **k6 Documentation**: https://k6.io/docs/
- **k6 HTTP API**: https://k6.io/docs/javascript-api/k6-http/
- **k6 Metrics**: https://k6.io/docs/javascript-api/k6-metrics/
- **k6 Thresholds**: https://k6.io/docs/using-k6/thresholds/

---

## 🎓 Tips untuk Tugas Akhir

1. **Jangan copy-paste hasil mentah**: Analisis dan jelaskan apa maksudnya
2. **Tambahkan grafik/tabel**: Lebih mudah dipahami pembaca
3. **Jelaskan perbaikan script**: Tunjukkan aktu Anda memahami k6 dan testing
4. **Dokumentasikan masalah**: Jika ada error, jelaskan root cause-nya
5. **Buat rekomendasi**: Saran untuk improvement sistem

---

**Updated**: 28 Nov 2025  
**For**: Pengujian Availability - Tugas Akhir/Skripsi  
**Status**: ✅ Test sedang berjalan (9 jam)
