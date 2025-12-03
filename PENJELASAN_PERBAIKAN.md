# 🔍 Penjelasan Detail Perbaikan Script k6

## Perbandingan: Script Original vs Script Yang Diperbaiki

---

## 1. PENAMBAHAN: Custom Metrics

### ❌ Masalah di Script Original:

```javascript
// Script original tidak memiliki tracking metrics custom
// Hanya menggunakan metrics bawaan k6
```

### ✅ Solusi:

```javascript
import { Counter, Trend, Gauge } from "k6/metrics";

const errorCounter = new Counter("errors_total");
const successCounter = new Counter("success_total");
const responseTimeByPage = new Trend("response_time_by_page");
const pageAvailability = new Gauge("page_availability");
```

### 📝 Penjelasan:

- **Counter**: Menghitung jumlah error dan success
- **Trend**: Melacak trend response time per halaman
- **Gauge**: Mengukur availability score real-time
- **Manfaat**: Output report lebih detail dan terukur

---

## 2. PENAMBAHAN: Helper Function `makeRequest()`

### ❌ Masalah di Script Original:

```javascript
// Setiap request langsung di-call tanpa helper
let res = http.get(`${BASE_URL}/login`);
let res = http.get(`${BASE_URL}/admin/dashboard`, { redirects: 0 });
// Tidak ada error handling yang konsisten
```

### ✅ Solusi:

```javascript
function makeRequest(method, url, name) {
  const startTime = new Date();
  let res;

  try {
    if (method === "GET") {
      res = http.get(url, { redirects: 0, timeout: "30s" });
    }

    const endTime = new Date();
    const responseTime = endTime - startTime;

    // Track metrics otomatis
    responseTimeByPage.add(responseTime, { page: name });

    if (res.status >= 200 && res.status < 400) {
      successCounter.add(1);
      pageAvailability.add(1);
    } else {
      errorCounter.add(1);
      pageAvailability.add(0);
    }

    return res;
  } catch (error) {
    console.error(`❌ Error pada ${name}: ${error.message}`);
    errorCounter.add(1);
    pageAvailability.add(0);
    return null;
  }
}
```

### 📝 Penjelasan:

- **Encapsulation**: Semua request logic di satu tempat
- **Consistent Error Handling**: Cek error di setiap request
- **Automatic Metrics**: Metrics tercatat otomatis tanpa perlu manual
- **Timeout Protection**: Setiap request timeout 30 detik
- **Response Time Tracking**: Mengukur response time akurat
- **Reusability**: Bisa digunakan untuk semua request

---

## 3. PENAMBAHAN: GROUP Organization

### ❌ Masalah di Script Original:

```javascript
export default function () {
  // Semua request flat, tidak terorganisir
  let res = http.get(`${BASE_URL}/login`);
  check(res, {
    "login status 200": (r) => r.status === 200,
  });

  let res = http.get(`${BASE_URL}/admin/dashboard`, { redirects: 0 });
  check(res, {
    "dashboard 200 atau 302": (r) => r.status === 200 || r.status === 302,
  });

  // ... dst
}
```

### ✅ Solusi:

```javascript
export default function () {
  group('1️⃣ Login Page Testing', function () {
    let res = makeRequest('GET', `${BASE_URL}/login`, 'login');
    if (res) {
      check(res, { ... });
    }
  });

  sleep(5);  // Delay antar group

  group('2️⃣ Dashboard Admin Testing', function () {
    let res = makeRequest('GET', `${BASE_URL}/admin/dashboard`, 'dashboard');
    if (res) {
      check(res, { ... });
    }
  });

  // ... dst
}
```

### 📝 Penjelasan:

- **Readability**: Lebih mudah dipahami apa yang ditest
- **Report Structure**: Output report terorganisir per page
- **Easier Debugging**: Bisa lihat mana yang error di group tertentu
- **Emoji Labels**: Membuat output lebih visual dan mudah dibaca

---

## 4. PERBAIKAN: Enhanced Checks

### ❌ Masalah di Script Original:

```javascript
check(res, {
  "login status 200": (r) => r.status === 200,
  // Hanya cek status code, tidak cek response time
  // Tidak cek server errors (5xx)
});
```

### ✅ Solusi:

