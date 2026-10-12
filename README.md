# 🚀 Modern Personal Developer Portfolio

> **Dự án Portfolio Lập trình Mạng & Full-stack Web Cá Nhân**  
> Xây dựng bằng ReactJS, Vite, Tailwind CSS, Framer Motion, Express.js và SQLite.  
> Đóng gói Docker Container, sẵn sàng triển khai trên Ubuntu Server 22.04 (VMware) và public ra Internet qua Cloudflare Tunnel.

---

## 📑 MỤC LỤC
1. [Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
2. [Kiến Trúc & Tech Stack](#-kiến-trúc--tech-stack)
3. [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
4. [Hướng Dẫn Cài Đặt & Chạy Local](#-hướng-dẫn-cài-đặt--chạy-local)
5. [Cấu Hình Biến Môi Trường (.env)](#-cấu-hình-biến-môi-trường-env)
6. [Tích Hợp Thông Báo Đẩy Ra Điện Thoại (Pushbullet & Bark)](#-tích-hợp-thông-báo-đẩy-ra-điện-thoại-pushbullet--bark)
7. [Bảng Điều Khiển Admin (Cập Nhật Banner Từ Điện Thoại)](#-bảng-điều-khiển-admin-cập-nhật-banner-từ-điện-thoại)
8. [Triển Khai Docker & Docker Compose](#-triển-khai-docker--docker-compose)
9. [Hướng Dẫn Triển Khai Trên Ubuntu Server 22.04 (VMware)](#-hướng-dẫn-triển-khai-trên-ubuntu-server-2204-vmware)
10. [Công Khai Ra Internet Với Cloudflare Tunnel](#-công-khai-ra-internet-với-cloudflare-tunnel)

---

## ✨ TÍNH NĂNG NỔI BẬT

- **Dark Futuristic Tech UI / UX**: Bảng màu `#080D1A`, hiệu ứng glassmorphism, glowing borders cyan-purple, particle canvas mượt mà.
- **Top Announcement Banner (Infinite Marquee)**:
  - Banner cao 36–44px, gradient cyan/purple.
  - Chữ chạy vô hạn (CSS Marquee) không dùng thẻ `<marquee>` lỗi thời.
  - Tự động polling `GET /api/banner` mỗi **5 giây**, cập nhật tức thì không cần F5.
- **Hero Section Tương Tác**:
  - Badge trạng thái *"Available for Opportunities"*.
  - Typing animation luân phiên: *Software Developer*, *Web Developer*, *IT Student*, *Technology Enthusiast*.
  - Avatar hiệu ứng viền phát sáng đa tầng kèm các chip công nghệ xoay quanh (React, Node.js, Docker, Ubuntu).
- **Featured Projects**: Quản lý độc lập tại `src/data/projectsData.js`, hiển thị trạng thái trung thực (*Public Code*, *Private Repo*, *VMware Lab Deployment*).
- **Trọng Tâm Bài Tập - Mobile Gateway Contact Form**:
  - Gửi lời nhắn từ khách truy cập trực tiếp về điện thoại người lập trình.
  - Tích hợp cả **Pushbullet API** và **Bark Webhook**.
  - Rate-limit chống spam và lưu trữ lịch sử tin nhắn trong SQLite.
- **Admin Control Panel Ẩn & Bảo Mật**:
  - Không lộ route trang quản trị công khai.
  - Mở bằng phím tắt `Ctrl + Shift + A`, icon khiên bí mật ở Navbar/Footer hoặc tham số `?admin=true`.
  - Xác thực mật khẩu bảo mật phía server (HMAC Signature Token) để cập nhật thông báo banner.

---

## 🛠 KIẾN TRÚC & TECH STACK

| Tầng | Công nghệ sử dụng |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS, Framer Motion, Lucide React |
| **Backend** | Node.js 22 LTS, Express.js, `node:sqlite` (SQLite tích hợp) |
| **Push Notification** | Pushbullet API (Android / Multi-device), Bark (iOS) |
| **Containerization** | Docker Multi-Stage Build, Docker Compose |
| **OS Môi Trường** | Ubuntu Server 22.04 LTS chạy trên VMware Workstation |
| **Mạng & Public Internet** | Cloudflare Tunnel (`cloudflared`) |

---

## 📂 CẤU TRÚC THƯ MỤC

```text
Personal Portfolio/
├── frontend/                   # Mã nguồn React Frontend
│   ├── public/
│   │   ├── favicon.svg         # SVG terminal code favicon
│   │   └── avatar.png          # Ảnh đại diện cá nhân
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # AnnouncementBanner, Navbar, Footer, ScrollProgress
│   │   │   ├── sections/       # Hero, About, Skills, Projects, Contact
│   │   │   └── ui/             # ParticleBackground, AdminModal, Toast
│   │   ├── data/               # personalInfo.js, skillsData.js, projectsData.js
│   │   ├── hooks/              # useBanner.js, useScrollSpy.js, useToast.js
│   │   ├── services/           # api.js (kết nối Express Backend)
│   │   ├── App.jsx
│   │   ├── index.css           # Custom glassmorphism, scrollbar & marquee
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                    # Mã nguồn Express Backend
│   ├── config/env.js           # Quản lý cấu hình biến môi trường
│   ├── controllers/            # bannerController, messageController, authController
│   ├── database/db.js          # Khởi tạo SQLite & bảng announcements, messages
│   ├── middleware/             # auth.js (HMAC Bearer Token), rateLimiter.js
│   ├── routes/api.js           # Các endpoint /api/...
│   ├── services/               # notificationService.js (Pushbullet & Bark)
│   └── server.js               # Express server lắng nghe 0.0.0.0, phục vụ static dist
├── Dockerfile                  # Multi-stage build (Node Alpine)
├── compose.yaml                # Docker Compose orchestration với volume SQLite
├── .dockerignore
├── .env.example
├── .env
├── package.json                # Root scripts điều khiển toàn bộ dự án
└── README.md
```

---

## 💻 HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL

### 1. Yêu Cầu Tiên Quyết
- Node.js >= 20 (Khuyến nghị Node.js 22 hoặc 24 LTS).
- Trình quản lý gói `npm`.

### 2. Cài Đặt Dependencies
Từ thư mục gốc dự án:
```bash
npm run install:all
```
*(Lệnh trên sẽ tự động cài `npm install` cho cả thư mục `client` và `server`)*

### 3. Khởi Chạy Môi Trường Phát Triển (Development)
Mở 2 cửa sổ terminal:

- **Terminal 1: Khởi động Backend API (Port 5000)**
  ```bash
  npm run dev:server
  ```
- **Terminal 2: Khởi động Frontend Vite (Port 3000)**
  ```bash
  npm run dev:client
  ```

Truy cập: `http://localhost:3000` (Vite tự động proxy mọi request `/api/*` về `localhost:5000`).

---

## ⚙️ CẤU HÌNH BIẾN MÔI TRƯỜNG (.env)

Sao chép file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

Nội dung `.env`:
```env
PORT=5000
NODE_ENV=production
ADMIN_PASSWORD=admin@2026
JWT_SECRET=super_secret_jwt_key_for_developer_portfolio_2026
DB_PATH=./backend/data/portfolio.db

# Cấu hình Push Notifications đến điện thoại
PUSHBULLET_ACCESS_TOKEN=
BARK_DEVICE_KEY=
BARK_SERVER_URL=https://api.day.app
```

> **Ghi chú**: Nếu để trống `PUSHBULLET_ACCESS_TOKEN` và `BARK_DEVICE_KEY`, hệ thống sẽ tự động chuyển sang chế độ **Simulation Mode** (in nội dung tin nhắn gửi vào console server), giúp kiểm thử form mà không báo lỗi.

---

## 📱 TÍCH HỢP THÔNG BÁO ĐẨY RA ĐIỆN THOẠI (PUSHBULLET & BARK)

Khi khách truy cập gửi tin nhắn từ mục **Let's Connect**, backend sẽ gửi thông báo đẩy đến điện thoại ngay lập tức:

### Cách 1: Dùng Pushbullet (Hỗ trợ Android, Web, PC)
1. Cài ứng dụng **Pushbullet** trên điện thoại Android từ Google Play.
2. Đăng nhập tài khoản tại [https://www.pushbullet.com](https://www.pushbullet.com).
3. Vào **Settings** > **Account** > bấm **Create Access Token**.
4. Sao chép chuỗi Token và dán vào `.env`:
   ```env
   PUSHBULLET_ACCESS_TOKEN=o.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Cách 2: Dùng Bark (Dành riêng cho iPhone / iPad)
1. Tải app miễn phí **Bark - Customed Notifications** trên Apple App Store.
2. Mở app, sao chép mã **Device Key** hiển thị trên màn hình.
3. Dán Device Key vào `.env`:
   ```env
   BARK_DEVICE_KEY=xxxxxxxxxxxxxxxx
   ```

---

## 🔐 BẢNG ĐIỀU KHIỂN ADMIN (CẬP NHẬT BANNER TỪ ĐIỆN THOẠI)

Để người lập trình có thể đổi lời nhắn banner bằng điện thoại mà không cần mở code:

1. **Cách mở bảng Admin**:
   - Nhấn vào biểu tượng **Shield (Khiên)** ở góc phải Navbar hoặc cuối Footer.
   - Hoặc click trực tiếp vào chữ **Announcement** trên banner chạy đầu trang.
   - Hoặc thêm tham số `?admin=true` vào URL: `https://your-domain.com/?admin=true`.
   - Hoặc trên máy tính: ấn tổ hợp phím **`Ctrl + Shift + A`**.
2. **Đăng nhập**:
   - Nhập mật khẩu Admin (mặc định: `admin@2026` hoặc giá trị bạn đặt trong biến `ADMIN_PASSWORD`).
   - Bấm **Authenticate**.
3. **Cập nhật thông báo**:
   - Nhập nội dung thông điệp mới (tối đa 300 ký tự).
   - Nhấn **Publish Announcement**.
   - Dữ liệu được ghi vào SQLite, và tất cả người đang xem website sẽ thấy banner đổi trong vòng **5 giây**!

---

## 🐳 TRIỂN KHAI DOCKER & DOCKER COMPOSE

Dự án đã có sẵn Multi-Stage `Dockerfile` tối ưu hóa dung lượng (dưới 180MB) và lưu trữ SQLite an toàn qua Docker Volume.

### 1. Build Docker Image
```bash
docker build -t developer-portfolio:latest .
```

### 2. Khởi Chạy Với Docker Compose
```bash
docker compose up -d
```

Kiểm tra trạng thái container và logs:
```bash
docker compose ps
docker compose logs -f
```

### 3. Đẩy Image Lên Docker Hub (Cho Bài Tập)
```bash
# 1. Đăng nhập Docker Hub
docker login

# 2. Gắn tag cho image với username của bạn
docker tag developer-portfolio:latest <YOUR_DOCKERHUB_USERNAME>/developer-portfolio:latest

# 3. Đẩy lên Docker Hub
docker push <YOUR_DOCKERHUB_USERNAME>/developer-portfolio:latest
```

---

## 🖥 HƯỚNG DẪN TRIỂN KHAI TRÊN UBUNTU SERVER 22.04 (VMWARE)

### Bước 1: Chuẩn bị máy ảo VMware Workstation
1. Cài đặt **Ubuntu Server 22.04 LTS** trên VMware Workstation.
2. Cấu hình Card mạng của VMware ở chế độ **NAT** hoặc **Bridged**.
3. Cài đặt Docker trên Ubuntu Server:
   ```bash
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg lsb-release
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

### Bước 2: Kéo Image từ Docker Hub và chạy container
```bash
# Kéo image bạn đã push từ máy chính
sudo docker pull <YOUR_DOCKERHUB_USERNAME>/developer-portfolio:latest

# Tạo thư mục và chạy container
mkdir -p ~/portfolio && cd ~/portfolio
curl -O https://raw.githubusercontent.com/<YOUR_REPO>/main/compose.yaml
curl -O https://raw.githubusercontent.com/<YOUR_REPO>/main/.env.example
cp .env.example .env

# Chạy container
sudo docker compose up -d
```

---

## 🌐 CÔNG KHAI RA INTERNET VỚI CLOUDFLARE TUNNEL

Vì Ubuntu Server chạy bên trong VMware qua mạng NAT/LAN gia đình không có IP tĩnh công khai, **Cloudflare Tunnel (`cloudflared`)** là giải pháp tối ưu và an toàn nhất cho môn Lập trình mạng:
- Hoàn toàn miễn phí, không cần mở Port (Port Forwarding) trên Router gia đình.
- Hỗ trợ SSL/TLS (HTTPS) tự động.
- Băng thông nhanh, chống DDoS.

### Các Bước Cài Đặt Cloudflared Trên Ubuntu Server:

1. **Cài đặt tiện ích `cloudflared`**:
   ```bash
   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared.deb
   ```

2. **Cách 1: Khởi tạo Quick Tunnel Tức Thì (Không cần sở hữu tên miền riêng)**:
   ```bash
   cloudflared tunnel --url http://localhost:5000
   ```
   Terminal sẽ xuất ra một đường link công khai dạng:
   `https://random-name.trycloudflare.com`  
   👉 Chia sẻ đường dẫn này cho giảng viên hoặc mở ngay trên điện thoại để trải nghiệm!

3. **Cách 2: Gắn với Tên Miền Cá Nhân qua Cloudflare Zero Trust (Khuyến nghị bài tập chính thức)**:
   - Truy cập **Cloudflare Dashboard** > **Zero Trust** > **Networks** > **Tunnels**.
   - Bấm **Create a Tunnel**, chọn kết nối dạng **Docker** hoặc **Debian**.
   - Copy mã Token dịch vụ chạy trên Ubuntu:
     ```bash
     sudo cloudflared service install <YOUR_TUNNEL_TOKEN>
     ```
   - Trỏ hostname (ví dụ: `portfolio.yourname.dev`) về service `http://localhost:5000`.

---

## 👨‍💻 TÁC GIẢ & THÔNG TIN BÀI TẬP

- **Họ và tên**: Duy
- **MSSV**: 2252xxxx
- **Chuyên ngành**: Mạng máy tính & Truyền thông dữ liệu
- **Trường**: Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM)
- **Môn học**: Lập trình mạng
- **Bản quyền**: © 2026 Duy. Giấy phép mã nguồn mở MIT.

