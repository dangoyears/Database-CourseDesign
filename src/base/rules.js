export default {
  empty: [
    {
    required: true,
    message: '信息不能为空',
    trigger: ['blur', 'change']
    }
  ],
  studentId: [
    {
      required: true,
      message: '输入不能为空',
      trigger: ['blur', 'change']
    },
    {
      pattern: /^[0-9]{10}$/,
      message: '学号必须为10个数字',
      trigger: ['blur']
    }
  ],
  userName: [
    {
      required: true,
      message: '输入不能为空',
      trigger: ['blur', "change"]
    },
    {
      pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
      message: '输入必须为中文或英文',
      trigger: ['blur', 'change']
    },
    {
      max: 20,
      message: '输入最多只能有20个字符',
      trigger: ['blur', 'change']
    }
  ],
  birthday: [
    {
      required: true,
      message: '输入不能为空',
      trigger: ['blur']
    },
    {
      // 自定义校验函数
      validator: function(rule, value, callback) {
        let temp = new Date();
        let year =  temp.getFullYear() + "";
        let month = temp.getMonth() + 1;
        month = month >= 10 ? month + "" : "0" + month;
        let day = temp.getDate();
        day = day >= 10 ? day + "" : "0" + day;
        let val = value.replace(/-/g, '');
        let cur =  year + month + day;
        // 使用年月日 xxxxxxxx - xxxxxxxx 相减来判断选择的出生日期是否合理，需要在当天之前(如果出生日期是昨天也会被认为是合理的)
        if(cur <= val) {
          callback(new Error("选择的时间有误，请重新选择"));
        }
        else {
          callback();
        }
      },
      trigger: ['blur', 'change']
    }
  ]
}