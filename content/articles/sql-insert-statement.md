---
title: "SQL INSERT Statement - Thêm dữ liệu vào bảng"
description: "Học cách sử dụng câu lệnh INSERT trong SQL để thêm dữ liệu mới vào bảng. Hướng dẫn chi tiết với các ví dụ thực tế."
date: "2026-02-05"
category: "SQL"
slug: "sql-insert-statement"
---

## Giới thiệu về INSERT Statement

Câu lệnh `INSERT` trong SQL được sử dụng để thêm dữ liệu mới vào bảng. Đây là một trong những câu lệnh cơ bản và quan trọng nhất trong SQL.

## Cú pháp cơ bản

Có hai cách chính để sử dụng câu lệnh INSERT:

### 1. INSERT với danh sách cột

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

### 2. INSERT không chỉ định cột

```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

## Ví dụ thực tế

Giả sử chúng ta có bảng `users` với cấu trúc sau:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Ví dụ 1: Thêm một user mới

```sql
INSERT INTO users (username, email, age)
VALUES ('john_doe', 'john@example.com', 25);
```

### Ví dụ 2: Thêm nhiều users cùng lúc

```sql
INSERT INTO users (username, email, age)
VALUES 
    ('jane_smith', 'jane@example.com', 30),
    ('bob_wilson', 'bob@example.com', 28),
    ('alice_brown', 'alice@example.com', 32);
```

## INSERT với SELECT

Bạn có thể sử dụng câu lệnh SELECT để chèn dữ liệu từ bảng khác:

```sql
INSERT INTO users_backup (username, email, age)
SELECT username, email, age
FROM users
WHERE age > 25;
```

## Lưu ý quan trọng

- **Kiểu dữ liệu**: Đảm bảo giá trị bạn chèn phải khớp với kiểu dữ liệu của cột
- **NULL values**: Nếu cột cho phép NULL và bạn không cung cấp giá trị, nó sẽ được đặt là NULL
- **AUTO_INCREMENT**: Không cần chỉ định giá trị cho cột AUTO_INCREMENT
- **DEFAULT values**: Các cột có giá trị mặc định sẽ tự động sử dụng giá trị đó nếu không được chỉ định

## Xử lý lỗi

Khi chèn dữ liệu, bạn có thể gặp một số lỗi phổ biến:

1. **Duplicate key error**: Khi cố gắng chèn giá trị trùng lặp vào cột UNIQUE hoặc PRIMARY KEY
2. **Data type mismatch**: Khi kiểu dữ liệu không khớp
3. **NOT NULL constraint**: Khi cột NOT NULL không được cung cấp giá trị

### Sử dụng INSERT IGNORE

```sql
INSERT IGNORE INTO users (username, email, age)
VALUES ('john_doe', 'john@example.com', 25);
```

Câu lệnh trên sẽ bỏ qua lỗi duplicate key thay vì dừng thực thi.

## Kết luận

Câu lệnh INSERT là công cụ cơ bản để thêm dữ liệu vào database. Hiểu rõ cách sử dụng nó sẽ giúp bạn làm việc hiệu quả với SQL.

### Bài viết liên quan

- SQL SELECT Statement
- SQL UPDATE Statement
- SQL DELETE Statement
