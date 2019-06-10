export default {
  empty: [{
      required: true,
      message: '信息不能为空',
      trigger: ['change']
    }
  ],
  studentId: [{
      required: true,
      message: '输入不能为空',
      trigger: ['change']
    },
    {
      pattern: /^[0-9]{10}$/,
      message: '学号必须为10个数字',
      trigger: ['blur']
    }
  ],
  userName: [{
      required: true,
      message: '输入不能为空',
      trigger: ['blur']
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
  ]
}