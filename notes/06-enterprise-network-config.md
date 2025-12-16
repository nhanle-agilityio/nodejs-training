# 🏢 Enterprise Network Configuration in Node.js

## 🇬🇧 English Version

### 1. Overview

Enterprise networks often have strict security rules, requiring applications to access the internet via **Proxies** and use **Custom Certificate Authorities (CAs)** for SSL/TLS. Node.js provides built-in support for these configurations.

### 2. Proxy Configuration

To route your application's traffic through a corporate proxy, you can use environment variables or CLI flags.

- **Environment Variables:**
  ```bash
  export HTTP_PROXY="http://proxy.company.com:8080"
  export HTTPS_PROXY="http://proxy.company.com:8080"
  export NO_PROXY="localhost,127.0.0.1,.company.com" # Bypass proxy for these
  ```
- **Enable in Node.js:**
  You must tell Node.js to use these variables.
  - **Using Env Variable:** `export NODE_USE_ENV_PROXY=1`
  - **Using CLI Flag:** `node --use-env-proxy app.js`

- **Programmatic Configuration:**
  You can configure proxies per request by creating a custom `Agent`.

  ```javascript
  const https = require('node:https');
  const agent = new https.Agent({
    proxyEnv: { HTTPS_PROXY: 'http://proxy.company.com:8080' }
  });

  https.request({ agent, hostname: 'google.com' }, ...);
  ```

### 3. Certificate Authority (CA) Configuration

Enterprise networks often intercept HTTPS traffic (SSL inspection) using their own internal certificates. Node.js needs to trust these certificates to avoid `self signed certificate in certificate chain` errors.

- **Trust System CAs (Windows/macOS/Linux):**
  Newer Node.js versions can use the operating system's certificate store.
  - **Env Variable:** `NODE_USE_SYSTEM_CA=1`
  - **CLI Flag:** `node --use-system-ca app.js`

- **Add Extra CA Certificate File:**
  If you have a specific certificate file (`.pem`) to trust:

  ```bash
  export NODE_EXTRA_CA_CERTS="/path/to/company-root-ca.pem"
  node app.js
  ```

- **Programmatic CA Configuration:**
  ```javascript
  const tls = require("node:tls");
  // Combine default certs with system certs
  const systemCerts = tls.getCACertificates("system");
  const defaultCerts = tls.getCACertificates("default");
  tls.setDefaultCACertificates([...defaultCerts, ...systemCerts]);
  ```

---

## 🇻🇳 Vietnamese Version

### 1. Tổng quan

Các mạng doanh nghiệp thường có quy định bảo mật nghiêm ngặt, yêu cầu ứng dụng phải truy cập internet thông qua **Proxy** và sử dụng **Chứng chỉ CA nội bộ (Custom CAs)** cho kết nối SSL/TLS. Node.js hỗ trợ sẵn các cấu hình này.

### 2. Cấu hình Proxy

Để định tuyến lưu lượng mạng của ứng dụng qua proxy công ty, bạn có thể dùng biến môi trường hoặc cờ lệnh (CLI flag).

- **Biến môi trường:**
  ```bash
  export HTTP_PROXY="http://proxy.company.com:8080"
  export HTTPS_PROXY="http://proxy.company.com:8080"
  export NO_PROXY="localhost,127.0.0.1,.company.com" # Không qua proxy với các địa chỉ này
  ```
- **Kích hoạt trong Node.js:**
  Bạn cần báo cho Node.js biết để sử dụng các biến trên.
  - **Dùng biến môi trường:** `export NODE_USE_ENV_PROXY=1`
  - **Dùng cờ lệnh:** `node --use-env-proxy app.js`

- **Cấu hình bằng Code:**
  Bạn có thể cấu hình proxy cho từng request bằng cách tạo `Agent` tùy chỉnh.

  ```javascript
  const https = require('node:https');
  const agent = new https.Agent({
    proxyEnv: { HTTPS_PROXY: 'http://proxy.company.com:8080' }
  });

  https.request({ agent, hostname: 'google.com' }, ...);
  ```

### 3. Cấu hình Chứng chỉ CA (Certificate Authority)

Mạng doanh nghiệp thường chặn bắt lưu lượng HTTPS để kiểm tra an toàn, sử dụng chứng chỉ nội bộ của họ. Node.js cần phải tin tưởng các chứng chỉ này để không báo lỗi `self signed certificate in certificate chain`.

- **Tin tưởng CA của hệ thống (Windows/macOS/Linux):**
  Các phiên bản Node.js mới có thể sử dụng kho chứng chỉ của hệ điều hành.
  - **Biến môi trường:** `NODE_USE_SYSTEM_CA=1`
  - **Cờ lệnh:** `node --use-system-ca app.js`

- **Thêm file chứng chỉ CA phụ:**
  Nếu bạn có một file chứng chỉ cụ thể (`.pem`) cần tin tưởng:

  ```bash
  export NODE_EXTRA_CA_CERTS="/path/to/company-root-ca.pem"
  node app.js
  ```

- **Cấu hình CA bằng Code:**
  ```javascript
  const tls = require("node:tls");
  // Gộp chứng chỉ mặc định và chứng chỉ hệ thống
  const systemCerts = tls.getCACertificates("system");
  const defaultCerts = tls.getCACertificates("default");
  tls.setDefaultCACertificates([...defaultCerts, ...systemCerts]);
  ```
