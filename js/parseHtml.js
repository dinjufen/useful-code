// 解析html字符串，将其转换为json格式，暂未加入容错处理
function parseHtml(html) {
  let stack = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === '<') {
      let j = i;
      while (j < html.length && html[j] !== '>') {
        j++;
      }
      const sub = html.substring(i+1, j)
      if (sub.startsWith('/')) { // 如果是后部分,</div>
        let nodes = [];
        while (stack.length > 0) {
          const top = stack.pop();
          if (typeof top === 'string') {
            let item = {type: top, nodes: nodes}
            stack.push(item);
            break;
          } else {
            nodes.push(top);
          }
        }
      } else { // 如果是前半部分, <div>
        stack.push(sub);
      }
      i = j+1;
    } else {
      let j = i;
      while (j < html.length && html[j] !== '<') {
        j++;
      }
      const sub = html.substring(i, j)
      let item = {type: 'text', text: sub}
      i = j;
      stack.push(item)
    }
  }
  console.log(stack[0])
}

let html = '<div><span>21</span><span>2</span></div>'
parseHtml(html)
