---
title: "Bash Scripting Basics - Viết script tự động hóa"
description: "Học cách viết bash script để tự động hóa các tác vụ trong Linux/Unix. Hướng dẫn từ cơ bản đến nâng cao."
date: "2026-02-03"
category: "Bash"
slug: "bash-scripting-basics"
---

## Giới thiệu về Bash Scripting

Bash (Bourne Again Shell) là shell phổ biến nhất trong các hệ điều hành Linux/Unix. Bash scripting cho phép bạn tự động hóa các tác vụ lặp đi lặp lại.

## Script đầu tiên

Tạo file `hello.sh`:

```bash
#!/bin/bash
echo "Hello, World!"
```

Chạy script:

```bash
chmod +x hello.sh
./hello.sh
```

## Biến (Variables)

### Khai báo và sử dụng biến

```bash
#!/bin/bash

# Khai báo biến
name="John"
age=25

# Sử dụng biến
echo "My name is $name"
echo "I am $age years old"
```

### Biến môi trường

```bash
#!/bin/bash

echo "Home directory: $HOME"
echo "Current user: $USER"
echo "Current path: $PATH"
```

## Nhận input từ user

```bash
#!/bin/bash

echo "What is your name?"
read username

echo "Hello, $username!"
```

## Tham số dòng lệnh

```bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Number of arguments: $#"
```

Chạy:

```bash
./script.sh arg1 arg2 arg3
```

## Câu lệnh điều kiện

### If-else

```bash
#!/bin/bash

age=20

if [ $age -ge 18 ]; then
    echo "You are an adult"
else
    echo "You are a minor"
fi
```

### So sánh chuỗi

```bash
#!/bin/bash

name="John"

if [ "$name" = "John" ]; then
    echo "Hello John!"
else
    echo "You are not John"
fi
```

## Vòng lặp

### For loop

```bash
#!/bin/bash

# Loop qua danh sách
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# Loop qua files
for file in *.txt; do
    echo "Processing $file"
done
```

### While loop

```bash
#!/bin/bash

counter=1

while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

## Functions

```bash
#!/bin/bash

# Định nghĩa function
greet() {
    local name=$1
    echo "Hello, $name!"
}

# Gọi function
greet "John"
greet "Jane"
```

## Ví dụ thực tế: Backup script

```bash
#!/bin/bash

# Script backup tự động
SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.tar.gz"

echo "Starting backup..."

# Tạo thư mục backup nếu chưa tồn tại
mkdir -p "$BACKUP_DIR"

# Nén và backup
tar -czf "$BACKUP_DIR/$BACKUP_FILE" "$SOURCE_DIR"

if [ $? -eq 0 ]; then
    echo "Backup completed successfully: $BACKUP_FILE"
else
    echo "Backup failed!"
    exit 1
fi

# Xóa backup cũ hơn 7 ngày
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete

echo "Old backups cleaned up"
```

## Exit codes

```bash
#!/bin/bash

# Kiểm tra file tồn tại
if [ -f "/path/to/file" ]; then
    echo "File exists"
    exit 0  # Success
else
    echo "File does not exist"
    exit 1  # Error
fi
```

## Các toán tử hữu ích

### File test operators

| Operator | Ý nghĩa |
|----------|---------|
| -f | File tồn tại và là regular file |
| -d | Directory tồn tại |
| -r | File có quyền đọc |
| -w | File có quyền ghi |
| -x | File có quyền thực thi |

### Số học operators

```bash
#!/bin/bash

a=10
b=5

echo "Addition: $((a + b))"
echo "Subtraction: $((a - b))"
echo "Multiplication: $((a * b))"
echo "Division: $((a / b))"
```

## Best practices

1. **Luôn sử dụng shebang**: `#!/bin/bash`
2. **Quote biến**: `"$variable"` thay vì `$variable`
3. **Kiểm tra lỗi**: Sử dụng `$?` để kiểm tra exit code
4. **Comment code**: Giải thích các đoạn code phức tạp
5. **Sử dụng meaningful names**: Đặt tên biến và function rõ ràng

## Kết luận

Bash scripting là kỹ năng quan trọng cho bất kỳ ai làm việc với Linux/Unix. Bắt đầu với những script đơn giản và dần dần xây dựng các script phức tạp hơn để tự động hóa công việc của bạn.
