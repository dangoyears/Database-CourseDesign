// 返回一个 1-7 楼，每楼有 03-22 教室的数组
function getOptions() {
  let arr = [];
  for(let i=1; i<=7; i++) {
    let floor = {};
    floor.value = i + "";
    floor.label = i + "";
    floor.children = [];
    for(let j=3; j<=22; j++) {
      let obj = {};
      obj.value = j < 10 ? `0${j}` : `${j}`;
      obj.label = j < 10 ? `0${j}` : `${j}`;
      floor.children.push(obj);
    }
    arr.push(floor);
  }
  return arr;
}

export default {
  addressOptions: [
    {
      value: '文清楼',
      label: '文清楼',
      children: getOptions()
    },
    {
      value: '文新楼',
      label: '文新楼',
      children: getOptions()
    },
    {
      value: '文俊楼',
      label: '文俊楼',
      children: getOptions()
    },
    {
      value: '文逸楼',
      label: '文逸楼',
      children: getOptions()
    },
    {
      value: '理科南教学楼',
      label: '理科南教学楼',
      children: getOptions()
    },
    {
      value: '理科北教学楼',
      label: '理科北教学楼',
      children: getOptions()
    }
  ]
}