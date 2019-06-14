// 返回一个 1-7 楼，每楼有 03-22 教室的数组
function getOptions(val) {
  let arr = [];
  for(let i=1; i<=7; i++) {
    let floor = Object.create(null);
    floor.value = i;
    floor.label = i;
    floor.children = [];
    for(let j=3; j<=22; j++) {
      let obj = {};
      // obj.value = j < 10 ? `0${j}${val}` : `${j}${val}`;
      // obj.label = j < 10 ? `0${j}${val}` : `${j}${val}`;
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
      children: getOptions("文清楼")
    },
    {
      value: '文新楼',
      label: '文新楼',
      children: getOptions('文新楼')
    },
    {
      value: '文俊楼',
      label: '文俊楼',
      children: getOptions('文俊楼')
    },
    {
      value: '文逸楼',
      label: '文逸楼',
      children: getOptions('文逸楼')
    },
    // {
    //   value: '理科南教学楼',
    //   label: '理科南教学楼',
    //   children: getOptions()
    // },
    // {
    //   value: '理科北教学楼',
    //   label: '理科北教学楼',
    //   children: getOptions()
    // },
    // {
    //   value: '电子信息楼',
    //   label: '电子信息楼',
    //   children: getOptions()
    // },
    // {
    //   value: '理学实验楼',
    //   label: '理学实验楼',
    //   children: getOptions()
    // },
    // {
    //   value: '计算机实验楼',
    //   label: '计算机实验楼',
    //   children: getOptions()
    // }
  ]
}