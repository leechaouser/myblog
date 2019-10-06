import React from 'react'
import './index.scss'

import { Divider, Rate, Icon, Avatar  } from 'antd'

function About(props) {
  return (
    <div className="about content-inner-wrapper">
      <Avatar className="avatar" size="normal" icon="user" />
      <span className="geyan">格言：生活就像海洋,只有意志坚强的人才能达到彼岸！</span>
      <Divider>博客简述</Divider>
      <p>本博客使用技术栈: react + antd + reudx + express + mongoose</p>
      <p>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/userleechao/leech-blog"
        >
          github
        </a>
        ，仅供参考，不做商业用途！
      </p>
      <Divider>关于我</Divider>
      <ul className="about-list">
        <li>姓名: 李超</li>
        <li>毕业院校：深圳职业技术学院 专业：物联网应用技术</li>
        <li>
          联系方式：
          <Icon type="qq" />
          1076476222
          <Divider type="vertical" />
          <Icon type="user" />
          <a href="www.baidu.com">1076476222@qq.com</a>
        </li>
        <li>坐标：深圳市</li>
        <li>
          技能
          <ul>
            <li>
              HTML、CSS、JavaSccript: 能熟练开发符合W3X标准的页面！
              <Rate defaultValue={3} disabled />
            </li>
            <li>
              react 控件： 熟练掌握使用！
              <Rate defaultValue={2} disabled />
            </li>
            <li>
              es6: 日常开发必备，以及掌握基本面向对象编程！
              <Rate defaultValue={3} disabled />
            </li>
            <li>
              webpack: 入门级别，可以对脚手架进行只对性的配置！
              <Rate defaultValue={1} disabled />
            </li>
            <li>
              nodejs mongoose: 针对需要可以简单的数据库设计、接口开发！
              <Rate defaultValue={2} disabled />
            </li>
          </ul>
        </li>
        <li>
          其他
          <ul>
            <li>常用开发工具:vscode sublime text3 git</li>
            <li>熟悉的 UI 工具: antd </li>
            <li>良好的代码习惯</li>
          </ul>
        </li>
        <li>
          个人
          <ul>
            <li>峡谷上分、看看书</li>
            <li>慢热型、好说话。联系方式在上面，欢迎交流！</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
export default About
