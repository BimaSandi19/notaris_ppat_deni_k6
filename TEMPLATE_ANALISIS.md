# 📊 Template Analisis Hasil Pengujian Availability

## Bagian 1: Overview Test Execution

### 1.1 Informasi Umum Pengujian

```
Nama Pengujian        : Availability Testing (Ketersediaan Sistem)
Tanggal Pengujian     : [ISIKAN]
Durasi Pengujian      : 9 jam (jam kerja 08:00-17:00)
Virtual Users (VUs)   : 1 (Admin Keuangan)
Target System         : https://notarisdeni.web.id
Total Requests        : [LIHAT DI OUTPUT]
Total Iterations      : [LIHAT DI OUTPUT]
Timestamp Start       : [LIHAT DI OUTPUT SETUP]
Timestamp End         : [LIHAT DI OUTPUT TEARDOWN]
```

---

## Bagian 2: Hasil Pengujian Utama

### 2.1 Tabel Metrik Utama

| Metrik                    | Target   | Hasil        | Status |
| ------------------------- | -------- | ------------ | ------ |
| **Error Rate**            | ≤ 5%     | ? %          | ✓/✗    |
| **Success Rate**          | ≥ 95%    | ? %          | ✓/✗    |
| **P95 Response Time**     | < 1000ms | ? ms         | ✓/✗    |
| **P99 Response Time**     | < 2000ms | ? ms         | ✓/✗    |
| **Average Response Time** | < 500ms  | ? ms         | ✓/✗    |
| **Checks Passed**         | > 95%    | ? %          | ✓/✗    |
| **Total Requests**        | -        | ? requests   | -      |
| **Total Iterations**      | -        | ? iterations | -      |
| **Data Received**         | -        | ? kB         | -      |
| **Data Sent**             | -        | ? kB         | -      |

_Copy nilai dari output test di kolom "Hasil"_

---

### 2.2 Response Time Statistics

| Metrik | Nilai (ms) |
| ------ | ---------- |
| Min    | ?          |
| Median | ?          |
| Avg    | ?          |
| P90    | ?          |
| P95    | ?          |
| P99    | ?          |
| Max    | ?          |

---

### 2.3 Per-Page Performance

#### Halaman 1: Login (`/login`)

| Metrik            | Hasil |
| ----------------- | ----- |
| Status Code       | ?     |
| Avg Response Time | ? ms  |
| P95 Response Time | ? ms  |
| Error Count       | ?     |
| Success Rate      | ? %   |

#### Halaman 2: Dashboard Admin (`/admin/dashboard`)

| Metrik            | Hasil       |
| ----------------- | ----------- |
| Status Code       | ? (200/302) |
| Avg Response Time | ? ms        |
| P95 Response Time | ? ms        |
| Error Count       | ?           |
| Success Rate      | ? %         |

#### Halaman 3: Reminder Tagihan (`/admin/reminder`)

| Metrik            | Hasil       |
| ----------------- | ----------- |
| Status Code       | ? (200/302) |
| Avg Response Time | ? ms        |
| P95 Response Time | ? ms        |
| Error Count       | ?           |
| Success Rate      | ? %         |

#### Halaman 4: Riwayat Tagihan (`/admin/history`)

| Metrik            | Hasil       |
| ----------------- | ----------- |
| Status Code       | ? (200/302) |
| Avg Response Time | ? ms        |
| P95 Response Time | ? ms        |
| Error Count       | ?           |
| Success Rate      | ? %         |

---

## Bagian 3: Analisis Hasil

### 3.1 Kesimpulan Ketersediaan Sistem

**Apakah sistem TERSEDIA sesuai kriteria yang ditetapkan?**

☐ **TERSEDIA** - Semua threshold terpenuhi (semua ✓)  
☐ **CUKUP TERSEDIA** - Mayoritas threshold terpenuhi (< 2 ✗)  
☐ **KURANG TERSEDIA** - Banyak threshold tidak terpenuhi (> 2 ✗)

**Penjelasan:**

```
[Jelaskan hasil testing di sini]
Contoh: Sistem menunjukkan ketersediaan yang sangat baik dengan error rate 0%
dan response time rata-rata 70ms, jauh di bawah target 500ms...
```

---

### 3.2 Analisis Per-Halaman

#### Login Page

- **Status**: [✓ Excellent / ⚠️ Warning / ✗ Problem]
- **Findings**: [Hasil performa halaman login]

#### Dashboard Admin

- **Status**: [✓ Excellent / ⚠️ Warning / ✗ Problem]
- **Findings**: [Hasil performa halaman dashboard]

#### Reminder Tagihan

- **Status**: [✓ Excellent / ⚠️ Warning / ✗ Problem]
- **Findings**: [Hasil performa halaman reminder]

#### Riwayat Tagihan

- **Status**: [✓ Excellent / ⚠️ Warning / ✗ Problem]
- **Findings**: [Hasil performa halaman history]

---

### 3.3 Identifikasi Masalah

#### Masalah yang Ditemukan:

```
1. [Jika ada masalah, jelaskan di sini]
   Contoh: Halaman reminder memiliki response time yang lebih tinggi (avg 400ms)

2. [Masalah lainnya jika ada]

3. [Dst...]
```

#### Jika Tidak Ada Masalah:

```
Tidak ada masalah signifikan yang ditemukan selama pengujian 9 jam.
Semua halaman menunjukkan ketersediaan dan performa yang optimal.
```

---

## Bagian 4: Rekomendasi

### 4.1 Rekomendasi Teknis

- [ ] **Rekomendasi 1**: [Jelaskan apa yang perlu diperbaiki/dipertahankan]
- [ ] **Rekomendasi 2**: [Rekomendasi lainnya]
- [ ] **Rekomendasi 3**: [Dst...]

### 4.2 Rekomendasi untuk Monitoring

- [ ] Implementasikan monitoring 24/7 untuk deteksi downtime
- [ ] Setup alerting untuk threshold violations
- [ ] Lakukan pengujian availability secara berkala (bulanan/quarterly)

---

## Bagian 5: Lampiran

### 5.1 Full Test Output

```
[Paste FULL output dari k6 test di sini]
[Mulai dari "execution: local" hingga akhir]
```

### 5.2 Log File

File log test disimpan di:

```
d:\Applications\websitedn-k6\results\availability-test-YYYYMMDD-HHMMSS.log
```

### 5.3 Script yang Digunakan

File script dapat dilihat di:

```
d:\Applications\websitedn-k6\scripts\availability-test.js
```

---

## Petunjuk Pengisian:

1. **Tunggu test 9 jam selesai**
2. **Copy hasil output** ke Bagian 2.1 - 2.3
3. **Analisis performa** dan tulis di Bagian 3
4. **Identifikasi masalah** jika ada
5. **Buat rekomendasi** di Bagian 4
6. **Paste full output** di Bagian 5.1
7. **Gunakan template ini untuk laporan tugas akhir Anda**

---

**Template dibuat**: 28 November 2025  
**Untuk**: Pengujian Availability Sistem Notaris (Tugas Akhir/Skripsi)
