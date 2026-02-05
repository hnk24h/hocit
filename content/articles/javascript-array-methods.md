---
title: "JavaScript Array Methods - Map, Filter và Reduce"
description: "Tìm hiểu về các phương thức mảng quan trọng trong JavaScript: map, filter và reduce. Hướng dẫn với ví dụ thực tế."
date: "2026-02-04"
category: "JavaScript"
slug: "javascript-array-methods"
---

## Giới thiệu

JavaScript cung cấp nhiều phương thức mạnh mẽ để làm việc với mảng. Trong bài viết này, chúng ta sẽ tìm hiểu ba phương thức quan trọng nhất: `map()`, `filter()` và `reduce()`.

## Array.map()

Phương thức `map()` tạo ra một mảng mới bằng cách áp dụng một hàm cho mỗi phần tử của mảng gốc.

### Cú pháp

```javascript
const newArray = array.map((element, index, array) => {
  // return transformed element
});
```

### Ví dụ

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8, 10]
```

### Ví dụ thực tế: Chuyển đổi dữ liệu user

```javascript
const users = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' }
];

const fullNames = users.map(user => ({
  id: user.id,
  fullName: `${user.firstName} ${user.lastName}`
}));

console.log(fullNames);
// [
//   { id: 1, fullName: 'John Doe' },
//   { id: 2, fullName: 'Jane Smith' }
// ]
```

## Array.filter()

Phương thức `filter()` tạo ra một mảng mới chứa các phần tử thỏa mãn điều kiện.

### Cú pháp

```javascript
const newArray = array.filter((element, index, array) => {
  // return true to keep element, false to remove
});
```

### Ví dụ

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
```

### Ví dụ thực tế: Lọc users theo độ tuổi

```javascript
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 17 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 16 }
];

const adults = users.filter(user => user.age >= 18);

console.log(adults);
// [
//   { name: 'John', age: 25 },
//   { name: 'Bob', age: 30 }
// ]
```

## Array.reduce()

Phương thức `reduce()` thực hiện một hàm reducer trên mỗi phần tử của mảng, kết quả là một giá trị duy nhất.

### Cú pháp

```javascript
const result = array.reduce((accumulator, currentValue, index, array) => {
  // return updated accumulator
}, initialValue);
```

### Ví dụ: Tính tổng

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, num) => total + num, 0);

console.log(sum); // 15
```

### Ví dụ thực tế: Tính tổng giá trị đơn hàng

```javascript
const cart = [
  { name: 'Laptop', price: 1000, quantity: 1 },
  { name: 'Mouse', price: 25, quantity: 2 },
  { name: 'Keyboard', price: 50, quantity: 1 }
];

const totalPrice = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);

console.log(totalPrice); // 1100
```

## Kết hợp các phương thức

Sức mạnh thực sự nằm ở việc kết hợp các phương thức này:

```javascript
const products = [
  { name: 'Laptop', price: 1000, category: 'Electronics' },
  { name: 'Book', price: 20, category: 'Books' },
  { name: 'Phone', price: 500, category: 'Electronics' },
  { name: 'Pen', price: 2, category: 'Stationery' }
];

// Tính tổng giá trị của các sản phẩm Electronics
const electronicsTotal = products
  .filter(product => product.category === 'Electronics')
  .map(product => product.price)
  .reduce((total, price) => total + price, 0);

console.log(electronicsTotal); // 1500
```

## So sánh hiệu năng

| Phương thức | Use case | Trả về |
|------------|----------|--------|
| map() | Chuyển đổi từng phần tử | Mảng mới cùng độ dài |
| filter() | Lọc phần tử theo điều kiện | Mảng mới (có thể ngắn hơn) |
| reduce() | Tính toán giá trị tổng hợp | Một giá trị duy nhất |

## Kết luận

Các phương thức `map()`, `filter()` và `reduce()` là công cụ mạnh mẽ giúp bạn làm việc với mảng một cách hiệu quả và dễ đọc hơn. Hãy thực hành thường xuyên để thành thạo chúng!
