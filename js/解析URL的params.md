## 需求：实现一个方法，拆解URL参数中queryString

### 输入参数格式：
```javascript
const url = 'http://sample.com/?a=1&b=2&c=xx&d=2#hash';
```
### 输出格式：
```javascript
const result = { a: '1', b: '2', c: 'xx', d: '' };
// 拆解URL参数中queryString，返回一个 key - value 形式的 object
```

### 方法一：正则
```javascript
const getParams = (str)=>{
    const obj = {}
    str.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (obj[k] = v))
    return obj
}
```

### 方法二：URLSearchParams
[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/URLSearchParams)，是一个实验中的功能，所以用的不多
```javascript
function getParams(u: URL) {
  const s = new URLSearchParams(u.search)
  const obj = {}
  s.forEach((v, k) => (obj[k] = v))
  return obj
}

const url = 'http://sample.com/?a=1&b=2&c=xx&d=2#hash';
getParams(new URL(url))
```
**比较类似的有用URL构造函数的searchParams方法，该方法返回一个URLSearchParams对象**

### 方法三：纯代码，用js字符串方法实现
```javascript
const getParams = (url) => {
     const aimUrl = url.split('?').pop().split('#').shift().split('&');
     const res = {};
     aimUrl.forEach(item => {
          const [key, val] = item.split('=');
          res[key] = val;
     });
     return res;
}
```