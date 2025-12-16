# 🗺️ User Journey (Diagnostics)

## 🇬🇧 English Version

### 1. Introduction

The **Diagnostics User Journey** is a structured approach to troubleshooting issues in Node.js applications. It helps you identify the root cause of a problem by following a logical set of steps.

### 2. Common Diagnostics Scenarios

When debugging a Node.js app, you typically follow one of these paths based on the symptoms:

- **Memory Issues:**
  - Symptom: App crashes with `Out of Memory` or memory usage keeps growing (Leak).
  - Tools: Heap Snapshots, Allocation Profiling.
- **CPU / Performance Issues:**
  - Symptom: App is slow, high CPU usage, or unresponsive (Blocking Event Loop).
  - Tools: CPU Profiler, Flame Graphs.
- **Crash / Error Issues:**
  - Symptom: App exits unexpectedly.
  - Tools: Core Dumps, Stack Traces, `uncaughtException` handlers.
- **Network / I/O Issues:**
  - Symptom: Slow requests, timeouts.
  - Tools: Async Hooks, Tracing.

### 3. Purpose

This section of the documentation serves as a hub to guide you to the specific diagnostic tool or technique needed for your specific problem.

---

## 🇻🇳 Vietnamese Version

### 1. Giới thiệu

**Hành trình Chẩn đoán (Diagnostics User Journey)** là một phương pháp có cấu trúc để khắc phục sự cố trong các ứng dụng Node.js. Nó giúp bạn tìm ra nguyên nhân gốc rễ của vấn đề bằng cách làm theo các bước logic.

### 2. Các kịch bản chẩn đoán phổ biến

Khi gỡ lỗi ứng dụng Node.js, bạn thường đi theo một trong các hướng sau tùy vào triệu chứng:

- **Vấn đề Bộ nhớ (Memory):**
  - Triệu chứng: App bị sập do hết RAM (`Out of Memory`) hoặc RAM tăng liên tục không giảm (Rò rỉ bộ nhớ).
  - Công cụ: Heap Snapshots, Allocation Profiling.
- **Vấn đề CPU / Hiệu năng:**
  - Triệu chứng: App chạy chậm, CPU tăng cao, hoặc bị treo (do chặn Event Loop).
  - Công cụ: CPU Profiler, Flame Graphs.
- **Vấn đề Lỗi / Sập App (Crash):**
  - Triệu chứng: App tự động tắt đột ngột.
  - Công cụ: Core Dumps, Stack Traces, xử lý `uncaughtException`.
- **Vấn đề Mạng / I/O:**
  - Triệu chứng: Phản hồi chậm, kết nối bị timeout.
  - Công cụ: Async Hooks, Tracing.

### 3. Mục đích

Phần tài liệu này đóng vai trò như một trung tâm điều hướng, giúp bạn tìm đến đúng công cụ hoặc kỹ thuật chẩn đoán cần thiết cho vấn đề cụ thể của mình.
