import React, { Component } from "react";
import { Route, NavLink, Redirect, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import GlobalHeader from "components/GlobalHeader";
import GlobalFooter from "components/GlobalFooter";
import ScheduleList from "components/ScheduleList";

import styled from "styled-components";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const StyledLogo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;
class App extends Component {
  state = {
    items: []
  };
  componentDidMount() {
    this.setState({
      items: [
        {
          menu: "어학",
          link: "/language",
          subMenus: [
            {
              menu: "토익",
              link: "/toeic"
            },
            {
              menu: "토익스피킹",
              link: "/toeicSpeaking"
            },
            {
              menu: "토플",
              link: "/tople"
            }
          ]
        },
        {
          menu: "IT",
          link: "/it",
          subMenus: [
            {
              menu: "CCNA",
              link: "/ccna"
            },
            {
              menu: "CCNP",
              link: "/ccnp"
            },
            {
              menu: "mos",
              link: "/mos"
            }
          ]
        },
        {
          menu: "국가공인",
          link: "/country",
          subMenus: [
            {
              menu: "정보처리기사",
              link: "/engineerInformationProcessing"
            },
            {
              menu: "정보보안기사",
              link: "/engineerInformationSecurity"
            },
            {
              menu: "정보몰라",
              link: "/tople"
            }
          ]
        }
      ]
    });
  }

  render() {
    const { items } = this.state;
    const path = this.props.location.pathname;

    return (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <StyledLogo />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            {items.map((item, index) => (
              <SubMenu title={item.menu}>
                {item.subMenus.map((submenu, subIndex) => (
                  <Menu.Item key={`${index} ${subIndex}`}>
                    <NavLink to={`${item.link}${submenu.link}`}>
                      {submenu.menu}
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
            {/* <SubMenu title="asdfasdf">
              <Menu.item>
                <NavLink to="#">테스트</NavLink>
              </Menu.item>
            </SubMenu> */}
            {/* {items.map(item => (
              <SubMenu title={<span>{item.menu}</span>}>
                {item.subMenus.map((subMenu, index) => (
                  <NavLink to={`/${index}`}>{subMenu}</NavLink>
                  // <Menu.item key={index}>
                    
                  // </Menu.item>
                ))}
              </SubMenu>
            ))} */}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: "#fff", padding: 0 }}>
            <GlobalHeader />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              style={{ padding: 24, background: "#fff", textAlign: "center" }}
            >
              <Route
                exact
                path={path}
                render={() => <ScheduleList path={path} />}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <GlobalFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
