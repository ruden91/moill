import React, { Component } from "react";
import { Table, Divider, Spin } from "antd";
import { database } from "config/firebase";
import { isEmpty } from "lodash";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";

const StyledScheduleList = styled.div`
  text-align: left;
  .ant-divider-inner-text {
    text-transform: uppercase;
    font-size: 20px;
  }
  small {
    float: right;
  }
`;

const StyledSpinContainer = styled.div`
  width: 320px;
  height: 320px;
  margin: 0 auto;
  text-align: center;
  padding: 20% 0;
`;
export default class ScheduleList extends Component {
  state = {
    data: {},
    columns: []
  };
  componentWillReceiveProps(nextProps) {
    const { path } = this.props;
    if (path !== nextProps.path) {
      database
        .ref("scheduleData")
        .child(nextProps.path.split("/")[2])
        .once("value")
        .then(snap => {
          if (!snap.val()) {
            return;
          }

          let columns = [];
          if (snap.val().hasOwnProperty("head")) {
            let head = snap.val().head;
            columns = Object.keys(head).map(value => {
              return {
                title: head[value],
                key: value,
                dataIndex: value
              };
            });
          }
          this.setState({ data: snap.val(), columns });
        });
    }
  }
  componentDidMount() {
    const { path } = this.props;
    if (path !== "/") {
      database
        .ref("scheduleData")
        .child(path.split("/")[2])
        .once("value")
        .then(snap => {
          if (!snap.val()) {
            return;
          }
          let columns = [];
          if (snap.val().hasOwnProperty("head")) {
            let head = snap.val().head;
            columns = Object.keys(head).map(value => {
              return {
                title: head[value],
                key: value,
                dataIndex: value
              };
            });
          }

          this.setState({ data: snap.val(), columns });
        });
    }
  }
  render() {
    const { data, columns } = this.state;

    return (
      <StyledScheduleList>
        {isEmpty(data) && (
          <StyledSpinContainer>
            <Spin />
          </StyledSpinContainer>
        )}
        {!isEmpty(data) && (
          <div>
            <Divider orientation="left">{data.title}</Divider>
            <p>{data.description}</p>
            <small>
              갱신시간: {moment(data.ts).format("YYYY-MM-DD dddd hh:mm:ss")}
            </small>
            <Table
              columns={columns}
              dataSource={data.data}
              pagination={false}
            />
          </div>
        )}
      </StyledScheduleList>
    );
  }
}
