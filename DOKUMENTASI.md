# 📋 Dokumentasi Pengujian Availability k6

## 🎯 Tujuan Pengujian

Melakukan pengujian non-fungsional **Availability** (Ketersediaan) untuk sistem notaris.
Memastikan sistem tersedia dan responsif sepanjang jam kerja (08:00-17:00).

---

## 📊 Rancangan Pengujian (Sesuai Bab 3 Laporan)

### Load Configuration

- **Virtual Users (VUs)**: 1 user (admin keuangan)
- **Duration**: 9 jam (jam kerja 08:00-17:00)
- **Request Interval**: 1 menit per cycle

### Test Criteria (Thresholds)

| Kriteria              | Target   | Penjelasan                                    |
| --------------------- | -------- | --------------------------------------------- |
| Error Rate            | ≤ 5%     |   success rate |
| Response Time P95     | < 1000ms | 95% request harus selesai dalam < 1 detik     |
| Response Time P99     | < 2000ms | 99% request harus selesai dalam < 2 detik     |
| Average Response Time | < 500ms  | Rata-rata response time harus < 500ms         |
| Uptime (Checks)       | > 95%    | 95% checks harus passed                       |

---

## ✨ Perbaikan & Penambahan dari Script Awal

### 1. **Menambahkan Custom Metrics**

```javascript
import { Counter, Trend, Gauge } from "k6/metrics";

const errorCounter = new Counter("errors_total");
const successCounter = new Counter("success_total");
const responseTimeByPage = new Trend("response_time_by_page");
const pageAvailability = new Gauge("page_availability");
```

**Penjelasan**: Melacak error/success per halaman dan trend response time yang lebih detail.

### 2. **Menambahkan Helper Function `makeRequest()`**

```javascript
function makeRequest(method, url, name)
```

**Penjelasan**:

- Mengenkapsulasi logic HTTP requests
- Tracking metrics otomatis
- Error handling yang lebih baik
- Timeout 30 detik per request

### 3. **Menambahkan GROUP untuk Setiap Test**

```javascript
group('1️⃣ Login Page Testing', function () { ... })
group('2️⃣ Dashboard Admin Testing', function () { ... })
group('3️⃣ Reminder Tagihan Testing', function () { ... })
group('4️⃣ Riwayat Tagihan Testing', function () { ... })
```

**Penjelasan**:

- Merangkum requests per halaman dalam group
- Output report lebih terstruktur
- Memudahkan analisis per halaman

### 4. **Tambahan Checks untuk Validasi Response**

```javascript
check(res, {
  "✓ Status 200 atau 302": (r) => r.status === 200 || r.status === 302,
  "✓ Response time < 1s": (r) => r.timings.duration < 1000,
  "✓ No server errors": (r) => r.status < 500,
});
```

**Penjelasan**: Validasi tidak hanya status code, tapi juga response time dan server errors.

### 5. **Setup & Teardown Functions**

```javascript
export function setup() { ... }
export function teardown(data) { ... }
```

**Penjelasan**:

- Setup: Menampilkan konfigurasi test di awal
- Teardown: Menampilkan ringkasan di akhir test

### 6. **Timeout Handling**

```javascript
{ redirects: 0, timeout: '30s' }
```

**Penjelasan**: Mencegah request menunggu terlalu lama, default 30 detik.

### 7. **Better Thresholds & Abort Conditions**

```javascript
thresholds: {
  'http_req_failed': ['rate<=0.05'],
  'http_req_duration': ['p(95)<1000'],
  'http_req_duration{url:login}': ['p(99)<2000'],
  'checks': ['rate>0.95'],
  'http_req_duration': ['avg<500'],
},
thresholdAbortOnFail: false,
```

**Penjelasan**:

- Multiple thresholds untuk berbagai metrik
- thresholdAbortOnFail: false → Test tetap lanjut meski threshold terlampaui (untuk durasi panjang 9 jam)

### 8. **Timing Control yang Lebih Presisi**

```javascript
sleep(5); // Delay antar group
sleep(30); // Untuk mencapai total 1 menit interval
```

**Penjelasan**:

- Sleep 5 detik antar request (untuk group)
- Total cycle time ≈ 30s (untuk 4 halaman)
- Sleep 30s lagi → Total 1 menit per cycle

---

## 🚀 Cara Menjalankan Test

### 1. Dry Run (Test 1 menit)

```powershell
cd d:\Applications\websitedn-k6
k6 run --duration 1m --vus 1 scripts/availability-test.js
```

### 2. Real Test (9 jam)

```powershell
k6 run scripts/availability-test.js
```

### 3. Dengan HTML Report

```powershell
k6 run --out web scripts/availability-test.js
```

Akses: http://localhost:5565

### 4. Dengan Custom BASE_URL

```powershell
$env:BASE_URL="https://your-domain.com"
k6 run scripts/availability-test.js
```

---

## 📈 Output & Report

Setelah test selesai, Anda akan melihat:

```
     checks.........................: 95.2% ✓ (1234) ✗ (61)
     data_received....................: 245 kB
     data_sent.........................: 123 kB
     dropped_iterations...............: 0
     errors...........................: 12
     http_req_blocked.................: avg=10ms
     http_req_connecting..............: avg=5ms
     http_req_duration................: avg=456ms p(95)=890ms p(99)=1250ms ✓
     http_req_failed..................: 4.6% ✓
     http_req_receiving...............: avg=100ms
     http_req_sending.................: avg=5ms
     http_req_tls_handshaking.........: avg=8ms
     http_req_waiting.................: avg=340ms
     http_requests....................: 1295
     iteration_duration...............: avg=61.2s
     iterations.......................: 540
     vus..............................: 1
     vus_max..........................: 1
```

### Interpretasi Hasil

- ✓ = PASS (memenuhi threshold)
- ✗ = FAIL (tidak memenuhi threshold)
- **checks**: Persentase checks yang passed
- **http_req_failed**: Persentase request yang failed
- **http_req_duration**: Response time (avg, p95, p99)
- **iterations**: Total cycle yang berhasil dijalankan

---

## 💡 Tips & Troubleshooting

### Jika test macet/hang

- Kurangi durasi menjadi 1h atau 30m untuk test awal
- Cek koneksi internet Anda
- Pastikan website target tidak down

### Jika threshold fail

- Cek performa website Anda saat pengujian
- Lihat bagian mana yang slow (login, dashboard, dll)
- Hubungi admin server untuk investigasi

### Jika ingin menambah halaman baru

Tambahkan group baru di dalam `default function()`:

```javascript
group("5️⃣ Halaman Baru Testing", function () {
  let res = makeRequest("GET", `${BASE_URL}/admin/new-page`, "new-page");
  if (res) {
    check(res, {
      "✓ Status 200 atau 302": (r) => r.status === 200 || r.status === 302,
      "✓ Response time < 1s": (r) => r.timings.duration < 1000,
    });
  }
});
sleep(5);
```

---

## 📚 Dokumentasi Referensi

- k6 Official Docs: https://k6.io/docs/
- k6 HTTP Module: https://k6.io/docs/javascript-api/k6-http/
- k6 Metrics: https://k6.io/docs/javascript-api/k6-metrics/

---

**Created**: November 28, 2025  
**For**: Tugas Akhir / Skripsi - Pengujian Availability Sistem Notaris
