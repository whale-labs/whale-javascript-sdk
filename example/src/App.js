/*
 * @Author: lichao
 * @Description:
 * @Date: 2020-04-29 15:19:06
 */
import React, { useEffect, Component } from "react";
import { Card, Row, Col, Button } from "antd";
import "./App.less";
import WhaleAgent from "./sdk/WhaleAgent_JS.es6.min";

WhaleAgent.init({
  appkey: "whaledemo", //APPKEY
  debugMode: 2,
  uploadURL: "http://localhost:3001/graphql",
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
