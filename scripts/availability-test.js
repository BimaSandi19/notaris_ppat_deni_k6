import http from "k6/http";
import { check, sleep, group } from "k6";

/**
 * PENGUJIAN NON-FUNGSIONAL: AVAILABILITY (KETERSEDIAAN SISTEM)
 *
 * Rancangan Pengujian Bab 3:
 * - 1 Virtual User (admin keuangan)
 * - Durasi: 9 jam (jam kerja 08:00-17:00)
 * - Interval request: 1 menit
 * - Halaman yang diuji: login, dashboard, reminder, history
 *
 * Tujuan: Memastikan sistem tersedia dan responsif sepanjang jam kerja
 */

export const options = {
  // 1. LOAD CONFIGURATION - Jumlah Virtual Users
  vus: 1, // 1 admin keuangan (single user)

  // 2. DURATION - Durasi Pengujian
  duration: "9h", // 9 jam durasi (jam kerja 08:00-17:00)

  // 3. THRESHOLDS - Kriteria Pass/Fail
  thresholds: {
    // Error rate maksimal 5% → Success rate minimal 95%
    http_req_failed: ["rate<=0.05"],

    // 95% request harus response < 1000ms
    http_req_duration: ["p(95)<1000"],

    // 99% request harus response < 2000ms
    "http_req_duration{url:login}": ["p(99)<2000"],

    // Uptime (success rate)
    checks: ["rate>0.95"],

    // Average response time < 500ms
    http_req_duration: ["avg<500"],
  },
};

// KONFIGURASI BASE URL
const BASE_URL = __ENV.BASE_URL || "https://notarisdeni.web.id";

// CUSTOM METRICS TRACKING
import { Counter, Trend, Gauge } from "k6/metrics";

const errorCounter = new Counter("errors_total");
const successCounter = new Counter("success_total");
const responseTimeByPage = new Trend("response_time_by_page");
const pageAvailability = new Gauge("page_availability");

// FUNGSI HELPER UNTUK HTTP REQUESTS
function makeRequest(method, url, name) {
  const startTime = new Date();
  let res;

  try {
    if (method === "GET") {
      res = http.get(url, { redirects: 0, timeout: "30s" });
    } else if (method === "POST") {
      res = http.post(url, null, { timeout: "30s" });
    }

    const endTime = new Date();
    const responseTime = endTime - startTime;

    // Track metrics
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

// TEST SCENARIO - DEFAULT FUNCTION
export default function () {
  console.log(`⏱️  Waktu: ${new Date().toLocaleString("id-ID")}`);

  // GROUP 1: Login Page
  group("1️⃣ Login Page Testing", function () {
    let res = makeRequest("GET", `${BASE_URL}/login`, "login");

    if (res) {
      check(res, {
        "✓ Status 200": (r) => r.status === 200,
        "✓ Response time < 1s": (r) => r.timings.duration < 1000,
        "✓ Body contains form": (r) =>
          r.body.includes("login") || r.body.includes("form"),
      });
    }
  });

  sleep(5); // Delay 5 detik antar group

  // GROUP 2: Dashboard Admin
  group("2️⃣ Dashboard Admin Testing", function () {
    let res = makeRequest("GET", `${BASE_URL}/admin/dashboard`, "dashboard");

    if (res) {
      check(res, {
        "✓ Status 200 atau 302": (r) => r.status === 200 || r.status === 302,
        "✓ Response time < 1s": (r) => r.timings.duration < 1000,
        "✓ No server errors": (r) => r.status < 500,
      });
    }
  });

  sleep(5);

  // GROUP 3: Halaman Reminder Tagihan
  group("3️⃣ Reminder Tagihan Testing", function () {
    let res = makeRequest("GET", `${BASE_URL}/admin/reminder`, "reminder");

    if (res) {
      check(res, {
        "✓ Status 200 atau 302": (r) => r.status === 200 || r.status === 302,
        "✓ Response time < 1s": (r) => r.timings.duration < 1000,
        "✓ No server errors": (r) => r.status < 500,
      });
    }
  });

  sleep(5);

  // GROUP 4: Halaman Riwayat Tagihan
  group("4️⃣ Riwayat Tagihan Testing", function () {
    let res = makeRequest("GET", `${BASE_URL}/admin/history`, "history");

    if (res) {
      check(res, {
        "✓ Status 200 atau 302": (r) => r.status === 200 || r.status === 302,
        "✓ Response time < 1s": (r) => r.timings.duration < 1000,
        "✓ No server errors": (r) => r.status < 500,
      });
    }
  });

  // INTERVAL 1 MENIT ANTAR CYCLE
  // Total waktu per cycle: ~5s request + 25s sleep = 30 detik
  // Sleep 30 detik lagi untuk mencapai 1 menit total
  sleep(30);
  console.log(`✅ Cycle selesai, waiting untuk cycle berikutnya...`);
}

// SETUP FUNCTION - BERJALAN SEKALI DI AWAL TEST
export function setup() {
  console.log("🚀 ========================================");
  console.log("🚀 PENGUJIAN AVAILABILITY DIMULAI");
  console.log("🚀 ========================================");
  console.log(`📍 Target URL: ${BASE_URL}`);
  console.log(`👥 Virtual Users: 1 (admin keuangan)`);
  console.log(`⏱️  Duration: 9 jam (jam kerja 08:00-17:00)`);
  console.log(`📊 Interval: 1 menit per cycle`);
  console.log(`🎯 Threshold Error Rate: ≤ 5% (Success ≥ 95%)`);
  console.log(`🎯 Threshold Response Time P95: < 1000ms`);
  console.log("🚀 ========================================\n");

  return { startTime: new Date() };
}

// TEARDOWN FUNCTION - BERJALAN SEKALI DI AKHIR TEST
export function teardown(data) {
  console.log("\n✅ ========================================");
  console.log("✅ PENGUJIAN AVAILABILITY SELESAI");
  console.log("✅ ========================================");
  console.log(`📅 Durasi Testing: ${new Date() - data.startTime} ms`);
  console.log("📊 Silakan cek hasil di summary report");
  console.log("✅ ========================================\n");
}
