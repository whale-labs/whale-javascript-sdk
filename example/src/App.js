/*
 * @Author: lichao
 * @Description:
 * @Date: 2020-04-29 15:19:06
 */
import React, { useEffect, Component } from "react";
import { Card, Row, Col, Button } from "antd";
import "./App.less";
import WhaleAgent from "./sdk/WhaleAgent_JS.es6.min";

// appkey(必须) 在网站获取的 AppKey
// debugMode 设置调试模式：0 - 关闭调试模式(默认)；1 - 开启调试模式，数据不入库；2 - 开启调试模式，数据入库
// uploadURL(必须) 设置上传数据接口
// visitorConfigURL(如使用可视化埋点，则必须) 设置可视化配置获取接口
// name 设置 JS SDK 全局对象别名
// auto 设置自动采集页面打开事件：false - 关闭自动采集；true - 开启自动采集(默认)
// autoTrack 设置是否启用全埋点功能：false - 不启用全埋点功能(默认)；true - 启用全埋点功能（SDK 版本 4.4.0 及以后支持）
// autoHeatmap 设置是否启用热图功能：false - 不启用热图功能(默认)；true - 启用热图功能
// autoWebstay 在开启热图功能(autoHeatmap设置为true)时，设置是否追踪页面滚动行为：false - 在开启热图功能(autoHeatmap设置为true)时，不追踪页面滚动行为；true - 在开启热图功能(autoHeatmap设置为true)时，追踪页面滚动行为(默认)
// hash 设置检测 url hash 变化：false - 关闭监测url hash变化；true - 开启监测url hash变化(默认)
// autoProfile 设置是否追踪新用户的首次属性：false - 不追踪新用户的首次属性；true - 追踪新用户的首次属性(默认)
// encryptType 设置是否对上传数据加密：0 - 对上传数据不加密(默认)；1 - 对上传数据进行AES 128位ECB加密；2 对上传数据进行AES 128位CBC加密
// pageProperty 设置自动采集时页面自定义属性；类型：Object
// pageViewBlackList 设置页面统计黑名单；类型：String/内部元素为String或Function的Array/Function；（SDK 版本 4.4.0 及以后支持）
// heatMapBlackList 设置热图统计黑名单；类型：String/内部元素为String或Function的Array/Function；（SDK 版本 4.4.0 及以后支持）
// autoClickBlackList 设置全埋点统计黑名单；类型：String/内部元素为String或Function的Array/Function；（SDK 版本 4.4.0 及以后支持）
// SDKFileDirectory 设置可视化模块SDK与热图模块SDK存放目录。类型：String；（SDK 版本 4.4.0 及以后支持）
// sendType 设置上传日志方式。'img' - 使用image标签的图片链接地址上传日志(默认)；'post'-使用Ajax中的post请求上传日志
// webstayDuration 设置追踪页面滚动行为时，最大停留时长。默认值：5小时。类型：Number。单位：毫秒

console.log(WhaleAgent);