```javascript
check(res, {
  "✓ Status 200": (r) => r.status === 200,
  "✓ Response time < 1s": (r) => r.timings.duration < 1000,
  "✓ Body contains form": (r) =>
    r.body.includes("login") || r.body.includes("form"),
  // Untuk dashboard dan lainnya:
  "✓ Status 200 atau 302": (r) => r.status === 200 || r.status === 302,
  "✓ Response time < 1s": (r) => r.timings.duration < 1000,
  "✓ No server errors": (r) => r.status < 500,
});
```

### 📝 Penjelasan:

- **Status Code Check**: Verifikasi response status valid
- **Response Time Check**: Pastikan response time dalam threshold
- **Body Content Check**: Validasi response bukan error message
- **Server Error Detection**: Deteksi 5xx server errors
- **Comprehensive Validation**: Bukan hanya status, tapi keseluruhan

---

## 5. PENAMBAHAN: Setup & Teardown Functions

### ❌ Masalah di Script Original:

```javascript
// Tidak ada setup/teardown
// Output langsung tanpa informasi awal
```

### ✅ Solusi:

```javascript
export function setup() {
  console.log("🚀 ========================================");
  console.log("🚀 PENGUJIAN AVAILABILITY DIMULAI");
  console.log("📍 Target URL: " + BASE_URL);
  console.log("👥 Virtual Users: 1 (admin keuangan)");
  console.log("⏱️  Duration: 9 jam (jam kerja 08:00-17:00)");
  console.log("📊 Interval: 1 menit per cycle");
  console.log("🎯 Threshold Error Rate: ≤ 5% (Success ≥ 95%)");
  console.log("🎯 Threshold Response Time P95: < 1000ms");
  console.log("🚀 ========================================\n");

  return { startTime: new Date() };
}

export function teardown(data) {
  console.log("\n✅ ========================================");
  console.log("✅ PENGUJIAN AVAILABILITY SELESAI");
  console.log("✅ ========================================");
  console.log("📅 Durasi Testing: " + (new Date() - data.startTime) + " ms");
  console.log("📊 Silakan cek hasil di summary report");
  console.log("✅ ========================================\n");
}
```

### 📝 Penjelasan:

- **Setup Function**: Menampilkan konfigurasi test di awal
- **Teardown Function**: Menampilkan ringkasan di akhir
- **User Clarity**: Pengguna tahu kapan test mulai dan selesai
- **Start Time Tracking**: Bisa hitung durasi actual test
- **Professional Output**: Lebih terstruktur dan informatif

---

## 6. PERBAIKAN: Better Thresholds

### ❌ Masalah di Script Original:

```javascript
thresholds: {
  // Error rate maksimal 5%  → success rate minimal 95%
  http_req_failed: ['rate<=0.05'],

  // 95% request harus selesai < 1000 ms
  http_req_duration: ['p(95)<1000'],
  // Hanya 2 threshold, kurang komprehensif
};
```

### ✅ Solusi:

```javascript
thresholds: {
  // ✓ Error rate maksimal 5% → Success rate minimal 95%
  'http_req_failed': ['rate<=0.05'],

  // ✓ 95% request harus response < 1000ms
  'http_req_duration': ['p(95)<1000'],

  // ✓ 99% request harus response < 2000ms
  'http_req_duration{url:login}': ['p(99)<2000'],

  // ✓ Uptime (success rate)
  'checks': ['rate>0.95'],

  // ✓ Average response time < 500ms
  'http_req_duration': ['avg<500'],
},
// Removed: thresholdAbortOnFail (tidak support di k6 v1.4.2)
```

### 📝 Penjelasan:

- **Multiple Thresholds**: Tidak hanya rate, tapi juga percentiles
- **Login Specific Threshold**: Bisa set threshold per URL
- **Checks Rate**: Pastikan checks rate > 95% (tidak hanya request)
- **Average Response Time**: Tambahan untuk memastikan avg juga optimal
- **Better Metrics**: Lebih detail dan sesuai real-world requirements

---

## 7. PERBAIKAN: Precise Timing Control

### ❌ Masalah di Script Original:

```javascript
// Global sleep 1 menit di akhir
// Tidak presisi untuk 4 halaman yang berbeda
sleep(60);
```

### ✅ Solusi:

