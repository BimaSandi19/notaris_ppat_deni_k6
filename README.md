# 🚀 Pengujian Availability Sistem Notaris - k6 Load Testing

Proyek load testing untuk mengukur ketersediaan (availability) sistem Notaris PPAT menggunakan k6 framework v1.4.2.

## 📌 Status Pengujian

| Item                    | Status       |
| ----------------------- | ------------ |
| **K6 Version**          | ✅ v1.4.2    |
| **Script Setup**        | ✅ Ready     |
| **Dry Run Test**        | ✅ PASSED    |
| **Main Test (9 hours)** | ✅ COMPLETED |

---

## ⚡ Quick Start

### Untuk Menjalankan Test

```powershell
cd d:\Applications\websitedn-k6
k6 run scripts/availability-test.js
```

### Untuk Test Durasi Lain

```powershell
k6 run --duration 1h --vus 1 scripts/availability-test.js
```

---

## 📊 Test Configuration

### Konfigurasi Beban

- **Virtual Users (VUs)**: 1 user (Admin Keuangan)
- **Duration**: 9 jam (working hours)
- **Request Interval**: 1 menit per cycle
- **Endpoints**: 4 halaman (login, dashboard, reminder, history)

### Performance Targets

| Metrik            | Target   | Hasil       |
| ----------------- | -------- | ----------- |
| Error Rate        | ≤ 5%     | ✅ 0.00%    |
| Success Rate      | ≥ 95%    | ✅ 99.93%   |
| P95 Response Time | < 1000ms | ✅ 131.27ms |
| Avg Response Time | < 500ms  | ✅ 71.47ms  |
| Checks Passed     | > 95%    | ✅ 99.94%   |

---

## 📁 Struktur Project

```
websitedn-k6/
├── README.md                    ← File ini
├── scripts/
│   └── availability-test.js     ← Script k6 utama
├── results/
│   ├── availability-test-20251128-032010.log
│   ├── RINGKASAN_HASIL_PENGUJIAN.md
└── .env                        ← Environment variables
```

---

## 📈 Hasil Testing (9 Jam)

### Metrik Utama

```
Availability Rate:        99.93%
HTTP Error Rate:          0.00% (0 dari 2.864 requests)
Validation Check Failures: 0.06% (6 dari 8.592 checks)
Average Response Time:    71.47ms
P95 Response Time:        131.27ms
Total Requests:           2.864
Total Checks:             8.592
Total Iterations:         715
```

### Perincian Response Time

- **Minimum**: 10.96ms
- **Maksimum**: 4.89s (1 outlier, 0.03% dari total)
- **Median**: 53.14ms
- **P90**: 95.31ms

### Endpoints Tested

| Endpoint  | Status    |
| --------- | --------- |
| Login     | ✅ Stable |
| Dashboard | ✅ Stable |
| Reminder  | ✅ Stable |
| History   | ✅ Stable |

---

## ✨ Script Features

### Fitur Utama

- ✅ **Custom Metrics**: Counter, Trend, Gauge untuk tracking detail
- ✅ **Error Handling**: Comprehensive error handling & recovery
- ✅ **Enhanced Checks**: Validasi status code, response time, server errors
- ✅ **Setup/Teardown**: Function untuk logging awal & akhir
- ✅ **Performance Thresholds**: Advanced threshold configuration
- ✅ **Timeout Handling**: 30s timeout per request
- ✅ **Environment Variables**: Flexible BASE_URL configuration

### Perbaikan dari Original Script

1. Menambahkan custom metrics tracking
2. Meningkatkan error handling
3. Menambahkan enhanced checks
4. Implementasi setup & teardown functions
5. Precise timing dengan sleep terpisah
6. Comprehensive logging untuk monitoring

---

## 🎯 Dokumentasi Lengkap

### File di Folder `results/`

| File                                  | Deskripsi                                   |
| ------------------------------------- | ------------------------------------------- |
| **RINGKASAN_HASIL_PENGUJIAN.md**      | Executive summary hasil testing             |

---

## 🔧 Konfigurasi Environment

File `.env` untuk custom BASE_URL:

```
BASE_URL=https://yourdomain.com
```

Atau set di terminal:

```powershell
$env:BASE_URL="https://yourdomain.com"
k6 run scripts/availability-test.js
```

---

## ❓ FAQ

**Q: Bagaimana cara verify test masih berjalan?**
A: Di PowerShell: `Get-Process k6`

**Q: Bagaimana lihat hasil sementara?**
A: Tunggu test selesai, output ditampilkan di terminal & disimpan di log file.

**Q: Bisa stop test di tengah jalan?**
A: Ya, tekan `Ctrl + C`. Test akan gracefully stop & show current results.

**Q: Bagaimana menambah endpoint baru?**
A: Edit `scripts/availability-test.js` & tambahkan group baru, ikuti format existing endpoints.

---

## 📚 Resources

- 📖 [k6 Documentation](https://k6.io/docs/)
- 🔗 [k6 Community](https://community.grafana.com/)
- 📈 [Load Testing Guide](https://k6.io/docs/testing-guides/)

---

## 📌 Important Notes

1. **Hasil Test**: Sudah selesai, cek `results/availability-test-*.log`
2. **GitHub Repository**: https://github.com/BimaSandi19/notaris_ppat_deni_k6

---

**Status**: ✅ Production Ready | **Last Updated**: 3 Dec 2025