WhaleAgent.init({
  appkey: "77a52s552c892bn442v722", //APPKEY
  debugMode: 2,
  uploadURL: "http://localhost:3300/graphql",
  name: "WhaleAgent",
  auto: true,
  autoTrack: true,
  sendType: "post",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      property: "",
      properties: {},
      distinctId: "",
      presetProperties: {},
    };
  }
  render() {
    return (
      <div className="App">
        <Card title="统计页面">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.pageView()}
              >
                pageView - 打开页面
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.pageView("首页")}
              >
                pageView - 打开页面并添加别名
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.pageView("首页", {
                    name: "lichao",
                    role: "admin",
                  })
                }
              >
                pageView - 打开页面并添加页面属性
              </Button>
            </Col>
          </Row>
        </Card>

        <Card title="统计事件">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.track("新增商品")}
              >
                track - 统计事件
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.track("AddSku", {
                    type: "add",
                    name: "打包洗面奶",
                    shop_id: "138734939487298",
                    company_id: "9485745860456",
                  })
                }
              >
                track - 统计事件并添加事件属性
              </Button>
            </Col>
          </Row>
        </Card>

        <Card title="通用属性">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.registerSuperProperty(
                    "company_id",
                    "c53ac779-662f-4e2b-a63d-5fd351f0ef51"
                  )
                }
              >
                registerSuperProperty - 注册单个通用属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.registerSuperProperties({
                    company_id: "c53ac779-662f-4e2b-a63d-5fd351f0ef51",
                    phone: "13512345678",
                    is_admin: false,
                    is_super: true,
                  })
                }
              >
                registerSuperProperties - 批量注册通用属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.unRegisterSuperProperty("company_id")}
              >
                unRegisterSuperProperty - 删除单个通用属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.clearSuperProperties()}
              >
                clearSuperProperties - 清空通用属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  let property = WhaleAgent.getSuperProperty("company_id");
                  this.setState({ property });
                }}
              >
                getSuperProperty - 获取单个通用属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  let properties = WhaleAgent.getSuperProperties();
                  this.setState({ properties });
                }}
              >
                getSuperProperties - 批量获取单个通用属性
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="col-cls">
              <span className="col-info">
                单个通用属性值为：{this.state.property}
              </span>
            </Col>
          </Row>
          <Row>
            <Col className="col-cls">
              <span className="col-info">
                所有通用属性值为：{JSON.stringify(this.state.properties)}
              </span>
            </Col>
          </Row>
        </Card>

        <Card title="匿名ID与用户关联">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.alias("chaoli")}
              >
                alias - 用户ID与匿名ID关联
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.identify("lichao324769259257")}
              >
                identify - 匿名ID设置
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  let distinctId = WhaleAgent.getDistinctId();
                  this.setState({ distinctId });
                }}
              >
                getDistinctId - 匿名ID获取
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="col-cls">
              <span className="col-info">
                获取的设备ID:{this.state.distinctId}
              </span>
            </Col>
          </Row>
        </Card>

        <Card title="用户属性">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.profileSetOnce("phone", 13300001111)}
              >
                profileSetOnce - 设置用户单个固有属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.profileSetOnce({
                    nick_name: "evan lee",
                    real_name: "李超",
                    phone: 13300002222,
                  })
                }
              >
                profileSetOnce - 设置用户多个固有属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  WhaleAgent.profileSet("Email", "chaoli@whale.im");
                }}
              >
                profileSet - 设置单个用户属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  WhaleAgent.profileSet({
                    Email: "chaoli@whale.im",
                    WeChatID: "lichao1351827",
                  });
                }}
              >
                profileSet - 设置多个用户属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.profileIncrement("age", 1)}
              >
                profileIncrement - 设置用户属性单个相对变化值
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.profileIncrement({
                    gameAge: 1,
                    gameRating: 2,
                  })
                }
              >
                profileIncrement - 设置用户属性多个相对变化值
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  WhaleAgent.profileAppend(["PlayBasketball", "music"])
                }
              >
                profileAppend - 增加列表类型的属性
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.profileUnset("age")}
              >
                profileUnset - 删除单个设置的属性值
              </Button>
            </Col>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.profileDelete()}
              >
                profileDelete - 删除所有设置的属性值
              </Button>
            </Col>
          </Row>
        </Card>

        <Card title="获取预制属性">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() =>
                  this.setState({
                    presetProperties: WhaleAgent.getPresetProperties(),
                  })
                }
              >
                getPresetProperties - 获取预制属性
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="col-cls">
              <span className="col-info">
                获取的预制属性:{JSON.stringify(this.state.presetProperties)}
              </span>
            </Col>
          </Row>
        </Card>

        <Card title="清除本地设置">
          <Row gutter={16}>
            <Col className="col-cls">
              <Button
                type="primary"
                size="middle"
                onClick={() => WhaleAgent.reset()}
              >
                reset - 清除本地设置
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default App;
