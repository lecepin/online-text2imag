# 在线生成文本图片

百度云函数计算 CFC 运行环境。

使用 `sharp` 图处理（[文档](https://sharp.pixelplumbing.com/)）。


## 使用

图片参数：
- width
- height
- r
- g
- b
- a

文本参数：
- text
- fColor
- fSize
- fTop
- fLeft

```
{HTTP触发器地址}?width=1000&height=300&fSize=120&fColor=%23d9333f&text=奥利给&r=253&g=239&b=242&a=0.9&fTop=80&fLeft=350
```

效果如下：

![](https://img.alicdn.com/imgextra/i3/O1CN017E7Nki1GgCXGEzFbq_!!6000000000651-2-tps-1000-300.png)