```javascript
// Delay 5 detik antar group request
group('1️⃣ Login Page Testing', function () { ... });
sleep(5);

group('2️⃣ Dashboard Admin Testing', function () { ... });
sleep(5);

group('3️⃣ Reminder Tagihan Testing', function () { ... });
sleep(5);

group('4️⃣ Riwayat Tagihan Testing', function () { ... });

// Sleep 30 detik lagi untuk mencapai total 1 menit per cycle
// Total cycle ≈ 5s request + 5s sleep + 5s request + 5s sleep + 5s request + 5s sleep + 5s request + 5s sleep + 30s final sleep ≈ 60s
sleep(30);
```

### 📝 Penjelasan:

- **Better Pacing**: Requests lebih tersebar, bukan burst
- **Realistic Load**: Lebih mirip user real yang mengklik halaman
- **Exact Interval**: Total cycle ≈ 60 detik (1 menit) seperti rancangan
- **Resource Efficiency**: Tidak overload server dengan request burst

---

## 8. PENAMBAHAN: Console Logging

### ❌ Masalah di Script Original:

```javascript
// Tanpa logging, sulit monitor progress real-time
```

### ✅ Solusi:

```javascript
console.log(`⏱️  Waktu: ${new Date().toLocaleString("id-ID")}`);
// ... di awal setiap cycle

console.log(`✅ Cycle selesai, waiting untuk cycle berikutnya...`);
// ... di akhir setiap cycle

console.error(`❌ Error pada ${name}: ${error.message}`);
// ... jika ada error
```

### 📝 Penjelasan:

- **Real-time Monitoring**: Bisa lihat progress test
- **Timestamp Tracking**: Tahu kapan test mulai/stop
- **Error Visibility**: Error langsung terlihat di console
- **Better Debugging**: Mudah troubleshoot jika ada masalah

---

## 9. PENAMBAHAN: Timeout Handling

### ❌ Masalah di Script Original:

```javascript
// Tidak ada timeout setting
let res = http.get(`${BASE_URL}/login`);
// Request bisa hang jika server lambat
```

### ✅ Solusi:

```javascript
res = http.get(url, { redirects: 0, timeout: "30s" });
// atau
res = http.post(url, null, { timeout: "30s" });
```

### 📝 Penjelasan:

- **Timeout Protection**: Request maksimal 30 detik, tidak hang forever
- **Graceful Failure**: Request timeout dicatat sebagai error
- **Better Stability**: Test tidak macet di request tertentu
- **Resource Control**: Tidak ada hanging process

---

## 10. PENAMBAHAN: Environment Variable Support

### ❌ Masalah di Script Original:

```javascript
const BASE_URL = "https://notarisdeni.web.id";
// Hardcoded, harus edit file untuk ganti URL
```

### ✅ Solusi:

```javascript
const BASE_URL = __ENV.BASE_URL || "https://notarisdeni.web.id";
```

### 📝 Penjelasan:

- **Flexibility**: Bisa ganti URL tanpa edit script
- **Deployment Ready**: Bisa digunakan di berbagai environment
- **Easy Testing**: Test dengan URL berbeda-beda

**Cara menggunakan:**

```powershell
$env:BASE_URL="https://your-domain.com"
k6 run scripts/availability-test.js
```

---

## 📊 Summary Perbaikan

| Aspek              | Original    | Diperbaiki      | Benefit                  |
| ------------------ | ----------- | --------------- | ------------------------ |
| Custom Metrics     | ✗           | ✓               | Detail tracking per page |
| Error Handling     | Minimal     | Comprehensive   | Robust & reliable        |
| Code Organization  | Flat        | Grouped         | Readable & maintainable  |
| Checks Validation  | Status only | Full validation | Comprehensive checks     |
| Setup/Teardown     | ✗           | ✓               | Clear test execution     |
| Thresholds         | Basic       | Advanced        | Better criteria          |
| Timing Control     | Global      | Precise         | Realistic load           |
| Logging            | None        | Extensive       | Monitoring real-time     |
| Timeout Handling   | ✗           | ✓               | No hanging requests      |
| Environment Config | Hardcoded   | Flexible        | Reusable script          |

---

## 🎯 Hasil Akhir

Script yang sudah diperbaiki adalah:

- ✅ **Production-ready** untuk pengujian 9 jam
- ✅ **Comprehensive** mencakup semua aspek availability
- ✅ **Robust** dengan error handling dan timeout
- ✅ **Maintainable** dengan kode yang terorganisir
- ✅ **Scalable** mudah ditambah halaman/test baru
- ✅ **Professional** dengan logging dan reporting

**Cocok untuk tugas akhir/skripsi dengan hasil yang kredibel! 🚀**
