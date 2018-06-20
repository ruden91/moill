import React, { Component } from "react";
import { Table } from "antd";
import { database } from "config/firebase";
import { isEmpty } from "lodash";
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
        .then(snap => this.setState({ data: snap.val() }));
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
          let head = snap.val().head;
          let columns = Object.keys(head).map(value => {
            return {
              title: head[value],
              key: value,
              dataIndex: value
            };
          });
          this.setState({ data: snap.val(), columns });
        });
    }
  }
  render() {
    const { data, columns } = this.state;

    return (
      <div>
        {!isEmpty(data) && (
          <div>
            <h1>{data.title}</h1>
            <Table columns={columns} dataSource={data.data} />
          </div>
        )}
      </div>
    );
  }
}
